import Discord from './discord'

const ADMIN_GUILD_ID = "514895586760327184"

/**
 * Handles some admin-related stuff on Discord, mostly auditing certain logs.
 */
export default class Admin {
  private client: Discord.Client | undefined

  private adminGuild: Discord.DiscordGuild | undefined

  private static instance: Admin

  private constructor() { }

  public static getInstance(): Admin {
    if (!Admin.instance) {
      Admin.instance = new Admin()
    }
    return Admin.instance
  }

  public setClient(client: Discord.Client) {
    this.client = client
    this.adminGuild = client.guilds.find((guild: Discord.DiscordGuild) => guild.id === ADMIN_GUILD_ID)
  }

  public sendMessage(channelName: string, message: string, args: object = {}) {
    if (!this.adminGuild) {
      return
    }

    const channel: Discord.TextChannel = this.adminGuild.channels.find(
      (guildChannel: Discord.GuildChannel) => guildChannel.name === channelName,
    )

    let formattedMessage = `${message}: `
    Object.keys(args).forEach((key: string) => {
      let value = args[key]
      if (typeof value !== "string") {
        value = JSON.stringify(value)
      }
      formattedMessage = `${formattedMessage}\n         **${key}**: ${value}`
    })
    channel.createMessage(formattedMessage)
  }
}
