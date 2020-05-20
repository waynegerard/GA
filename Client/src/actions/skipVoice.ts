import Action from './actionInterface'
import ActionData from './actionData'

export default class SkipVoiceAction implements Action {
  perform(data: ActionData): ActionData {
    data.voiceHandler.next()
    return data
  }
}
