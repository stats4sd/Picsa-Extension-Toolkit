import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";
import { IBudget } from "../models/budget-tool.models";

type StandardAction = FluxStandardAction<any, null>;

@Injectable()
export class BudgetToolActions {
  static readonly CREATE_NEW = "CREATE_NEW";

  @dispatch()
  createNew = (newBudget: IBudget): StandardAction => ({
    type: BudgetToolActions.CREATE_NEW,
    meta: null,
    payload: newBudget
  });
}
