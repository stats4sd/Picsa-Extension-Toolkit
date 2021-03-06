import { IUser, IData } from "src/models/models";
import { ClimateToolState } from "src/tools/climate-tool/climate-tool.models";
import { BudgetToolState } from "src/tools/budget-tool/budget-tool.models";

export const INITIAL_STATE: AppState = {
  user: null,
  climate: null,
  budget: {
    active: null,
    meta: null
  },
  data: null,
  platform: null,
  router: null
};

export interface AppState {
  user: IUser;
  climate: ClimateToolState;
  budget: BudgetToolState;
  data: IData;
  platform: {
    error: string;
  };
  router: any;
}
