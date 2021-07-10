export enum ActionType {
  POSITION_UPDATED,
  INITIALIZED,
  BULLET_FIRED,
}

interface Action {
  type: ActionType;
  payload?: any;
}

export default Action;
