import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AppState } from "src/app/store/store.model";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudgetCard, ICustomBudgetCard } from "../../budget-tool.models";
import REGIONAL_SETTINGS from "src/environments/region";

@Component({
  selector: "budget-card",
  templateUrl: "budget-card.html"
})
export class BudgetCardComponent {
  // use partial as not sure whether will be budget card or custom budget card
  @Input("card") card: Partial<ICustomBudgetCard>;
  @Input("type") type: string;
  selected: boolean;
  currency = REGIONAL_SETTINGS.currency;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions
  ) {}

  cardClicked() {
    // *** TODO - figure out what wanted handler to do
    console.log("card clicked");
  }
}
