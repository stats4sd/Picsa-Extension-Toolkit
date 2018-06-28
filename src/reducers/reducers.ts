import { combineReducers, Reducer } from "redux";
import * as Models from "../models/models";
import { budgetToolReducer, BudgetToolState } from "./budget-tool.reducer";
import { climateToolReducer, ClimateToolState } from "./climate-tool.reducer";
import { UserReducer } from "./user.reducer";

export interface AppState {
  user: Models.IUser;
  climate: ClimateToolState;
  budget: BudgetToolState;
}

export const INITIAL_STATE: AppState = {
  user: {
    lang: "en"
***REMOVED***,
  climate: null,
  budget: null
***REMOVED***

export const rootReducer: Reducer<AppState> = combineReducers({
  user: UserReducer,
  climate: climateToolReducer,
  budget: budgetToolReducer
});
