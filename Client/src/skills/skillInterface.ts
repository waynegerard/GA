import SkillMessage from '../models/skillMessage'

export default interface SkillInterface {
  skillName: string
  findHandler(message: SkillMessage): string
  handleMessage(message: SkillMessage): void
  helpMessage(): string
}
