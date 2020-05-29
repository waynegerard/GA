import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class JoinVoice extends BaseSkill {
    skillName: string = "Join Voice"

    constructor() {
        super()
        this.commandMap.addCommand("join", ["join"], this.join.bind(this))
    }

    async join(message: SkillMessage): Promise<void> {
        message.joinVoice()
    }

    helpMessage(): string {
        return `**join**: Force the bot to join the voice channel you're currently in`
    }
}