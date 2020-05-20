import Action from './actionInterface'
import ActionData from './actionData'
import Admin from '../bot/admin'

export default class AdminMessageAction implements Action {
  private message: string

  private channel: string

  constructor(message: string, channel: string) {
    this.message = message
    this.channel = channel
  }

  perform(data: ActionData): ActionData {
    Admin.getInstance().sendMessage(this.channel, this.message)
    return data
  }
}
