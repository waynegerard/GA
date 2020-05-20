import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export default class LearnModel {
  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private name: string

  @Column()
  private learn: string

  @Column()
  private guildId: string

  constructor(name, learn, guildId: string) {
    this.name = name
    this.learn = learn
    this.guildId = guildId
  }

  get Learn(): string {
    return this.learn
  }

  get GuildId(): string {
    return this.guildId
  }
}
