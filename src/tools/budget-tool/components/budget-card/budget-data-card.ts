import { NgRedux, select } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { Events } from "ionic-angular";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudgetViewMeta } from "../../budget-tool.models";
import { BudgetCardComponent } from "./budget-card";
import { Observable } from "../../../../../node_modules/@firebase/util";

/*
Budget data cards are used to assign card value to nested budget data (e.g. week 1 activities)
*/
@Component({
  selector: "budget-data-card",
  templateUrl: "budget-card.html"
})
export class BudgetDataCardComponent extends BudgetCardComponent {
  viewMeta: IBudgetViewMeta;
  @select(["budget", "view", "meta"])
  viewMeta$: Observable<IBudgetViewMeta>;
  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions,
    private events: Events
  ) {
    super(ngRedux, actions);
  }

  ngOnInit() {
    this.viewMeta$.subscribe(meta => (this.viewMeta = meta));
    this.viewMeta = this.ngRedux.getState().budget.view.meta;
  }

  cardClicked() {
    const budget = this.ngRedux.getState().budget.active;
    this.card.isSelected ? this.unselectCard(budget) : this.updateCard(budget);
    this.card.isSelected = !this.card.isSelected;
  }
  updateCard(budget) {
    const cellData = budget.data[this.viewMeta.periodIndex][this.viewMeta.type];
    cellData[this.card.id] = this.card;
    this.actions.setActiveBudget(budget);
    this._fireUpdateEvent(cellData);
  }
  unselectCard(budget) {
    const cellData = budget.data[this.viewMeta.periodIndex][this.viewMeta.type];
    delete cellData[this.card.id];
    this.actions.setActiveBudget(budget);
    this._fireUpdateEvent(cellData);
  }
  // deep select observers don't seem to be working consistently, also using events as fallback
  _fireUpdateEvent(cellData) {
    this.events.publish(
      `periodUpdated:${this.viewMeta.periodIndex}-${this.viewMeta.type}`,
      cellData
    );
  }
}
