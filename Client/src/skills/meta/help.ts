import SkillMessage from '../../models/skillMessage'
import BaseSkill from '../baseSkill'
import SkillList from '../index'

export default class Help extends BaseSkill {
  skillName: string = "Help"

  skillList: BaseSkill[] = SkillList.skillInstances()

  constructor() {
    super()
    this.commandMap.addCommand("help", ["assist"], this.help.bind(this))
  }

  helpMessage(): string {
    const serverInviteLink = "https://discord.gg/fkPyYce"
    const repoLink = "https://github.com/Midgame/GA"

    /* eslint-disable  max-len */
    const msg = `GA is an open source Discord bot that is templated for your customization. Join the community at 
    ${serverInviteLink}. Find the source code at ${repoLink}.
    `
    return msg
  }

  displayCommandList(message: SkillMessage): void {
    const help = this.skillList.map((skill: BaseSkill) => skill.helpMessage()).join("\n")
    const intro = "Call any of the below commands using **ga <command>**:\n\n"
    const msg = `${intro}${help}`
    message.createMessage(msg)
  }

  help(message: SkillMessage): void {
    if (!message.arguments) {
      const msg = this.helpMessage()
      message.createMessage(msg)
      return
    }
    if (message.arguments.toLowerCase().trim() === "commands") {
      this.displayCommandList(message)
    }
  }
}
