import Action from './actionInterface'
import ActionData from './actionData'

export default class AddShortAudioAction implements Action {
  url: string

  constructor(url: string) {
    this.url = url
  }

  perform(data: ActionData): ActionData {
    data.voiceHandler.addShortAudioURL(this.url)
    return data
  }
}
