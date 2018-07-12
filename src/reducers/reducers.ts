import { combineReducers, Reducer } from "redux";
import * as Models from "../models/models";
import {
  budgetToolReducer,
  BudgetToolState
} from "../tools/budget-tool/budget-tool.reducer";
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
  },
  climate: null,
  budget: {
    active: null,
    meta: null
  }
};

export const rootReducer: Reducer<AppState> = combineReducers({
  user: UserReducer,
  climate: climateToolReducer,
  budget: budgetToolReducer
});
