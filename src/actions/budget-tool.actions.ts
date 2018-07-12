import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";
import { IBudget, ICustomCards } from "../models/budget-tool.models";

type StandardAction = FluxStandardAction<any, null>;

@Injectable()
export class BudgetToolActions {
  static readonly CREATE_NEW = "CREATE_NEW";
  static readonly SET = "SET";
  static readonly UPDATE_CUSTOM_CARDS = "UPDATE_CUSTOM_CARDS";

  @dispatch()
  createNew = (newBudget: IBudget): StandardAction => ({
    type: BudgetToolActions.CREATE_NEW,
    meta: null,
    payload: newBudget
***REMOVED***);

  @dispatch()
  set = (budget: IBudget): StandardAction => ({
    type: BudgetToolActions.SET,
    meta: null,
    payload: budget
***REMOVED***);

  @dispatch()
  updateCustomCards = (cards: ICustomCards): StandardAction => ({
    type: BudgetToolActions.UPDATE_CUSTOM_CARDS,
    meta: null,
    payload: cards
***REMOVED***);
}
