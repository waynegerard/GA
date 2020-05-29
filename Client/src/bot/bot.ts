import Eris from 'eris'
import Guild from './guild'
import Discord from './discord'
import logger from '../util/logger'
import Admin from './admin'

export default class Bot {
  private client: Eris.Client

  private guildMap: { [id: number]: Guild } = {}

  constructor(discordToken: string) {
    this.client = new Eris.Client(discordToken)
    this.client.on('messageCreate', this.handleMessage.bind(this))
  }

  connect(): void {
    this.client.connect()
    this.client.on('ready', () => {
      logger.info('Bot connected')
      this.client.editStatus("online", {
        name: '!ga help',
        type: 3,
      })
      // Setup the admin client
      const admin = Admin.getInstance()
      admin.setClient(this.client)

      this.client.guilds.forEach((discordGuild: Eris.Guild) => {
        const guild = new Guild(discordGuild)
        guild.monitor()
        this.guildMap[discordGuild.id] = guild
      })
    })
  }

  async handleMessage(msg: Eris.Message) {
    let { channel } = msg
    if (channel.type !== Discord.GuildTextChannelType.TEXT) {
      return
    }
    channel = channel as Eris.TextChannel
    let guild = this.guildMap[channel.guild.id]
    if (!guild) {
      logger.info(`Couldnt find guild in guild map, adding: ${channel.guild.id}`)
      guild = new Guild(channel.guild)
      guild.monitor()
      this.guildMap[guild.id] = guild
    }
    // Don't handle messages from us
    const self = await this.client.getSelf()
    if (msg.author.id === self.id) {
      return
    }
    logger.info(`Message: ${msg.content}`)
    guild.handleMessage(msg.content, msg.author, channel)
  }

  /**
   * Gracefully shuts down the discord client, as opposed to forcefully cutting the connection and letting
   * the bot timeout.
   */
  shutdownGracefully() {
    logger.info('Bot shutting down gracefully')
    this.client.disconnect({ reconnect: false })
  }
}
