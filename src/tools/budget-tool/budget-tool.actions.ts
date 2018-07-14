import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";
import { IBudget, IBudgetView } from "./budget-tool.models";

type StandardAction = FluxStandardAction<any, null>;

@Injectable()
export class BudgetToolActions {
  static readonly SET_ACTIVE_BUDGET = "SET_ACTIVE_BUDGET";
  static readonly SET_BUDGET_META = "SET_BUDGET_META";
  static readonly SET_BUDGET_VIEW = "SET_BUDGET_VIEW";

  @dispatch()
  setActiveBudget = (budget: IBudget): StandardAction => ({
    type: BudgetToolActions.SET_ACTIVE_BUDGET,
    meta: null,
    payload: budget
  });

  @dispatch()
  setBudgetMeta = (meta: any): StandardAction => ({
    type: BudgetToolActions.SET_BUDGET_META,
    meta: null,
    payload: meta
  });

  @dispatch()
  setBudgetView = (view: IBudgetView): StandardAction => ({
    type: BudgetToolActions.SET_BUDGET_VIEW,
    meta: null,
    payload: view
  });
}
