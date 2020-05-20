import ActionData from "./actionData"
import Action from "./actionInterface"
import Discord from "../bot/discord"
import logger from "../util/logger"
import Admin from "../bot/admin"

const ActionProcessor = {
  createErrorMessage: (message: string, actionData: ActionData) => {
    const channel = actionData.textChannel as Discord.TextChannel
    if (!channel) {
      logger.error("No channel present when creating error message in Action Processor!", { actionData })
    }
    channel.createMessage(`Error: ${message}`)
    Admin.getInstance().sendMessage("monitoring", message)
  },

  processActions: async (actions: Action[], actionData: ActionData) => {
    for (let i = 0; i < actions.length; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        actionData = await actions[i].perform(actionData)
      } catch (e) {
        ActionProcessor.createErrorMessage(e.message, actionData)
      }
    }
  },

}

export default ActionProcessor
