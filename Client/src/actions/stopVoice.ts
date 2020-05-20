import Action from './actionInterface'
import ActionData from './actionData'

export default class StopVoiceAction implements Action {
  perform(data: ActionData): ActionData {
    data.voiceHandler.stop()
    return data
  }
}
