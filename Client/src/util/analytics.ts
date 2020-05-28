import Analytics from 'analytics-node'
import Constants from './constants'

let analytics

if (process.env.NODE_ENV !== 'test') {
  analytics = new Analytics(Constants.SEGMENT_KEY)
}

export default analytic
