import MusicPlayer from './fun/music'
import DotaCounters from './dota/counters'
import Odds from './fun/odds'
import SoundBoard from './fun/sounds'
import RandomNoInput from './fun/randomNoInput'
import FortniteDropLocation from './fortnite/dropLocation'
import ApexDropLocation from './apex/apexDrop'
import AreYouGay from './fun/areyougay'
import Hotseat from './fun/hotseat'
import BaseSkill from './baseSkill'
import Credit from './meta/credit'
import Learn from './learn/learn'
import JoinVoice from './meta/join'
import LeaveVoice from './meta/leave'
import Slap from './easterEggs/slap'
import OverwatchHeroPicker from './overwatch/heroPicker'

const skillList: any[] = [DotaCounters, FortniteDropLocation, ApexDropLocation, OverwatchHeroPicker, MusicPlayer,
  RandomNoInput, Odds, AreYouGay, Hotseat, Learn, SoundBoard, Credit, JoinVoice, LeaveVoice, Slap]

const skillInstances = () => skillList.map((skill: any): BaseSkill => new (<any>skill)())

const skillHelp = () => skillInstances().map((skill: any) => {
  const messages = skill.commandMap.helpMessages()
  return Object.keys(messages).map((key: string) => `**ga ${key}**: ${messages[key]}`)
})

export default {
  skillInstances, skillHelp,
}
