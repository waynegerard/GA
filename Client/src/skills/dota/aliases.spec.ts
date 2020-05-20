import { expect } from 'chai'
import 'mocha'
import DotaAliases from './aliases'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('DotaAliases', () => {
    beforeEach(() => {
        this.dotaAlias = new DotaAliases()
    })

    describe('isFormalHeroName', () => {
        it('should return true for a Dota hero regardless of casing', () => {
            const camel = this.dotaAlias.isFormalHeroName('Axe')
            const lower = this.dotaAlias.isFormalHeroName('axe')
            const weird = this.dotaAlias.isFormalHeroName('aXE')
            const upper = this.dotaAlias.isFormalHeroName('AXE')
            expect(camel).to.be.true
            expect(lower).to.be.true
            expect(weird).to.be.true
            expect(upper).to.be.true
        })

        it('should return false for a nonexistent Dota hero', () => {
            const fake = this.dotaAlias.isFormalHeroName('Alaska')
            const empty = this.dotaAlias.isFormalHeroName('')
            expect(fake).to.be.false
            expect(empty).to.be.false
        })
    })
})
