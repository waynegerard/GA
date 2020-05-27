import MusicPlayer from './fun/music'
import exampleSkill from './example/exampleSkill'
import BaseSkill from './baseSkill'

const skillList: any[] = [exampleSkill,  MusicPlayer]

const skillInstances = () => skillList.map((skill: any): BaseSkill => new (<any>skill)())

const skillHelp = () => skillInstances().map((skill: any) => {
  const messages = skill.commandMap.helpMessages()
  return Object.keys(messages).map((key: string) => `**ga ${key}**: ${messages[key]}`)
})

export default {
  skillInstances, skillHelp,
}
