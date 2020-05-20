export default class SkillMessage {
  command: string

  arguments: string

  contents: string

  user: {id: string, name: string}

  guild: {id: string, name: string}

  channel: {id: string, name: string, type: string}

  static instanceFromJSON(data: any): SkillMessage {
    const instance = new SkillMessage()
    instance.contents = data.contents
    instance.user = data.user
    instance.guild = data.guild
    instance.channel = data.channel
    return instance
  }

  set Command(command: string) {
    this.command = command
    this.arguments = this.contents.substring(command.length).trim()
  }
}
