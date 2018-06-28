import { Action } from "redux";
import {
  ClimateToolAction,
  ClimateToolActions
} from "../actions/climate-tool.actions";
import { ISite } from "../models/models";
import { INITIAL_STATE } from "./reducers";

export interface ClimateToolState {
  site: ISite;
}

export function climateToolReducer(
  state: ClimateToolState = INITIAL_STATE.climate,
  action: Action
) {
  switch (action.type) {
    case ClimateToolActions.SELECT_SITE:
      const siteSelect = action as ClimateToolAction;
      return Object.assign({}, state, { site: siteSelect.payload });

    default:
      return state;
***REMOVED***
}
