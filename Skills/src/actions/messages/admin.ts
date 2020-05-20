import Action from '../action'
import { ActionTypes } from '../types'

export default class CreateAdminMessageAction extends Action {
  actionType = ActionTypes.CREATE_ADMIN_MESSAGE

  contents: string

  channel: {name: string}

  constructor(contents: string, channel: string) {
    super()
    this.contents = contents
    this.channel = { name: channel }
  }

  toObject(): object {
    return { action: this.actionType, channel: this.channel, contents: this.contents }
  }
}
