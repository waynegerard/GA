import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class SoundBoard extends BaseSkill {
  skillName: string = "Sound Board"

  constructor() {
    super()
    this.commandMap.addCommand("rickroll", ["rick roll", "rick rolled"], this.rickroll.bind(this))
    this.commandMap.addCommand("leeroy", ["leroy", "jenkins"], this.leeroy.bind(this))
    this.commandMap.addCommand("fart", [], this.fart.bind(this))
    this.commandMap.addCommand("fatality", [], this.fatality.bind(this))
    this.commandMap.addCommand("yay", ["uwu", "yayy", "yyay"], this.yay.bind(this))
    this.commandMap.addCommand("record", [], this.record.bind(this))
    this.commandMap.addCommand("honk", [], this.honk.bind(this))
    this.commandMap.addCommand("rewind", [], this.rewind.bind(this))
    this.commandMap.addCommand("drumroll", [], this.drumroll.bind(this))
    this.commandMap.addCommand("nope", [], this.nope.bind(this))
    this.commandMap.addCommand("sadtrombone", ["womp womp", "womp"], this.sadtrombone.bind(this))
    this.commandMap.addCommand("badumtss", ["rimshot"], this.badumtss.bind(this))
    this.commandMap.addCommand("crickets", ["cricket", "silence", "awkward"], this.crickets.bind(this))
    this.commandMap.addCommand("punch", ["falcon", "falconpunch", "captainfalcon"], this.punch.bind(this))
    this.commandMap.addCommand("prettygood", ["hey", "that's good", "pretty good", "hey that's pretty good"],
                               this.prettygood.bind(this))
    this.commandMap.addCommand("lakad", ["lakad matatag", "matatag", "normalin"], this.lakad.bind(this))
    this.commandMap.addCommand("aww", ["cute", "aw"], this.aww.bind(this))
    this.commandMap.addCommand("patience", ["patience from zhou", "zhou"], this.patience.bind(this))
    this.commandMap.addCommand("bane", ["adopted the dark", "in the dark", "i was born in the dark", "the dark"],
                               this.bane.bind(this))
    this.commandMap.addCommand("imback", ["im back", "i'm back", "back"], this.imback.bind(this))
    this.commandMap.addCommand("jonsnow", ["jon snow", "you know nothing", "game of thrones"], this.jonsnow.bind(this))
    this.commandMap.addCommand("minions", ["minion"], this.minions.bind(this))
    this.commandMap.addCommand("saywhat", ["say what again", "pulp fiction", "samuel jackson"], this.saywhat.bind(this))
    this.commandMap.addCommand("bye", ["bye bye"], this.bye.bind(this))
    this.commandMap.addCommand("dramatic", [], this.dramatic.bind(this))
    this.commandMap.addCommand("eh", ["euh"], this.eh.bind(this))
    this.commandMap.addCommand("headshot", ["head shot"], this.headshot.bind(this))
    this.commandMap.addCommand("mariolaugh", ["mario laugh", "laugh"], this.mariolaugh.bind(this))
    this.commandMap.addCommand("mario", ["mario"], this.mario.bind(this))
    this.commandMap.addCommand("notfunny", ["donkey kong", "didn't laugh"], this.notfunny.bind(this))
    this.commandMap.addCommand("no", [], this.no.bind(this))
    this.commandMap.addCommand("simp", ["mvp", "mr. mvp"], this.simp.bind(this))
    this.commandMap.addCommand("bruh", [], this.bruh.bind(this))
    this.commandMap.addCommand("chimp", ["monkey"], this.chimp.bind(this))
  }

  helpMessage(): string {
    return `Sound Board (voice commands work too):
**aww**, **badumtss**, **bane**, **bruh**, **bye**, **crickets**, **chimp**, **dramatic**, **drumroll**, **eh**, 
**fart**, **fatality**, **headshot**, **honk**, **imback**, **jonsnow**, **lakad**, **leeroy**, **mario**, 
**mariolaugh**, **minions**, **no**, **nope**, **notfunny**, **patience**, **prettygood**, **punch**, **record**, 
**rewind**, **rickroll**, **sadtrombone**, **saywhat**, **simp**, **yay**`
  }

  async play(link: string, name: string, message: SkillMessage): Promise<void> {
    this.log('play', `Playing sound: ${name}`)
    message.joinAndPlayShortAudioURL(link)
  }

  private minionsMap = {
    1: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-1.wav",
    2: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-2.wav",
    3: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-3.wav",
    4: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-4.wav",
    5: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-5.wav",
    6: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-6.wav",
    7: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-7.wav",
    8: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-8.wav",
    9: "https://midgame-soundboard.s3.us-east-2.amazonaws.com/minions-9.wav",
  }

  rickroll(message: SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/rickroll.mkv"
    this.play(link, "rickroll", message)
  }

  leeroy(message: SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/leeroy.mkv"
    this.play(link, "leeroy", message)
  }

  fart(message: SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/fart.mkv"
    this.play(link, "fart", message)
  }

  fatality(message: SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/fatality.mkv"
    this.play(link, "fatality", message)
  }

  yay(message: SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/yay.mkv"
    this.play(link, "yay", message)
  }

  record(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/record.mkv"
    this.play(link, "record", message)
  }

  honk(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/honk.mkv"
    this.play(link, "honk", message)
  }

  rewind(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/rewind.mkv"
    this.play(link, "rewind", message)
  }

  drumroll(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/drumroll.mkv"
    this.play(link, "drumroll", message)
  }

  nope(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/nope.mkv"
    this.play(link, "nope", message)
  }

  sadtrombone(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/wompwomp.mkv"
    this.play(link, "sadtrombone", message)
  }

  badumtss(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/badumtss.mkv"
    this.play(link, "badumtss", message)
  }

  crickets(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/crickets.mkv"
    this.play(link, "crickets", message)
  }

  punch(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/falconpunch.mkv"
    this.play(link, "punch", message)
  }

  prettygood(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/prettygood.wav"
    this.play(link, "prettygood", message)
  }

  lakad(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/lakad.wav"
    this.play(link, "lakad", message)
  }

  aww(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/aww.wav"
    this.play(link, "aww", message)
  }

  patience(message:SkillMessage): void {
    const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/patience.wav"
    this.play(link, "patience", message)
  }

  bane(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/adopted-the-dark.wav"
      this.play(link, "bane", message)
  }

  imback(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/im-back.wav"
      this.play(link, "imback", message)
  }

  jonsnow(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/jon-snow.wav"
      this.play(link, "jonsnow", message)
  }

  saywhat(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/say-what-again.wav"
      this.play(link, "saywhat", message)
  }

  minions(message:SkillMessage): void {
    const numberOfSounds = Object.keys(this.minionsMap).length
    const probability = Math.floor(Math.random() * numberOfSounds) + 1
    const link = this.minionsMap[probability]
    this.play(link, "minions", message)
  }

  bye(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/bye.wav"
      this.play(link, "bye", message)
  }

  dramatic(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/dramatic.wav"
      this.play(link, "dramatic", message)
  }

  eh(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/euh.wav"
      this.play(link, "eh", message)
  }

  mario(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/itsa-me.wav"
      this.play(link, "mario", message)
  }

  mariolaugh(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/mario-fire.wav"
      this.play(link, "mariolaugh", message)
  }

  no(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/no.wav"
      this.play(link, "no", message)
  }

  notfunny(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/not-funny.wav"
      this.play(link, "notfunny", message)
  }

  headshot(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/headshot.wav"
      this.play(link, "headshot", message)
  }

  bruh(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/Bruh Sound Effect #2-2ZIpFytCSVc.wav"
      this.play(link, "bruh", message)
  }

  simp(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/simp.wav"
      this.play(link, "simp", message)
  }

  chimp(message:SkillMessage): void {
      const link = "https://midgame-soundboard.s3.us-east-2.amazonaws.com/chimp.wav"
      this.play(link, "chip", message)
  }
}
