import Discord from './discord'
import SkillHandler from './skillHandler'
import logger from '../util/logger'
import Voice from './voice'

/**
 * A thin wrapper around Discord guilds (servers). Discord refers to servers as guilds
 * internally (see Discord API documentation), so we do as well to remain consistent.
 */
export default class Guild {
  private discordGuild: Discord.DiscordGuild

  private voiceHandler: Voice

  private skillHandler: SkillHandler

  constructor(guild: Discord.DiscordGuild) {
    this.discordGuild = guild
    this.skillHandler = new SkillHandler()
    this.voiceHandler = new Voice()
    this.voiceHandler.on('voiceCommand', (data: any) => {
      this.handleMessage(data.command, data.user, data.channel)
    })
  }

  log(method: string, message: string): void {
    logger.info(message, { class: "Guild", method, guildId: this.discordGuild.id })
  }

  handleMessage(message: string, author: Discord.User, channel: Discord.GuildChannel): void {
    this.skillHandler.handleMessage(message, channel, author, this.voiceHandler)
  }

  monitor() {
    setInterval(this.monitorVoiceChannels.bind(this), 1500)
  }

  shouldLeaveVoice() {
    const channel = this.voiceHandler.voiceChannel
    if (!channel) {
      return false
    }
    return channel.voiceMembers.reduce((prev) => prev + 1, 0) === 1 // length() doesn't exist on this collection type
  }

  monitorVoiceChannels() {
    if (this.shouldLeaveVoice()) {
      this.log("monitorVoiceChannels", "Leaving voice channel")
      this.voiceHandler.leave()
    }
  }
}
