import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class Slap extends BaseSkill {
    skillName: string = "Slap em'"

    constructor() {
        super()
        this.commandMap.addCommand("slap", ["smack", "slaps"], this.slap.bind(this))
    }

    helpMessage(): string {
      return ""
    }

    private responseMap = {
        1: "GA slaps",
        2: "Violence is not the answer",
        3: "*slaps*",
    }

    randomNumber(): number {
        const maximum = Object.keys(this.responseMap).length
        const answer = Math.floor(Math.random() * maximum) + 1
        this.log('randomNumber', `Calculating random number between 1 and ${maximum} inclusive: ${answer}`)
        return answer
    }

    getReplyStructure(probability: number): string {
        return this.responseMap[probability]
    }

    slap(message: SkillMessage): void {
        const input = message.arguments
        const random = this.randomNumber()
        let reply
        if (random === 1 && input !== "") {
            reply = this.getReplyStructure(random).concat(" ", input, "! It's super effective!")
        }
        else if (random === 1 && input === "") {
            reply = "GA slaps! ... It's not very effective."
        }
        else {
            reply = this.getReplyStructure(random)
        }
        message.createMessage(reply)
    }
}
