import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import { BudgetCardComponent } from "./budget-card";

/*
Budget meta cards are used to assign card value to top-level budget object data (e.g. enterprise type)
*/
@Component({
  selector: "budget-meta-card",
  templateUrl: "budget-card.html"
})
export class BudgetMetaCardComponent extends BudgetCardComponent {
  @Input("valuePath") valuePath: string;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions
  ) {
    super(ngRedux, actions);
  }

  ngOnInit() {
    this._addValueSubscriber();
  }

  // budget meta cards listen directly to their corresponding value field and update isselected property on change
  // *** note - this could all be done through budget-card-list element to avoid so many subscriptions, but assumed fine for now)
  _addValueSubscriber() {
    const pathValue$ = this.ngRedux.select([
      "budget",
      "active",
      this.valuePath
    ]);
    pathValue$.subscribe(v => {
      this.card.isSelected = v === this.card.id;
      this.selected = this.card.isSelected;
    });
  }

  // assign card id to value path on select (and remove if already selected)
  cardClicked() {
    const budget = this.ngRedux.getState().budget.active;
    if (budget[this.valuePath] == this.card.id) {
      budget[this.valuePath] = null;
    } else {
      budget[this.valuePath] = this.card.id;
    }
    this.selected = !this.selected;
    this.actions.setActiveBudget(budget);
  }
}
