import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class exampleSkill extends BaseSkill {
    skillName = "A template skill you can customize!"

    private stringMap = {
        1: "Rolled a 1",
        2: "Oh look a 2",
        3: "tres",
        4: "fouuurrrr",
    }

    helpMessage(): string {
      return `
Example:
**example**: Return a string given a random number`
    }

    constructor() {
      super()
      this.commandMap.addCommand("example", ["examples"], this.example.bind(this))
    }

    getString(probability: number): string {
        return this.stringMap[probability]
    }

    getProbability(maxIndex: number): number {
        if (maxIndex <= 1) {
            this.log(`getProbability`, `The max index: ${maxIndex} is less than or equal to 1. 
            This should be the number of strings in your map`)
            return 0
        }
        const probability = Math.floor(Math.random() * maxIndex) + 1
        this.log('getProbability', `Generated the probability of ${probability} using the max value of ${maxIndex}`)
        return probability
    }

    example(message: SkillMessage): void {
        const numberOfStrings = Object.keys(this.stringMap).length
        const probability = this.getProbability(numberOfStrings)
        this.log('example', `Generating a random string out of ${numberOfStrings} possibilities`)
        const reply = this.getString(probability)
        message.createMessage(reply)
    }
}
