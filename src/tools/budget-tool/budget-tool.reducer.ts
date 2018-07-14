import { Action } from "redux";
import { StandardAction } from "../../actions/actions";
import { INITIAL_STATE } from "../../reducers/reducers";
import { BudgetToolActions } from "./budget-tool.actions";
import { IBudget, IBudgetMeta, IBudgetPublicData } from "./budget-tool.models";

export interface BudgetToolState {
  active: IBudget;
  meta: IBudgetMeta;

  // no additional parameters currently specified (may change)
}

export function BudgetToolReducer(
  state: BudgetToolState = INITIAL_STATE.budget,
  action: Action
) {
  switch (action.type) {
    case BudgetToolActions.SET_ACTIVE_BUDGET:
      const updatedBudget = action as StandardAction;
      // want to be able to set null to clear budget
      if (!updatedBudget.payload) {
        return { ...state, active: null ***REMOVED***
    ***REMOVED***
      const newBudget = { ...state.active, ...updatedBudget.payload ***REMOVED***
      return { ...state, active: newBudget ***REMOVED***

    case BudgetToolActions.SET_BUDGET_META:
      const budgetMeta = action as StandardAction;
      const newMeta = { ...state.meta, ...budgetMeta.payload ***REMOVED***
      return { ...state, meta: newMeta ***REMOVED***

    case BudgetToolActions.SET_BUDGET_VIEW:
      const budgetView = action as StandardAction;
      return { ...state, view: budgetView.payload ***REMOVED***

    default:
      return state;
***REMOVED***
}
