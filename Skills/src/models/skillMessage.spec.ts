import { expect } from 'chai'
import 'mocha'
import SkillMessage from './skillMessage'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('SkillMessage', () => {
  describe('instanceFromJSON', () => {
    beforeEach(() => {
      this.message = {
        contents: "play test",
        user: { id: "1", name: "User" },
        guild: { id: "2", name: "Guild" },
        channel: { id: "3", name: "Channel", type: "text" },
      }
    })

    it('should parse a JSON message correctly', () => {
      const message = SkillMessage.instanceFromJSON(this.message)
      expect(message.contents).to.equal("play test")
      expect(message.user.id).to.equal("1")
      expect(message.user.name).to.equal("User")
      expect(message.guild.id).to.equal("2")
      expect(message.guild.name).to.equal("Guild")
      expect(message.channel.id).to.equal("3")
      expect(message.channel.name).to.equal("Channel")
      expect(message.channel.type).to.equal("text")
    })
  })
  describe('set Command', () => {
    it('should set the command correctly', () => {
      const message = new SkillMessage()
      message.contents = "test foobar"
      message.Command = "test"
      expect(message.command).to.equal("test")
      expect(message.arguments).to.equal("foobar")
    })
  })
})
