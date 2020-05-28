import { Readable } from 'stream'
import Discord from '../bot/discord'
import Voice from '../bot/voice'
import {
 JoinVoiceAction, LeaveVoiceAction, ActionData, ActionProcessor,
 StopVoiceAction, SkipVoiceAction, AddLongAudioAction, AddShortAudioAction,
} from '../actions'

class SkillMessage {
  contents: string

  command: string

  arguments: string

  channel: Discord.GuildChannel

  voiceHandler?: Voice

  author: Discord.User

  constructor(contents: string, channel: Discord.GuildChannel,
     author: Discord.User, voiceHandler: Voice | undefined) {
    this.contents = contents
    this.channel = channel
    this.author = author
    this.voiceHandler = voiceHandler
  }

  async createMessage(msg: string): Promise<void> {
      const textChannel = this.channel as Discord.TextChannel
      textChannel.createMessage(msg)
  }

  toString(): string {
    return this.contents
  }

  set Command(command: string) {
    this.command = command
    this.arguments = this.contents.substring(command.length).trim()
  }

  createActionData() {
    const instance = new ActionData(this.author, this.channel.guild)
    instance.textChannel = this.channel as Discord.TextChannel
    instance.voiceHandler = this.voiceHandler
    return instance
  }

  async joinVoice(): Promise<void> {
    const actionData = this.createActionData()
    await ActionProcessor.processActions([new JoinVoiceAction()], actionData)
  }

  leaveVoice(): void {
    const actionData = this.createActionData()
    ActionProcessor.processActions([new LeaveVoiceAction()], actionData)
  }

  stopVoice(): void {
    const actionData = this.createActionData()
    ActionProcessor.processActions([new StopVoiceAction()], actionData)
  }

  skipVoice(): void {
    const actionData = this.createActionData()
    ActionProcessor.processActions([new SkipVoiceAction()], actionData)
  }

  async joinAndPlayShortAudioURL(url: string): Promise<void> {
    const actionData = this.createActionData()
    await ActionProcessor.processActions([new JoinVoiceAction(), new AddShortAudioAction(url)], actionData)
  }

  async joinAndPlayLongAudio(stream: Readable): Promise<void> {
    const actionData = this.createActionData()
    await ActionProcessor.processActions([new JoinVoiceAction(), new AddLongAudioAction(stream)], actionData)
  }

  toJSON(): object {
    return {
      contents: this.contents,
      user: { id: this.author.id, name: this.author.username },
      guild: { id: this.channel.guild.id },
      channel: { id: this.channel.id },
    }
  }
}

export default SkillMessage
