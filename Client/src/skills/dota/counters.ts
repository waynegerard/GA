import DotaAliases from './aliases'
import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

const axios = require('axios')
const cheerio = require('cheerio')

export default class DotaCounters extends BaseSkill {
  skillName: string = "DOTA counters"

  private aliases = new DotaAliases()

  constructor() {
    super()
    this.commandMap.addCommand("counter", ["counters", "counter pick"], this.counter.bind(this))
  }

  helpMessage(): string {
    return `Dota: 
**counter <hero>**: Returns the current patch's highest winrate heroes against the given hero`
  }

  generateLink(hero: string): string {
    // Remove all non word characters. Don't replace with value
    const removeMiscCharacters = hero.toLowerCase().replace(/[^\w ]/g, '')
    // Replace whitespace with hyphen because DotaBuff does that
    const formmatedHero = removeMiscCharacters.replace(/ /g, '-')
    const link = 'https://www.dotabuff.com/heroes/'.concat(formmatedHero, '/counters')
    this.log("generateLink", `Generated ${link}`)
    return link
  }

  async getHTML(link: string): Promise<string> {
    const res = await axios.get(link)
    const html = res.data
    const rawQuery = cheerio.load(html)
    const fullPageString = rawQuery('.counter-outline')
      .first()
      .find('table tbody tr')
      .text()
    return fullPageString
  }

  formatString(fullPageString: string): string {
    // Remove characters that are not letters, but keep apostrophe (Nature's Prophet) and hyphen (Anti-Mage)
    const removeNumbers = fullPageString.replace(/[^\sA-Z-']/gi, ',')
    // Remove sequential characters and replace with just 1 of that character. In this case, commas
    const removeExtraCommas = removeNumbers.replace(/^,|,$|(,)+/g, '$1 ')
    // Remove the last 2 characters, whitespace and the comma
    return removeExtraCommas.slice(0, -2)
  }

  async counter(message: SkillMessage): Promise<void> {
    const hero = message.arguments
    let heroAlias = hero
    if (!this.aliases.isFormalHeroName(hero) && !this.aliases.isHeroAlias(hero)) {
      this.log("counter", `The name: ${hero} does not seem to be a valid name nor alias`)
      message.createMessage(`IceFrog does not recognize the name ${hero}`)
      return
    }
    if (this.aliases.isHeroAlias(hero)) {
      heroAlias = this.aliases.getHeroAlias(hero)
    }
    const link = this.generateLink(heroAlias)
    const unformattedContent = await this.getHTML(link)
    const reply = this.formatString(unformattedContent)
    message.createMessage(reply)
    }
}
