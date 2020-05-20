import logger from '../util/logger'
import SkillInterface from './skillInterface'
import SkillMessage from '../models/skillMessage'
import CommandMap from './commandMap'

abstract class BaseSkill implements SkillInterface {
  public commandMap: CommandMap

  public skillName: string

  constructor() {
    this.commandMap = new CommandMap()
  }

  log(method: string, message: string): void {
    logger.info(message, { method, skill: this.skillName })
  }

  logError(method: string, message: string): void {
    logger.error(message, { method, skill: this.skillName })
  }

  findHandler(message: SkillMessage): string {
    return this.commandMap.findMatchingAlias(message.contents)
  }

  handleMessage(message: SkillMessage): void {
    this.log('handleMessage', `Received message: ${message.toString()}`)
    this.commandMap.handleCommand(message)
  }

  abstract helpMessage(): string
}

export default BaseSkill
