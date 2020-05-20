import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class LeaveVoice extends BaseSkill {
  skillName: string = "Leave Voice"

  constructor() {
    super()
    this.commandMap.addCommand("leave", ["leave"], this.leave.bind(this))
  }

  async leave(message: SkillMessage): Promise<void> {
    message.leaveVoice()
  }

  helpMessage(): string {
    return `**leave**: Force the bot to leave the current voice channel`
  }
}
