import { expect } from 'chai'
import 'mocha'
import OverwatchHeroPicker from './heroPicker'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('OverwatchHeroPicker', () => {
    beforeEach(() => {
        this.overwatchHeroPicker = new OverwatchHeroPicker()
    })

    describe('getMapReply', () => {
        it('should return a string', () => {
            const testResponseMap = {
                1: "t",
                2: "test",
                3: "123",
                4: "#@$*",
                5: "特色",
                6: "",
            }
            expect(this.overwatchHeroPicker.getMapReply(testResponseMap)).to.be.string
        })
    })

    describe('getProbability', () => {
        it('should return 0 for numbers less than or equal to 1', () => {
            const testNegative = -2
            const testZero = 0
            const testOne = 1
            expect(this.overwatchHeroPicker.getProbability(testZero)).to.be.equal(0)
            expect(this.overwatchHeroPicker.getProbability(testOne)).to.be.equal(0)
            expect(this.overwatchHeroPicker.getProbability(testNegative)).to.be.equal(0)
        })
    })
})
