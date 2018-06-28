import { combineReducers, Reducer } from "redux";
import * as Models from "../models/models";
import { climateToolReducer, ClimateToolState } from "./climate-tool.reducer";
import { userReducer } from "./user.reducer";

export interface AppState {
  user: Models.IUser;
  climate: ClimateToolState;
}

export const INITIAL_STATE: AppState = {
  user: {
    lang: "en"
  },
  climate: null
};

// main export that gives access to all reducers.
// note, could have as object with properties providing specific reducers to each state component
export const rootReducer: Reducer<AppState> = combineReducers({
  user: userReducer,
  climate: climateToolReducer
});
