import Datagram from '../models/datagram'

const crc32 = require('cyclic-32')

// Flags for all ogg envelope files
const BOS = 2
const opusHeader = [
  Buffer.from([
    0x4f,
    0x70,
    0x75,
    0x73,
    0x48,
    0x65,
    0x61,
    0x64,
    0x01,
    0x02,
    0x00,
    0x0f,
    0x80,
    0xbb,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
  ]),
  Buffer.from([
    0x4f,
    0x70,
    0x75,
    0x73,
    0x54,
    0x61,
    0x67,
    0x73,
    0x09,
    0x00,
    0x00,
    0x00,
    0x6e,
    0x6f,
    0x64,
    0x65,
    0x2d,
    0x6f,
    0x70,
    0x75,
    0x73,
    0x00,
    0x00,
    0x00,
    0x00,
    0xff,
  ]),
]

module SimpleOggEncoder {
  export const idHeader = (trackNumber: number): Buffer => encode(0, trackNumber, 0, opusHeader[0], BOS)

  export const makeCommentHeader = (trackNumber: number): Buffer => encode(0, trackNumber, 1, opusHeader[1])

  export const createHeader = (
    granulePos: number,
    streamNumber: number,
    packetNumber: number,
    chunk: Buffer,
    flags: number = 0,
  ): Buffer => {
    // How many bytes will be required to explain this chunk?
    const lengthBytes = Math.ceil(chunk.length / 255) + 1

    // The total header length
    const headerBytes = 26 + lengthBytes
    const header = Buffer.alloc(headerBytes + chunk.length)

    // Byte 0: Initial header
    header.write('OggS')

    // Byte 4: Stream structure 0

    // Byte 5: Flags
    header.writeUInt8(flags, 5)

    // Byte 6: Granule pos
    header.writeUIntLE(granulePos, 6, 6)

    // Byte 14: Stream number
    header.writeUInt32LE(streamNumber, 14)

    // Byte 18: Sequence number
    header.writeUInt32LE(packetNumber, 18)

    // Byte 22: CRC-32, filled in later

    // Byte 26: Number of segments
    header.writeUInt8(lengthBytes - 1, 26)

    // And the segment lengths themselves
    let i = 27
    if (chunk.length) {
      let r = chunk.length
      while (r > 255) {
        header.writeUInt8(255, i++)
        r -= 255
      }
      header.writeUInt8(r, i)
    }

    return header
  }

  export const encode = (
    granulePos: number,
    streamNumber: number,
    packetNumber: number,
    chunk: Buffer,
    flags: number = 0,
  ): Buffer => {
    let bufferedChunk = Buffer.from(chunk)
    // How many bytes will be required to explain this chunk?
    const lengthBytes = Math.ceil(bufferedChunk.length / 255) + 1

    // The total header length
    const headerBytes = 26 + lengthBytes
    const header = createHeader(granulePos, streamNumber, packetNumber, bufferedChunk, flags)

    // Then of course the actual data
    bufferedChunk.copy(header, headerBytes)
    bufferedChunk = header

    // Now that it's together we can figure out the checksum
    bufferedChunk.writeInt32LE(crc32(bufferedChunk), 22)

    return bufferedChunk
  }

  export const encodeData = (datagram: Datagram, packetNumber: number) => {
    const chunk = stripRTPHeader(datagram.Data)
    return encode(datagram.Filetime, 1, packetNumber, chunk)
  }

  export const wrapData = (data: Datagram[]) => {
    const encodedData = data.map((value: any) => encodeData(value, 2))
    const combinedData = Buffer.concat(encodedData)
    const IDHeader = idHeader(1)
    const commentHeader = makeCommentHeader(1)
    return Buffer.concat([IDHeader, commentHeader, combinedData])
  }

  export const stripRTPHeader = (chunk: Buffer) => {
    if (chunk.length > 4 && chunk[0] === 0xbe && chunk[1] === 0xde) {
      // There's an RTP header extension here. Strip it.
      const rtpHLen = chunk.readUInt16BE(2)
      let off = 4
      for (let rhs = 0; rhs < rtpHLen && off < chunk.length; rhs++) {
        const subLen = (chunk[off] & 0xf) + 2
        off += subLen
      }
      while (off < chunk.length && chunk[off] === 0) off++
      if (off >= chunk.length) off = chunk.length
      chunk = chunk.slice(off)
    }
    return chunk
  }
}

export default SimpleOggEncoder
