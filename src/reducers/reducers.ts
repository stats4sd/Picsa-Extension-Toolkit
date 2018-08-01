import { combineReducers, Reducer } from "redux";
import * as Models from "../models/models";
import {
  BudgetToolReducer,
  BudgetToolState
} from "../tools/budget-tool/budget-tool.reducer";
import {
  ClimateToolReducer,
  ClimateToolState
} from "../tools/climate-tool/climate-tool.reducer";
import { DataReducer } from "./data.reducer";
import { UserReducer } from "./user.reducer";

export interface AppState {
  user: Models.IUser;
  climate: ClimateToolState;
  budget: BudgetToolState;
  data: Models.IData;
}

export const INITIAL_STATE: AppState = {
  user: null,
  climate: null,
  budget: {
    active: null,
    meta: null
***REMOVED***,
  data: null
***REMOVED***

export const rootReducer: Reducer<AppState> = combineReducers({
  user: UserReducer,
  climate: ClimateToolReducer,
  budget: BudgetToolReducer,
  data: DataReducer
});
