import { expect } from 'chai'
import 'mocha'
import MusicPlayer from './music'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('MusicPlayer', () => {
  beforeEach(() => {
    this.musicPlayer = new MusicPlayer()
  })

  describe('canHandleMessage', () => {
    it('should return true for play/next/stop', () => {
      const play = this.musicPlayer.findHandler({ command: 'play', arguments: 'test', contents: "play test" })
      const next = this.musicPlayer.findHandler({ command: 'next', contents: "next" })
      const stop = this.musicPlayer.findHandler({ command: 'stop', contents: "stop" })
      expect(play).not.to.be.undefined
      expect(next).not.to.be.undefined
      expect(stop).not.to.be.undefined
    })

    it('should return false for not-allowed commands', () => {
      const playFail = this.musicPlayer.findHandler({ command: 'pl@y ', contents: "pl@y " })
      const junk = this.musicPlayer.findHandler({ command: 'foobar', contents: "foobar" })
      expect(playFail).to.be.undefined
      expect(junk).to.be.undefined
    })

    it('should return true for youtube links only', () => {
      const misspellingLink = "youtuube.com/awefwe132"
      const spotifyLink = "https://open.spotify.com/playlist/3PNuNTmhQswvJHDc7oilGh?si=EE94s10nTY2bwqpWpKglHg"
      const realYoutubeLink = "https://youtu.be/eUJzqChe3FQ"
      const realYoutubeLinkTwo = "https://www.youtube.com/watch?v=XejVB_fba04"

      const misspellingLinkTest = this.musicPlayer.isYoutubeLink(misspellingLink)
      const spotifyLinkTest = this.musicPlayer.isYoutubeLink(spotifyLink)
      const realYoutubeLinkTest = this.musicPlayer.isYoutubeLink(realYoutubeLink)
      const realYoutubeLinkTestTwo = this.musicPlayer.isYoutubeLink(realYoutubeLinkTwo)

      expect(misspellingLinkTest).to.be.false
      expect(spotifyLinkTest).to.be.false
      expect(realYoutubeLinkTest).to.be.true
      expect(realYoutubeLinkTestTwo).to.be.true
    })

    it('should return true for spotify links only', () => {
      const realSpotifyLink = "https://open.spotify.com/playlist/3PNuNTmhQswvJHDc7oilGh?si=EE94s10nTY2bwqpWpKglHg"
      const youtubeLink = "https://youtu.be/eUJzqChe3FQ"

      const youtubeLinkTest = this.musicPlayer.isSpotifyLink(youtubeLink)
      const spotifyLinkTest = this.musicPlayer.isSpotifyLink(realSpotifyLink)

      expect(youtubeLinkTest).to.be.false
      expect(spotifyLinkTest).to.be.true
    })

    it('should return a promise of spotify songs', () => {
      const realSpotifyLink = "https://open.spotify.com/playlist/3PNuNTmhQswvJHDc7oilGh?si=EE94s10nTY2bwqpWpKglHg"

      const getSpotifySongs = this.musicPlayer.getSpotifySongs(realSpotifyLink)

      expect(getSpotifySongs).to.be.a("promise")
    })
  })
})
