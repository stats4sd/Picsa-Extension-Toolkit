import { NgRedux, select } from "@angular-redux/store";
import { Component, OnDestroy } from "@angular/core";
import { Events } from "@ionic/angular";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AppState } from "src/app/store/store.model";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudgetCard, IBudgetViewMeta } from "../../budget-tool.models";
import { BudgetCardComponent } from "./budget-card";

/*
Budget data cards are used to assign card value to nested budget data (e.g. week 1 activities)
*/
@Component({
  selector: "budget-data-card",
  templateUrl: "budget-card.html"
})
export class BudgetDataCardComponent extends BudgetCardComponent
  implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  viewMeta: IBudgetViewMeta;
  @select(["budget", "view", "meta"])
  viewMeta$: Observable<IBudgetViewMeta>;
  selected: boolean;
  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions,
    private events: Events
  ) {
    super(ngRedux, actions);
  }

  ngOnInit() {
    this.viewMeta$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(meta => (this.viewMeta = meta));
    this.viewMeta = this.ngRedux.getState().budget.view.meta;
    this.selected = this.card.isSelected;
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  cardClicked() {
    const budget = this.ngRedux.getState().budget.active;
    this.selected ? this.unselectCard(budget) : this.updateCard(budget);
    this.selected = !this.selected;
  }
  triggerUpdate(type: string) {
    console.log("triggering update", this.card);
    this.card = this._convertStringsToNumbers(this.card);
    if (type == "inputs") {
      this.card = this._makeValuesNegative(this.card as IBudgetCard);
    }
    const budget = this.ngRedux.getState().budget.active;
    this.updateCard(budget);
  }

  // ion-input saves number fields as strings so need to convert back
  _convertStringsToNumbers(card) {
    const fields = ["quantity", "cost", "days", "people"];
    for (const field of fields) {
      if (card.hasOwnProperty(field)) {
        card[field] = parseInt(card[field]);
      }
    }
    return card;
  }

  // outputs should be tracked as negative
  _makeValuesNegative(card: IBudgetCard) {
    if (card.cost && card.cost >= 0) {
      card.cost = -card.cost;
    }
    return card;
  }

  updateCard(budget) {
    const cellData = budget.data[this.viewMeta.periodIndex][this.viewMeta.type];
    // avoid making changes directly to card as has strange redux binding back to orginal meta object
    cellData[this.card.id] = { ...this.card, ...{ isSelected: true } };
    this.actions.setActiveBudget(budget);
    this._fireUpdateEvent(cellData);
  }

  // when unselected also want to delete the isSelected field to avoid having to check for
  // both existence and value (card.isSelected vs card.isSelected===true)
  unselectCard(budget) {
    const cellData = budget.data[this.viewMeta.periodIndex][this.viewMeta.type];
    // delete this.card.isSelected;
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
