import { Stream } from 'stream'

module Discord {
  export interface DiscordGuild {
    id: string
    channels: Collection<GuildChannel>
  }

  export interface Client {
    guilds: Collection<DiscordGuild>
  }

  export interface User {
    username: string
    id: string
  }

  export interface Collection<T> {
    filter: Function,
    find: Function,
    reduce: Function,
    forEach: Function
  }

  export interface GuildChannel {
    type: GuildChannelType
    guild: DiscordGuild
    name: string
    id: string
    leave: () => void
  }

  export interface VoiceChannel extends GuildChannel {
    voiceMembers: Collection<Discord.User>
    join: (options: any) => Promise<any>
  }

  export interface TextChannel extends GuildChannel {
    createMessage: (message: string) => void
  }

  export interface VoiceConnection {
    play: (stream: Stream, options: object | undefined) => void
    stopPlaying: () => void
    playing: () => boolean
    receive: (encodingType: string) => VoiceDataStream
    setVolume: (volume: number) => void
    ready: boolean
    on: (event: string, callback: Function) => void
  }

  export interface VoiceDataStream {
    on: (event: string, callback: Function) => void
  }

  export enum GuildChannelType {
    CATEGORY = 0,
    VOICE = 2,
    TEXT = 4,
  }

  export enum GuildTextChannelType {
    TEXT = 0,
  }
}

export default Discord
