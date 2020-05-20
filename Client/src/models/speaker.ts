import Datagram from './datagram'
import TimeUtils from '../util/time'

const SILENCE_CUTOFF_MS = 500

export default class Speaker {
  private dataBuffer: Datagram[] = []

  private lastPacketAt: number

  id: string

  username: string

  constructor(id: string, username: string) {
    this.id = id
    this.username = username
    this.lastPacketAt = TimeUtils.getUnixTimestampMS()
  }

  drain(): Datagram[] {
    const datagrams = this.dataBuffer.splice(0) // this also clears out the buffer
    const sorted = datagrams.sort((a, b) => a.Sequence - b.Sequence) // packets can arrive out of order
    return sorted
  }

  // Drains if the user hasn't spoken in SILENCE_CUTOFF_MS milliseconds and has data to dump
  shouldDrain() {
    if (!this.dataBuffer.length) {
      return false
    }
    return this.lastPacketAt + SILENCE_CUTOFF_MS < TimeUtils.getUnixTimestampMS()
  }

  addBuffer(data: Datagram) {
    this.dataBuffer.push(data)
    this.lastPacketAt = TimeUtils.getUnixTimestampMS()
  }

  get DataBuffer(): Datagram[] {
    return this.dataBuffer
  }

  set LastPacketAt(time: number) {
    this.lastPacketAt = time
  }
}
