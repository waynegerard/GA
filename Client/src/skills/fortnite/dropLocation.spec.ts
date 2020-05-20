import { expect } from 'chai'
import 'mocha'
import FortniteDropLocation from './dropLocation'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('FortniteDropLocation', () => {
    beforeEach(() => {
        this.dropLocation = new FortniteDropLocation()
    })

    describe('getLocation', () => {
        it('should return a string', () => {
            const testProbability = 8
            expect(this.dropLocation.getLocation(8)).to.be.string
        })

        it('should return undefined for an invalid index', () => {
            const testProbability = 532
            expect(this.dropLocation.getLocation(testProbability)).to.be.undefined
        })
    })

    describe('getProbability', () => {
        it('should return 0 for numbers less than or equal to 1', () => {
            const testNegative = -2
            const testZero = 0
            const testOne = 1
            expect(this.dropLocation.getProbability(testZero)).to.be.equal(0)
            expect(this.dropLocation.getProbability(testOne)).to.be.equal(0)
            expect(this.dropLocation.getProbability(testNegative)).to.be.equal(0)
        })
    })
})
