import Action from './actionInterface'
import ActionData from './actionData'

export default class LeaveVoiceAction implements Action {
  perform(data: ActionData): ActionData {
    data.voiceHandler.leave()
    return data
  }
}
