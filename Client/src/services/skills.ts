import axios from 'axios'
import Constants from '../util/constants'
import SkillMessage from '../models/skillMessage'
import logger from '../util/logger'
import { ActionDataToAction, ActionInterface } from '../actions'

axios.defaults.headers.common.Authorization = `Token token=${process.env.AUTH_TOKEN}`

module SkillsService {

  export const request = async (message: SkillMessage): Promise<ActionInterface[]> => {
    const url = `${Constants.SKILL_SERVICE_URL}/messages/new`
    try {
      const result = await axios.post(url, message.toJSON())
      const actions = result.data.actions.map((actionObj: object) => ActionDataToAction(actionObj))
      return actions
    } catch (e) {
      logger.error(e)
    }
    return []
  }
}

export default SkillsService
