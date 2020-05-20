import Action from "../actions/action"

export default class SkillResponse {
  private actions: Action[] = []

  get Actions(): Action[] {
    return this.actions
  }

  addAction(action: Action) {
    this.actions.push(action)
  }

  toObject(): object {
    return { actions: this.actions.map((action: Action) => action.toObject()) }
  }
 }
