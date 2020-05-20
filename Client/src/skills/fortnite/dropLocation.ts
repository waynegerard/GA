import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class FortniteDropLocation extends BaseSkill {
    skillName = "Fortnite Drop Location Randomizer"

    private fortniteLocations = {
        1: "Lazy Lake",
        2: "Craggy Cliffs",
        3: "Slurpy Swamp",
        4: "Misty Meadows",
        5: "Dirty Docks",
        6: "Frenzy Farm",
        7: "Pleasant Park",
        8: "Sweaty Sands",
        9: "Steamy Stacks",
        10: "Weeping Woods",
        11: "Holly Hedges",
        12: "Retail Row",
        13: "Salty Springs",
    }

    helpMessage(): string {
      return `
Fortnite:
**fortnite**: Return a random fortnite drop location`
    }

    constructor() {
      super()
      this.commandMap.addCommand("fortnite", ["fortnite drop", "fortnite drop location", "fortnite drop zone",
              "fortnite dropzone"], this.drop.bind(this))
    }

    getLocation(probability: number): string {
        return this.fortniteLocations[probability]
    }

    getProbability(maxIndex: number): number {
        if (maxIndex <= 1) {
            this.log(`getProbability`, `The max index: ${maxIndex} is less than or equal to 1. 
            This should be the number of Fortnite drop locations`)
            return 0
        }
        const probability = Math.floor(Math.random() * maxIndex) + 1
        this.log('getProbability', `Generated the probability of ${probability} using the max value of ${maxIndex}`)
        return probability
    }

    drop(message: SkillMessage): void {
        const numberOfLocations = Object.keys(this.fortniteLocations).length
        const probability = this.getProbability(numberOfLocations)
        this.log('drop', `Generating a random Fortnite drop spot out of ${numberOfLocations} possibilities`)
        const reply = this.getLocation(probability)
        message.createMessage(reply)
    }
}
