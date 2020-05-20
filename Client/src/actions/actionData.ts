import Discord from '../bot/discord'
import VoiceHandler from '../bot/voice'

export default class ActionData {
  voiceHandler?: VoiceHandler

  textChannel?: Discord.TextChannel

  user: Discord.User

  guild: Discord.DiscordGuild

  constructor(user: Discord.User, guild: Discord.DiscordGuild) {
    this.user = user
    this.guild = guild
  }
}
