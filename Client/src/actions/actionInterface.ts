import ActionData from "./actionData"

export default interface Action {
  perform(data: ActionData): Promise<ActionData> | ActionData
}
