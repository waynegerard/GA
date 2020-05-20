import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class OverwatchHeroPicker extends BaseSkill {
    skillName = "Overwatch Hero Picker"

    private tankMap = {
        1: "D.Va",
        2: "Orisa",
        3: "Reinhardt",
        4: "Roadhog",
        5: "Sigma",
        6: "Wrecking Ball",
        7: "Winston",
        8: "Zarya",
    }

    private dpsMap = {
        1: "Ashe",
        2: "Bastion",
        3: "Doomfist",
        4: "Genji",
        5: "Hanzo",
        6: "Junkrat",
        7: "McCree",
        8: "Mei",
        9: "Pharah",
        10: "Reaper",
        11: "Soldier: 76",
        12: "Sombra",
        13: "Symmetra",
        14: "Torbjörn",
        15: "Tracer",
        16: "Widowmaker",
    }

    private supportMap = {
        1: "Ana",
        2: "Baptiste",
        3: "Brigitte",
        4: "Lucio",
        5: "Mercy",
        6: "Moira",
        7: "Zenyatta",
    }

    private memeResponseMap = {
        1: "Just go ",
        2: "Go ",
        3: "Pick ",
        4: "Meme with ",
        5: "Spam ",
        6: "One trick ",
        7: "Bet you won't play ",
        8: "Play ",
    }

    constructor() {
        super()
        this.commandMap.addCommand("ow supp", ["overwatch support", "pick ow supp", "overwatch hero support",
                "ow support"], this.support.bind(this))
        this.commandMap.addCommand("ow dps", ["overwatch dps", "pick ow dps", "overwatch hero dps",
            "ow dps hero"], this.dps.bind(this))
        this.commandMap.addCommand("ow tank", ["overwatch tank", "pick ow tank", "overwatch hero tank",
            "ow tank hero"], this.tank.bind(this))
    }

    getMapReply(replyMap): string {
        const numberOfReplies = Object.keys(replyMap).length
        const probability = this.getProbability(numberOfReplies)
        this.log('getMapReply', `Getting a map value out of ${numberOfReplies} possibilities`)
        return replyMap[probability]
    }

    getProbability(maxIndex: number): number {
        if (maxIndex <= 1) {
            this.log(`getProbability`, `The max index: ${maxIndex} is less than or equal to 1. 
            This should be the number of heroes in the given Overwatch map`)
            return 0
        }
        const probability = Math.floor(Math.random() * maxIndex) + 1
        return probability
    }

    dps(message: SkillMessage): void {
        const hero = this.getMapReply(this.dpsMap)
        const fluffWords = this.getMapReply(this.memeResponseMap)
        message.createMessage(fluffWords + hero)
    }

    support(message: SkillMessage): void {
        const hero = this.getMapReply(this.supportMap)
        const fluffWords = this.getMapReply(this.memeResponseMap)
        message.createMessage(fluffWords + hero)
    }

    tank(message: SkillMessage): void {
        const hero = this.getMapReply(this.tankMap)
        const fluffWords = this.getMapReply(this.memeResponseMap)
        message.createMessage(fluffWords + hero)
    }

    helpMessage(): string {
        return `
Overwatch:
**ow <role>**: Return a random Overwatch supp/dps/tank hero`
    }
}
