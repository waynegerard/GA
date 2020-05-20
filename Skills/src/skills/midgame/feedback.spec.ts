import { expect } from 'chai'
import 'mocha'
import Feedback from './feedback'

/* eslint-disable  @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe('Feedback', () => {
  describe('findHandler', () => {
    beforeEach(() => {
      this.feedback = new Feedback()
    })

    it('should respond to feedback, feed back, and complaint', () => {
      const commandOne = { contents: "feedback test" }
      const commandTwo = { contents: "feed back test" }
      const commandThree = { contents: "complaint test" }
      expect(this.feedback.findHandler(commandOne)).to.equal("feedback")
      expect(this.feedback.findHandler(commandTwo)).to.equal("feed back")
      expect(this.feedback.findHandler(commandThree)).to.equal("complaint")
    })
  })
})
