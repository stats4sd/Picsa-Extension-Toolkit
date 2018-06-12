import { Action } from "redux";
import * as Actions from "../actions/actions";
import * as Models from "../models/models";

export const INITIAL_STATE: Models.AppState = {
  user: null
***REMOVED***

export function rootReducer(
  state: Models.AppState = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case Actions.UserActions.SET_USER:
      const setUser = action as Actions.UserAction;
      return Object.assign({}, state, { user: setUser.payload });

    default:
      return state;
***REMOVED***
}
