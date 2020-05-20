import Skill from '../../models/skill'
import SkillMessage from '../../models/skillMessage'
import SkillResponse from '../../models/skillResponse'
import { CreateRespondAction, CreateAdminMessageAction } from "../../actions"
import logger from '../../util/logger'

export default class Feedback extends Skill {
    skillName: string = "Feedback"

    constructor() {
      super()
      this.commandMap.addCommand("feedback", ["feed back", "complaint"], this.feedback.bind(this))
    }

    feedback(message: SkillMessage): SkillResponse {
      const feedback = message.arguments
      const response = new SkillResponse()
      const textMessage = new CreateRespondAction(message)

      if (feedback === "") {
        textMessage.contents = `Type your comments after the command 'feedback'`
        response.addAction(textMessage)
      } else {
        textMessage.contents = `Thanks for your feedback! Join the conversation at https://discord.gg/fkPyYce`
        response.addAction(textMessage)
        response.addAction(new CreateAdminMessageAction(feedback, "feedback"))

        logger.info(`Feedback: ${feedback}`)
      }
      return response
    }
}
