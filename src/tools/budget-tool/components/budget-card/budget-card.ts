import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudgetCard } from "../../budget-tool.models";

@Component({
  selector: "budget-card",
  templateUrl: "budget-card.html"
})
export class BudgetCardComponent {
  @Input("card") card: IBudgetCard;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions
  ) {}
}
