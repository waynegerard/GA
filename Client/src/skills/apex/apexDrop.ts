import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class ApexDropLocation extends BaseSkill {
    skillName = "Apex Drop Location Randomizer"

    private apexLocations = {
        1: "Drill Site",
        2: "Lava City",
        3: "Lava Fissure",
        4: "Mirage Voyage",
        5: "Overlook",
        6: "Refinery",
        7: "Skyhook",
        8: "Sorting Factory",
        9: "Survey Camp",
        10: "The Dome",
        11: "The Epicenter",
        12: "The Fragments",
        13: "The Geyser",
        14: "The Harvester",
        15: "The Train Yard",
        16: "The Tree",
        17: "Thermal Station",
    }

    constructor() {
        super()
        this.commandMap.addCommand("apex", ["apex drop", "apex drop location", "apex drop zone", "apex dropzone"],
            this.drop.bind(this))
    }

    helpMessage(): string {
      return `
Apex:
**apex**: Return a random Apex drop location`
    }

    getLocation(probability: number): string {
        return this.apexLocations[probability]
    }

    getProbability(maxIndex: number): number {
        if (maxIndex <= 1) {
            this.log(`getProbability`, `The max index: ${maxIndex} is less than or equal to 1. 
            This should be the number of Apex drop locations`)
            return 0
        }
        const probability = Math.floor(Math.random() * maxIndex) + 1
        this.log('getProbability', `Generated the probability of ${probability} using the max value of ${maxIndex}`)
        return probability
    }

    drop(message: SkillMessage): void {
        const numberOfLocations = Object.keys(this.apexLocations).length
        const probability = this.getProbability(numberOfLocations)
        this.log('drop', `Generating a random Apex drop spot out of ${numberOfLocations} possibilities`)
        const reply = this.getLocation(probability)
        message.createMessage(reply)
    }
}
