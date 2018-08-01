import { Action } from "redux";
import { StandardAction } from "../../actions/actions";
import { INITIAL_STATE } from "../../reducers/reducers";
import { BudgetToolActions } from "./budget-tool.actions";
import {
  IBudget,
  IBudgetMeta,
  IBudgetPublicData,
  IBudgetView
} from "./budget-tool.models";

export interface BudgetToolState {
  active: IBudget;
  meta: IBudgetMeta;
  view?: IBudgetView;

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

    // merge arrays of existing and incoming meta
    // e.g. hard-coded activities and custom
    case BudgetToolActions.PATCH_BUDGET_META:
      const budgetMetaPatch = action as StandardAction;
      const meta = { ...state.meta ***REMOVED***
      Object.keys(budgetMetaPatch.payload).forEach(key => {
        meta[key] = [...state.meta[key], ...budgetMetaPatch.payload[key]];
    ***REMOVED***);
      return { ...state, meta: meta ***REMOVED***

    case BudgetToolActions.SET_BUDGET_VIEW:
      const budgetView = action as StandardAction;
      return { ...state, view: budgetView.payload ***REMOVED***

    default:
      return state;
***REMOVED***
}
