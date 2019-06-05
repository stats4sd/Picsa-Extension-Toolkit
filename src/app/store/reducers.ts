import { combineReducers, Reducer } from "redux";
import { routerReducer } from "@angular-redux/router";
import { UserReducer } from "src/reducers/user.reducer";
import { ClimateToolReducer } from "src/tools/climate-tool/climate-tool.reducer";
import { BudgetToolReducer } from "src/tools/budget-tool/store/budget-tool.reducer";
import { DataReducer } from "src/reducers/data.reducer";
import { AppState } from "./store.model";
import { PlatformReducer } from "src/reducers/platform.reducer";

export const rootReducer: Reducer<AppState> = combineReducers({
  user: UserReducer,
  climate: ClimateToolReducer,
  budget: BudgetToolReducer,
  data: DataReducer,
  platform: PlatformReducer,
  router: routerReducer
});
