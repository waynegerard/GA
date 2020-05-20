import Action from './actionInterface'
import ActionData from './actionData'

export default class RespondTextAction implements Action {
  private message: string

  constructor(message: string) {
    this.message = message
  }

  perform(data: ActionData): ActionData {
    data.textChannel.createMessage(this.message)
    return data
  }
}
