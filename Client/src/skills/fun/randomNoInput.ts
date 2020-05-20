import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class RandomNoInput extends BaseSkill {
  skillName = "RNG-NoInput"

  constructor() {
    super()
    this.commandMap.addCommand("8-ball", ["8ball", "8-ball", "eight ball", "eightball", "eight-ball"],
      this.magicBall.bind(this))
    this.commandMap.addCommand("flip", ["flipcoin", "toss", "coin"],
        this.flip.bind(this))
  }

  private ballReplyMap = {
    1: "As I see it, yes",
    2: "Ask again later ¯\\_(ツ)_/¯",
    3: "Better not tell you now (◕‿◕✿)",
    4: "Cannot predict now",
    5: "Concentrate and ask again ~(˘▾˘~)",
    6: "Don't count on it",
    7: "It is certain",
    8: "It is decidely so (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
  }

  private flipReplyMap = {
    1: "Heads",
    2: "Tails",
  }

  getProbability(range: number): number {
    const probability = Math.floor(Math.random() * range) + 1
    this.log('getProbability', `Generated the probability of ${probability}`)
    return probability
  }

  magicBall(message: SkillMessage): void {
    const probability = this.getProbability(8)
    const reply = this.ballReplyMap[probability]
    message.createMessage(reply)
  }

  flip(message: SkillMessage): void {
    const probability = this.getProbability(2)
    const reply = this.flipReplyMap[probability]
    message.createMessage(reply)
  }

  helpMessage(): string {
    return `
**8ball**: Ask the magic 8-ball your question!
**flip**: Flip a plain ol' coin`
  }
}
