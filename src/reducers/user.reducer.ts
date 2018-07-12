import { Action } from "redux";
import { UserAction, UserActions } from "../actions/user.actions";
import { IUser } from "../models/models";
import { INITIAL_STATE } from "./reducers";

export function UserReducer(state: IUser = INITIAL_STATE.user, action: Action) {
  switch (action.type) {
    case UserActions.UPDATE_USER:
      const userUpdate = action as UserAction;
      return Object.assign({}, state, { user: userUpdate.payload });

    default:
      return state;
***REMOVED***
}