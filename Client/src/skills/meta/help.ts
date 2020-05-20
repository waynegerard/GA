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
    const botInviteLink = "<http://bit.ly/ga-discord-bot>"

    /* eslint-disable  max-len */
    const msg = `GA is a digital party host that makes gaming and hanging out with friends more fun. 
    
It lets you play music, ask icebreaker questions, save funny moments, and play hilarious audio clips with text + voice commands.

Full command list: **ga help commands**
Send us feedback: **ga feedback** [your feedback]

Official GA Discord: ${serverInviteLink}
Invite the bot to your own server: ${botInviteLink}
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
