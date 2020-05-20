import Constants from '../util/constants'

export default class Datagram {
  private data: Buffer

  private userID: string

  private timestamp: number

  private sequence: number

  private filetime: number

  constructor(chunk: Buffer, userID: string, timestamp: number, sequence: number, startTime: [number, number]) {
    this.data = chunk
    this.userID = userID
    this.timestamp = timestamp
    this.sequence = sequence

    const chunkTime = process.hrtime(startTime)
    this.filetime = chunkTime[0] * Constants.DISCORD_AUDIO_SAMPLE_RATE + ~~(chunkTime[1] / 20833.333)
  }

  get Sequence(): number {
    return this.sequence
  }

  get Data(): Buffer {
    return this.data
  }

  get Filetime(): number {
    return this.filetime
  }
}
