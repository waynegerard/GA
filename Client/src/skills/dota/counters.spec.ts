import { expect } from 'chai'
import 'mocha'
import DotaCounters from './counters'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('DotaCounters', () => {
    beforeEach(() => {
        this.dotaCounter = new DotaCounters()
    })

    describe('generateLink', () => {
        it('should strip words of punctuation and add underlines for whitespace', () => {
            const hero = "Nature's Prophet"
            expect(this.dotaCounter.generateLink(hero))
                .to.equal('https://www.dotabuff.com/heroes/natures-prophet/counters')
        })
    })

    describe('formatString', () => {
        it('should remove non-hero punctuation and delete the last 2 characters', () => {
            const testString = "Nature's Prophet&&Anti-Mage ,"
            expect(this.dotaCounter.formatString(testString)).to.equal("Nature's Prophet, Anti-Mage")
        })
    })
})
