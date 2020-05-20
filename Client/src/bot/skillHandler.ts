import Discord from './discord'
import analytics from '../util/analytics'
import logger from '../util/logger'
import SkillMessage from '../models/skillMessage'
import SkillList from '../skills'
import SkillInterface from '../skills/skillInterface'
import SkillService from '../services/skills'
import Help from '../skills/meta/help'
import Admin from './admin'
import Voice from './voice'
import { ActionProcessor, ActionInterface } from '../actions'

export default class SkillHandler {
  private skillHandlers: SkillInterface[] = []

  constructor() {
    this.skillHandlers = SkillList.skillInstances()
    this.skillHandlers.push(new Help()) // help is special
  }

  findWakePhrase(message: string): string | undefined {
    const wakePhrases = ["!ga", "hey ga", "ga", "g a", "ok ga", "okay ga", "okay g a", "gia", "GA"]
    const cleanMessage = message.toLowerCase().trim()
    for (let i = 0; i < wakePhrases.length; i++) {
      if (cleanMessage.startsWith(wakePhrases[i])) {
        return wakePhrases[i]
      }
    }
    return null
  }

  parseContents(message: string, wakePhrase: string): string {
    return message.substring(message.indexOf(wakePhrase) + wakePhrase.length).trim()
  }

  async handleMessage(
    message: string,
    channel: Discord.GuildChannel | undefined,
    author: Discord.User,
    voiceHandler: Voice,
  ): Promise<void> {
    const wakePhrase = this.findWakePhrase(message)
    if (!wakePhrase) {
      return
    }
    const contents: string = this.parseContents(message, wakePhrase)
    logger.info(contents)

    const logData: any = {
      contents: message,
      wakePhrase,
      user: {
        name: author.username,
        id: author.id,
      },
      guild: {
        id: channel.guild.id,
        channel: channel.name,
      },
    }

    const skillMessage: SkillMessage = new SkillMessage(contents, channel, author, voiceHandler)

    const skillHandler: SkillInterface = this.skillHandlers.find((skill: SkillInterface): boolean => {
      const command = skill.findHandler(skillMessage)
      if (!command) {
        return false
      }
      skillMessage.Command = command
      return true
    })

    if (!skillHandler) { // No local handler found, try a remote skill handler
      const actions: ActionInterface[] = await SkillService.request(skillMessage)
      if (actions) {
        await ActionProcessor.processActions(actions, skillMessage.createActionData())
      }
      return
    }

    // Logging
    logData.skill = skillMessage.command
    logData.arguments = skillMessage.arguments
    logData.matchedSkill = skillHandler.skillName
    logger.info("Sending query to skillHandler", { skill: skillHandler.skillName, message: contents })
    this.trackInvocation(skillHandler.skillName, channel.guild, author)

    // Log to admin channel
    const admin = Admin.getInstance()
    admin.sendMessage("skill-invocations", "Skill Invocation", logData)
    this.logResult(logData)

    // Execution
    try {
      skillHandler.handleMessage(skillMessage)
    } catch (e) {
      logger.error(e)
      logData.error = e.toString()
      this.trackError(skillHandler.skillName, channel.guild, author, e.toString())
      admin.sendMessage("monitoring", "Errors", logData)
      skillMessage.createMessage(`Uh oh, something went wrong! 
      Let us know what happened by sending us feedback via '!ga feedback'`)
    }
  }

  logResult(logData: object) {
    logger.info("Tracking skill result", logData)
  }

  trackInvocation(skill: string, guild: Discord.DiscordGuild, author: Discord.User) {
    analytics.track({
      userId: author.id,
      event: 'Skill Invoked',
      properties: {
        guildId: guild.id,
        skillName: skill,
      },
    })

    analytics.track({
      userId: author.id,
      event: skill,
      properties: {
        guildId: guild.id,
      },
    })

    analytics.identify({
      userId: author.id,
      traits: {
        name: author.username,
      },
    })
  }

  trackError(skill: string, guild: Discord.DiscordGuild, author: Discord.User, errorMessage: string) {
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
