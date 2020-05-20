export default abstract class Action {
  actionType: string

  abstract toObject(): object
}
