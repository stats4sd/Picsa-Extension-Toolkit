import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { IBudgetCard, IBudgetViewMeta } from "../../budget-tool.models";
import { BudgetCardComponent } from "./budget-card";

import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";

/*
Budget data cards are used to assign card value to nested budget data (e.g. week 1 activities)
*/
@Component({
  selector: "budget-data-card",
  templateUrl: "budget-card.html"
})
export class BudgetDataCardComponent extends BudgetCardComponent {
  viewMeta: IBudgetViewMeta;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions
  ) {
    super(ngRedux, actions);
***REMOVED***

  ngOnInit() {
    this.viewMeta = this.ngRedux.getState().budget.view.meta;
***REMOVED***

  cardClicked() {
    const budget = this.ngRedux.getState().budget.active;
    this.card.isSelected ? this.unselectCard(budget) : this.updateCard(budget);
    this.card.isSelected = !this.card.isSelected;
***REMOVED***
  updateCard(budget) {
    budget.data[this.viewMeta.periodIndex][this.viewMeta.type][
      this.card.id
    ] = this.card;
    this.actions.setActiveBudget(budget);
***REMOVED***
  unselectCard(budget) {
    delete budget.data[this.viewMeta.periodIndex][this.viewMeta.type][
      this.card.id
    ];
    this.actions.setActiveBudget(budget);
***REMOVED***
}
