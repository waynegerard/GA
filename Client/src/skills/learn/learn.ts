import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'
import LearnModel from './model'
import getConnection from '../database/connection'


export default class Learn extends BaseSkill {
  skillName: string = "Learn"

  constructor() {
    super()
    this.commandMap.addCommand("learn", ["learn", "lern", "at"], this.learn.bind(this))
    this.commandMap.addCommand("quote", ["meme", "quote"], this.learned.bind(this))
  }

  async learn(message: SkillMessage) {
    const tokens = message.arguments.split("|")
    const name = tokens[0]
    let learn = tokens[1].trim()
    if (!name || !learn) {
      message.createMessage("Usage: ga at <name> | <thing>")
    }
    this.log("learn", `Creating new learn for ${name}: ${learn}`)
    // Check if the last character and the first character of the string is quotation marks
    if (learn.substr(learn.length - 1) !== "\"" && learn.charAt(0) !== "\"") {
      if (!learn.includes('http')) {
        this.log("learn", "Given learn was not a link and it wasn't enclosed in quotes, adding quotes around it")
        learn = "\"".concat(learn, "\"")
      }
    }
    const model = new LearnModel(name.toLowerCase().trim(), learn, message.channel.guild.id)
    const connection = await getConnection()
    const learnRepository = connection.getRepository(LearnModel)
    await learnRepository.save(model)
    message.createMessage(`Ok, learned that to ${name.trim()}.`)
  }

  async learned(message: SkillMessage) {
    const name = message.arguments.trim().toLowerCase()
    this.log("learned", `Fetching learn for: ${name}`)
    const connection = await getConnection()
    const learnRepository = connection.getRepository(LearnModel)
    const conditions = { where: { guildId: message.channel.guild.id, name } }
    const learns = await learnRepository.find(conditions)
    const learn = learns[Math.floor(Math.random() * learns.length)]
    message.createMessage(learn.Learn)
  }

  helpMessage(): string {
    return `
At:
**at <name> | <thing to remember>**: Stores a meme, quote, or anything really to a <name>
**quote <name>**: Pick a random thing learned to <name> and post it in chat
    `
  }
}
