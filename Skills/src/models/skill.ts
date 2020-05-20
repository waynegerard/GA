import SkillMessage from './skillMessage'
import CommandMap from './commandMap'
import SkillResponse from './skillResponse'

export default abstract class Skill {
  commandMap: CommandMap

  constructor() {
    this.commandMap = new CommandMap()
  }

  async handleMessage(message: SkillMessage): Promise<SkillResponse> {
    const result = await this.commandMap.handleCommand(message)
    return result
  }

  findHandler(message: SkillMessage): string {
    return this.commandMap.findMatchingAlias(message.contents)
  }
}
