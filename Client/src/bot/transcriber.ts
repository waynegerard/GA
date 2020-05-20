import { writeFileSync, readFileSync, unlink } from 'fs'
import { execSync } from 'child_process'
import EventEmitter from 'events'
import Admin from './admin'
import Constants from '../util/constants'
import Discord from "./discord"
import Datagram from '../models/datagram'
import Google from '../services/google'
import Speaker from '../models/speaker'
import logger from '../util/logger'
import SimpleOggEncoder from '../util/ogg'
import DFParser from '../nlp/DFParser'
import analytics from '../util/analytics'

const MONITOR_VOICE_TIMEOUT: number = 100

export default class Transcriber extends EventEmitter {
  private connection: Discord.VoiceConnection

  private channel: Discord.VoiceChannel

  private speakerMap: { [speakerID: string]: Speaker } = {}

  private startTime: [number, number] = [0, 0] // milliseconds, nanoseconds

  constructor(connection: Discord.VoiceConnection, channel: Discord.VoiceChannel) {
    super()
    this.connection = connection
    this.channel = channel
    this.startTime = process.hrtime()
    const voiceStream: Discord.VoiceDataStream = this.connection.receive('opus')
    voiceStream.on('data', this.processVoiceData.bind(this))
    setInterval(this.monitorVoiceData.bind(this), MONITOR_VOICE_TIMEOUT)
  }

  processVoiceData(chunk: Buffer, userID: string, timestamp: number, sequence: number) {
    const datagram = new Datagram(chunk, userID, timestamp, sequence, this.startTime)
    if (!userID) {
      // Discord can sometimes send phantom voice packets that aren't apparently from anyone.
      // Don't do anything with them.
      return
    }
    if (!this.speakerMap[userID]) {
      const user = this.channel.voiceMembers.find((member: Discord.User) => member.id === userID)
      if (!user) {
        return
      }
      this.speakerMap[userID] = new Speaker(userID, user.username)
    }
    this.speakerMap[userID].addBuffer(datagram)
  }

  monitorVoiceData() {
    Object.keys(this.speakerMap).forEach(async (speakerID: string) => {
      const speaker = this.speakerMap[speakerID]
      if (speaker.shouldDrain()) {
        // this.log('monitorVoiceData', `Draining speaker voice data: ${speakerID}`)
        const data: Datagram[] = speaker.drain()
        const transcription: string = await this.transcribe(data)
        if (transcription !== "") {
          const voiceCommand = await DFParser.parse({
            query: transcription,
            projectId: "midgame-ga",
            sessionId: "test",
          })
          if (voiceCommand !== "") {
            this.emit('voiceCommand',
            {
              command: voiceCommand,
              user: speaker,
              channel: this.channel,
            })
            analytics.track({
              event: "Voice Invocations",
              userId: speakerID,
              properties: {
                skillName: voiceCommand,
              },
            })
          }
        }
        logger.info("Transcription", { transcription, user: { id: speaker.id, name: speaker.username } })
        const admin = Admin.getInstance()
        admin.sendMessage("transcriptions", "Transcription", { transcription })
      }
    })
  }

  async transcribe(data: Datagram[]): Promise<string> {
    const wrappedData: Buffer = SimpleOggEncoder.wrapData(data)

    const fileName = process.hrtime()[0]

    writeFileSync(`./tmp/${fileName}.opus`, wrappedData)
    // Convert the opus (-acodec libopus) file to flac (-f flac), smash it down to a single audio channel (-ac 1)
    execSync(`ffmpeg -y -acodec libopus -i ./tmp/${fileName}.opus -f flac -ac 1 ./tmp/${fileName}.flac`, {
      stdio: ['ignore', 'ignore', 'ignore'],
    })
    const fileData = readFileSync(`./tmp/${fileName}.flac`).toString('base64')

    // Run a short speech recognize
    const transcription = await Google.transcribe(fileData, 'FLAC', Constants.DISCORD_AUDIO_SAMPLE_RATE)
    logger.info(`Transcription: ${transcription}`)

    unlink(`./tmp/${fileName}.opus`, () => {})
    unlink(`./tmp/${fileName}.flac`, () => {})

    return transcription
  }
}
