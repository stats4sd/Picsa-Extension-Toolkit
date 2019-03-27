import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudgetCard } from "../../budget-tool.models";
import { REGIONAL_SETTINGS } from "../../../../environments/region";

@Component({
  selector: "budget-card",
  templateUrl: "budget-card.html"
})
export class BudgetCardComponent {
  @Input("card") card: IBudgetCard;
  @Input("type") type: string;
  selected: boolean;
  currency = REGIONAL_SETTINGS.currency;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions
  ) {}
}
