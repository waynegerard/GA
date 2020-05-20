import newrelic from 'newrelic'
import SkillMessage from '../models/skillMessage'
import SkillResponse from '../models/skillResponse'
import SkillHandler from '../skills/handler'

const MessagesController = {

  new: async (req, res) => {
    newrelic.setControllerName("messages", "new")
    const jsonMessage = req.body
    const message: SkillMessage = SkillMessage.instanceFromJSON(jsonMessage)
    const handler: SkillHandler = SkillHandler.getInstance()
    const response: SkillResponse = await handler.handleMessage(message)
    res.status(200).json(response.toObject())
  },
}

export default MessagesController
