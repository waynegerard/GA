import { expect } from 'chai'
import 'mocha'
import exampleSkill from './exampleSkill'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('exampleSkill', () => {
    beforeEach(() => {
        this.exampleSkill = new exampleSkill()
    })

    describe('getString', () => {
        it('should return a string', () => {
            const testProbability = 2
            expect(this.exampleSkill.getString(testProbability)).to.be.string
        })

        it('should return undefined for an invalid index', () => {
            const testProbability = -32
            expect(this.exampleSkill.getString(testProbability)).to.be.undefined
        })
    })

    describe('getProbability', () => {
        it('should return 0 for numbers less than or equal to 1', () => {
            const testNegative = -2
            const testZero = 0
            const testOne = 1
            expect(this.exampleSkill.getString(testZero)).to.be.equal(0)
            expect(this.exampleSkill.getString(testOne)).to.be.equal(0)
            expect(this.exampleSkill.getString(testNegative)).to.be.equal(0)
        })
    })
})
