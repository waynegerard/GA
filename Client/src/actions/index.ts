import ActionInterface from './actionInterface'
import ActionData from './actionData'
import ActionProcessor from './actionProcessor'
import AdminMessageAction from './adminMessage'
import JoinVoiceAction from './joinVoice'
import LeaveVoiceAction from './leaveVoice'
import RespondTextAction from './respondText'
import StopVoiceAction from './stopVoice'
import SkipVoiceAction from './skipVoice'
import AddLongAudioAction from './addLongAudio'
import AddShortAudioAction from './addShortAudio'

const ActionDataToAction = (actionData: any): ActionInterface => {
  let action: ActionInterface
  const { channel, contents } = actionData

  switch (actionData.action) {
    case "RESPOND_TEXT":
      action = new RespondTextAction(contents)
      break
    case "CREATE_ADMIN_MESSAGE":
      action = new AdminMessageAction(contents, channel)
      break
    default:
      break
  }

  return action
}

export {
 ActionInterface, ActionData, ActionProcessor, JoinVoiceAction, LeaveVoiceAction,
 StopVoiceAction, SkipVoiceAction, AddLongAudioAction, AddShortAudioAction,
 ActionDataToAction,
}
