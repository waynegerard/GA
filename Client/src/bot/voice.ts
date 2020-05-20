import { Readable } from 'stream'
import https from 'https'
import EventEmitter from 'events'
import Discord from './discord'
import logger from '../util/logger'
import Transcriber from './transcriber'

enum AUDIO_STATE {
  NOT_PLAYING = 0,
  PLAYING_LONG_AUDIO,
  PLAYING_SHORT_AUDIO
}

export default class Voice extends EventEmitter {
  private longAudioQueue: Readable[] = []

  private shortAudioQueue: Readable[] = []

  public voiceChannel?: Discord.VoiceChannel

  private voiceConnection?: Discord.VoiceConnection

  private ready: boolean = false

  private currentAudioState: AUDIO_STATE = AUDIO_STATE.NOT_PLAYING

  private transcriber?: Transcriber

  private setupEventHandlers(): Promise<any> {
    this.voiceConnection.on('end', () => {
      logger.info("[VOICE] Stream closing, processing next file...")
      this.currentAudioState = AUDIO_STATE.NOT_PLAYING
      this.processAudio()
    })

    this.voiceConnection.on('error', (e: Error) => {
      logger.error(`[VOICE]: Error message: ${e.message}`)
    })

    this.transcriber = new Transcriber(this.voiceConnection, this.voiceChannel)
    this.transcriber.on('voiceCommand', (data: any) => {
      this.emit('voiceCommand', data)
    })

    return new Promise((resolve) => {
      if (this.voiceConnection.ready) {
        this.ready = true
        resolve()
      } else {
        this.voiceConnection.on('ready', () => {
          this.ready = true
          resolve()
        })
      }
    })
  }

  /**
   * Playing long audio, short audio in queue: Play short audio, resume playing long audio after
   * Playing long audio, long audio in queue: Continue playing long audio
   * Playing short audio, short audio in queue: Interrupt short audio with new short audio
   * Playing short audio: long audio in queue: Resume playing long audio after
   */
  private processAudio() {
    logger.info("[VOICE] Processing audio...")
    if (!this.longAudioQueue.length && !this.shortAudioQueue.length) { // Nothing to play
      logger.info("[VOICE] Nothing to play")
      this.currentAudioState = AUDIO_STATE.NOT_PLAYING
      return
    }

    if (this.currentAudioState === AUDIO_STATE.NOT_PLAYING) {
      let next: Readable
      if (this.shortAudioQueue.length > 0) {
        logger.info("[VOICE] Playing short audio")
        next = this.shortAudioQueue.shift()
        this.currentAudioState = AUDIO_STATE.PLAYING_SHORT_AUDIO
      } else {
        logger.info("[VOICE] Playing long audio")
        next = this.longAudioQueue.shift()
        next.resume()
        this.currentAudioState = AUDIO_STATE.PLAYING_LONG_AUDIO
      }
      this.playStream(next)
      return
    }

    // Interrupt if we have something in the short audio queue
    if (this.shortAudioQueue.length) {
      logger.info("[VOICE] Interrupting long audio with clip audio")
      this.currentAudioState = AUDIO_STATE.NOT_PLAYING
      this.voiceConnection.stopPlaying()
    }
  }

  private playStream(stream: Readable) {
    this.voiceConnection.play(stream, {})
  }

  private convertToStream(url: string): Promise<Readable> {
    const data:Buffer[] = [] // List of Buffer objects
    const promise = new Promise<Readable>((resolve, reject) => {
      try {
        https.get(url, (res: any) => {
          res.on("data", (chunk: any) => {
            data.push(chunk); // Append Buffer object
          });
          res.on("end", () => {
            const readable = new Readable()
            readable._read = () => {} // _read is required but you can noop it
            readable.push(Buffer.concat(data))
            readable.push(null)
            resolve(readable)
          })
        })
      } catch (e) {
        reject(e)
      }
    })

    return promise
  }

  stop() {
    this.shortAudioQueue = []
    this.longAudioQueue = []
    this.voiceConnection.stopPlaying()
    this.currentAudioState = AUDIO_STATE.NOT_PLAYING
  }

  next() {
    this.currentAudioState = AUDIO_STATE.NOT_PLAYING
    this.voiceConnection.stopPlaying()
  }

  async addLongAudioURL(url: string): Promise<void> {
    const stream = await this.convertToStream(url)
    this.longAudioQueue.push(stream)
    this.processAudio()
  }

  async addShortAudioURL(url: string): Promise<void> {
    const stream = await this.convertToStream(url)
    this.shortAudioQueue.push(stream)
    this.processAudio()
  }

  addLongAudioStream(stream: Readable): void {
    this.longAudioQueue.push(stream)
    this.processAudio()
  }

  addShortAudioStream(stream: Readable): void {
    this.shortAudioQueue.push(stream)
    this.processAudio()
  }

  async setVoiceChannel(voiceChannel: Discord.VoiceChannel): Promise<any> {
    this.voiceChannel = voiceChannel
    this.voiceConnection = await voiceChannel.join({})
    return this.setupEventHandlers()
  }

  connected(): boolean {
    return this.ready
  }

  leave(): void {
    if (!this.voiceChannel) {
      logger.info("Leave called but no voice channel to leave!")
      return
    }
    this.stop()
    this.voiceChannel.leave()
    this.ready = false
  }
}
