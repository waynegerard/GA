import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class AreYouGay extends BaseSkill {
    skillName: string = "Are You Gay?"

    constructor() {
        super()
        this.commandMap.addCommand("gay?", ["gay"], this.gay.bind(this))
    }

    helpMessage(): string {
      return `**gay <name>**: Sexuality is a spectrum`
    }

    private responseMap = {
        1: "probably gay",
        2: "y u checkin them out?",
        3: `well I actually heard`,
        4: "All I know for sure is they're a furry",
        5: "gay",
        6: "definitely not gay",
        7: "can't say for sure",
        8: "well if their Jonas Brothers poster says anything...",
        9: "It's 2020 man",
        // 10: "once told me they thought",
    }

    randomNumber(): number {
        const answer = Math.floor(Math.random() * 9) + 1
        this.log('randomNumber', `Calculating random number between 1 and 9 inclusive: ${answer}`)
        return answer
    }

    getReplyStructure(probability: number): string {
        return this.responseMap[probability]
    }

    gay(message: SkillMessage): void {
        const input = message.arguments
        const cleanInput = input.replace(/[?]/g, "").trim()
        const caller = message.author.username
        const random = this.randomNumber()
        let reply
        if (random === 3) {
            reply = this.getReplyStructure(random).concat(" ", caller, " has a crush on ", cleanInput)
        }
        // Need to figure out how to get a random user from the channel still
        // else if (random === 10) {
        //     reply = this.getReplyStructure(random).concat(cleanInput, " ", randomUser, " was pretty cute")
        // }
        else {
            reply = this.getReplyStructure(random)
        }
        message.createMessage(`${cleanInput}?`.concat(" ", reply))
    }
}
