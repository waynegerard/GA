import { Readable } from 'stream'
import Action from './actionInterface'
import ActionData from './actionData'

export default class AddLongAudioAction implements Action {
  stream: Readable

  constructor(stream: Readable) {
    this.stream = stream
  }

  perform(data: ActionData): ActionData {
    data.voiceHandler.addLongAudioStream(this.stream)
    return data
  }
}
