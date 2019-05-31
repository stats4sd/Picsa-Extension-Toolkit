import { Action } from "redux";
import { INITIAL_STATE } from "src/app/store/store.model";
import { PlatformAction, PlatformActions } from "src/actions/platform.actions";

export function PlatformReducer(
  state: any = INITIAL_STATE.platform,
  action: Action
) {
  switch (action.type) {
    case PlatformActions.ERROR_THROWN:
      const errorAction = action as PlatformAction;
      const errorUpdate = { error: { msg: errorAction.payload } };
      return Object.assign({}, state, errorUpdate);
    default:
      return state;
  }
}
