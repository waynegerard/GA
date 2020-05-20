import Action from './actionInterface'
import ActionData from './actionData'
import Discord from '../bot/discord'

export default class JoinVoiceAction implements Action {
  async perform(data: ActionData): Promise<ActionData> {
    // Are we in a voice channel already? Don't do anything
    if (data.voiceHandler.connected()) {
      return data
    }

    let voiceChannel: Discord.VoiceChannel
    data.guild.channels.forEach((channel: Discord.GuildChannel) => {
      if (channel.type === Discord.GuildChannelType.VOICE) {
        const vChannel = channel as Discord.VoiceChannel
        const user = vChannel.voiceMembers.find((member: Discord.User) => member.id === data.user.id)
        if (user) {
          voiceChannel = vChannel
        }
      }
    })

    if (!voiceChannel) {
      throw new Error("You don't seem to be in a voice channel!")
    }

    await data.voiceHandler.setVoiceChannel(voiceChannel)

    return data
  }
}
