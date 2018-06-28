import { Action } from "redux";
import { StandardAction } from "../actions/actions";
import { BudgetToolActions } from "../actions/budget-tool.actions";
import { IBudget } from "../models/budget-tool.models";
import { INITIAL_STATE } from "./reducers";

export interface BudgetToolState extends IBudget {
  // no additional parameters currently specified (may change)
}

export function budgetToolReducer(
  state: IBudget = INITIAL_STATE.budget,
  action: Action
) {
  console.log("action", action);
  switch (action.type) {
    case BudgetToolActions.CREATE_NEW:
      const newBudget = action as StandardAction;
      return Object.assign({}, state, newBudget.payload);

    default:
      return state;
  }
}
