import MusicPlayer from './fun/music'
import exampleSkill from './example/exampleSkill'
import BaseSkill from './baseSkill'
import JoinVoice from './meta/join'
import LeaveVoice from './meta/leave'

const skillList: any[] = [exampleSkill,  MusicPlayer, JoinVoice, LeaveVoice]

const skillInstances = () => skillList.map((skill: any): BaseSkill => new (<any>skill)())

const skillHelp = () => skillInstances().map((skill: any) => {
  const messages = skill.commandMap.helpMessages()
  return Object.keys(messages).map((key: string) => `**ga ${key}**: ${messages[key]}`)
})

export default {
  skillInstances, skillHelp,
}
