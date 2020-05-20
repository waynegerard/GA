import Action from '../action'
import SkillMessage from '../../models/skillMessage'
import { ActionTypes } from '../types'

export default class CreateRespondAction extends Action {
  actionType = ActionTypes.RESPOND_TEXT

  contents: string

  channel: {id: string}

  guild: {id: string}

  constructor(message: SkillMessage, contents?: string) {
    super()
    this.channel = { id: message.channel.id }
    this.guild = { id: message.guild.id }
    this.contents = contents
  }


  toObject(): object {
    return {
      action: this.actionType,
      guild: this.guild,
      channel: this.channel,
      contents: this.contents,
    }
  }
}
