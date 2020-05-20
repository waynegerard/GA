import ytdl from 'ytdl-core'
import ytsr from 'ytsr'

import { Readable } from 'stream'
import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

const axios = require('axios')
const cheerio = require('cheerio')

/**
 * Plays and manages playing music for a guild/server. Fetches music from youtube to play, and then streams
 * it over a discord voice connection.
 */
export default class MusicPlayer extends BaseSkill {
  skillName: string = "Music Player"

  constructor() {
    super()
    this.commandMap.addCommand("play", ["add", "play"], this.play.bind(this))
    this.commandMap.addCommand("next", ["skip", "next"], this.next.bind(this))
    this.commandMap.addCommand("stop", ["halt", "stop", "fuck off", "fuckoff", "shut up", "shutup", "shush", "hush"],
        this.stop.bind(this))
  }

  helpMessage(): string {
    return `
Music:
**play**, **next**, **stop**`
  }

  /**
   * Fetches an audio stream from a Youtube link or Spotify playlist
   *
   * @param link The youtube link or spotify playlist to download from
   * @return stream Returns a readable stream
   */
  async getMusic(link: string): Promise<Readable> {
    await ytdl.getInfo(link)
    return ytdl(link, { quality: 'highestaudio', highWaterMark: 1 << 25 })
  }

  isSpotifyLink(link: string): boolean {
    return link.toLowerCase().indexOf('spotify.com') !== -1
  }

  async getSpotifySongs(link: string): Promise<string[]> {
    const res = await axios.get(link)
    const html = res.data
    const rawQuery = cheerio.load(html)
    const songs = rawQuery('li').filter('.tracklist-row').map(() => cheerio(this).text()).toArray()
    return songs
  }

  isYoutubeLink(link: string): boolean {
    if (link.toLowerCase().indexOf('youtube.com') !== -1) {
      return true
    }
    if (link.toLowerCase().indexOf('youtu.be') !== -1) {
      return true
    }
    return false
  }

  async fetchYoutubeLink(query: string): Promise<string> {
    const result = await ytsr(query)
    if (result.items && result.items.length) {
      return result.items.find((item: any) => item.type === "video").link
    }
    return ''
  }


  async play(message: SkillMessage): Promise<void> {
    const query = message.arguments
    this.playSong(query, message)
  }

  /**
   * playSong handles four cases:
   * 1.) Spotify playlist -> All songs added to queue as if they were searched manually
   * 2.) Youtube link -> Plays the audio of the link
   * 3.) Not a Spotify playlist or Youtube link -> Assumes you meant to search and queries your message into Youtube
   * 4.) No arguments given -> Do nothing
   * Note: Nothing handles if a soundcloud link is given or some other website link
   */
  async playSong(query: string, message: SkillMessage): Promise<void> {
    this.log('play', `Play called with query: ${query}`)
    if (!query || query === '') {
      this.log('play', 'Returning, no query given.')
      return
    }

    let path = query
    if (this.isSpotifyLink(query)) {
      const spotifyPlaylist = await this.getSpotifySongs(query)
      if (spotifyPlaylist === []) {
        message.createMessage("Couldn't find any songs on this Spotify playlist")
        this.logError("getSpotifySongs", `Couldn't find anything for ${query}`)
      }
      this.log('play', `Playing Spotify playlist: ${query}`)
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < spotifyPlaylist.length; i++) {
        path = await this.fetchYoutubeLink(spotifyPlaylist[i])
        this.streaming(path, message)
      }
      /* eslint-enable no-await-in-loop */
    }
    else if (this.isYoutubeLink(query)) {
      this.streaming(query, message)
    }
    else {
      path = await this.fetchYoutubeLink(query)
      if (path.length === 0) {
        message.createMessage(`Couldnt find anything for: ${query}`)
        this.logError("playSong", `Couldn't find anything for ${query}`)
      }
      else {
        message.createMessage(`Playing ${path}`)
        this.streaming(path, message)
      }
    }

    this.log('play', `Path: ${path}`)
  }

  async streaming(path: string, message: SkillMessage): Promise<void> {
    let stream
    try {
      stream = await this.getMusic(path)
      message.joinAndPlayLongAudio(stream)
    } catch (e) {
      message.createMessage(`Something went wrong! ${e.message}`)
    }
  }

  stop(message: SkillMessage): void {
    message.stopVoice()
  }

  next(message: SkillMessage): void {
    this.log('next', 'Next called, going to next song')
    message.skipVoice()
  }
}
