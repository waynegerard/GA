import SkillMessage from '../models/skillMessage'
import SkillResponse from '../models/skillResponse'
import Skill from '../models/skill'
import logger from '../util/logger'
import { CreateRespondAction } from '../actions'
import Feedback from './midgame/feedback'
import analytics from '../util/analytics'

export default class SkillHandler {
  private static instance: SkillHandler

  private skills: Skill[] = [new Feedback()]

  async handleMessage(message: SkillMessage): Promise<SkillResponse> {
    const selectedSkill: Skill = this.skills.find((skill: Skill): boolean => {
      const command = skill.findHandler(message)
      if (!command) {
        return false
      }
      message.Command = command
      return true
    })

    if (!selectedSkill) {
      return null
    }

    try {
      const response = await selectedSkill.handleMessage(message)
      this.trackInvocation(message.command, message.guild, message.user)
      return response
    } catch (e) {
      logger.error(e)
      this.trackError(message.command, message.guild, message.user, e.message)
      return this.errorResponse(message)
    }
  }

  errorResponse(message: SkillMessage): SkillResponse {
    const response = new SkillResponse()
    const respondAction = new CreateRespondAction(message, "Something went wrong!")
    response.addAction(respondAction)
    return response
  }

  static getInstance(): SkillHandler {
    if (!SkillHandler.instance) {
      SkillHandler.instance = new SkillHandler()
    }
    return SkillHandler.instance
  }

  trackInvocation(skill: string, guild: any, author: any) {
    analytics.track({
      userId: author.id,
      event: 'Skill Invoked',
      properties: {
        guildId: guild.id,
        skillName: skill,
      },
    })

    analytics.identify({
      userId: author.id,
      traits: {
        name: author.username,
      },
    })
  }

  trackError(skill: string, guild: any, author: any, errorMessage: string) {
    analytics.track({
      event: "Skill Error",
      userId: author.id,
      properties: {
        guildId: guild.id,
        skillName: skill,
        error: errorMessage,
      },
    })
  }
}
