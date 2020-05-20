import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class Odds extends BaseSkill {
  skillName: string = "Odds"

  constructor() {
    super()
    this.commandMap.addCommand("odds", [], this.odds.bind(this))
  }

  getMaxRange(input: string): number {
    if (input === '') {
        const parseRange = 20
        return parseRange
    }

    const parseRange = parseInt(input, 10)
    return parseRange
  }

  randomNumber(maxRange: number): string {
    const maximum = Math.floor(maxRange)
    const answer = String(Math.floor(Math.random() * (maximum)) + 1)
    this.log('randomNumber', `Calculating random number between 1 and ${maxRange} inclusive`)
    return answer
  }

  odds(message: SkillMessage): void {
    const tokens = message.arguments.split("|")
    const number = tokens[0]
    const action = tokens[1]
    if (!number || !action) {
      message.createMessage("Usage: ga odds <number> | <action>")
      return
    }
    const range = this.getMaxRange(number)
    const roll = this.randomNumber(range)
    message.createMessage(`Odds that ${action.trim()}? ||${roll}|| out of ${number}`)
  }

  helpMessage(): string {
    return `**odds** <number> | <action>: Odds that you shave your head rn?`
  }
}
