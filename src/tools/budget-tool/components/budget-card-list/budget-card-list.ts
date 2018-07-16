import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import {
  IBudget,
  IBudgetCard,
  IBudgetPeriodData,
  IBudgetViewMeta,
  ICustomBudgetCard
} from "../../budget-tool.models";

@Component({
  selector: "budget-card-list",
  templateUrl: "budget-card-list.html"
})
export class BudgetCardListComponent {
  @select(["budget", "view", "meta"])
  viewMeta$: Observable<IBudgetViewMeta>;
  cards: IBudgetCard[];
  periodData: IBudgetPeriodData;
  type: string;

  constructor(
    private NgRedux: NgRedux<AppState>,
    private actions: BudgetToolActions
  ) {}
  ngOnInit() {
    this.viewMeta$.subscribe(meta => {
      if (meta) {
        this._checkBudgetDataPath(meta.periodIndex, meta.type);
        this._addBudgetPeriodSubscriber(meta.periodIndex, meta.type);
        this._addCustomCardsSubscriber(meta.periodIndex, meta.type);
        this.type = meta.type;
        console.log("type", this.type);
      }
    });
  }

  // check if the given time period index exists on budget data and card type within period
  // if not intialise values
  _checkBudgetDataPath(periodIndex, type) {
    const budget: IBudget = this.NgRedux.getState().budget.active;
    if (!budget.data[periodIndex]) {
      budget.data[periodIndex] = {};
    }
    if (!budget.data[periodIndex][type]) {
      budget.data[periodIndex][type] = {};
    }
    this.actions.setActiveBudget(budget);
  }

  // subscribe to updates to given budget period and set cards accordingly
  _addBudgetPeriodSubscriber(periodIndex, type) {
    const data$: Observable<IBudgetPeriodData> = this.NgRedux.select([
      "budget",
      "active",
      "data",
      periodIndex,
      type
    ]);
    data$.subscribe(data => {
      this.periodData = data;
      this.setSelectedCards(data, type);
    });
  }

  // watch for updates to custom cards and add to list accordingly
  _addCustomCardsSubscriber(periodIndex, type) {
    const cards$: Observable<ICustomBudgetCard[]> = this.NgRedux.select([
      "budget",
      "meta",
      type
    ]);
    cards$.subscribe(cards => {
      // only update if initial load has been completed
      if (this.cards && this.periodData) {
        this.setSelectedCards(this.periodData, type);
        console.log("custom list updated");
      }
    });
  }

  // when the related budget period is updated want to filter all cards by type and update which
  // are already selected and any other meta data (e.g. input quantities)
  setSelectedCards(data: IBudgetPeriodData = {}, type) {
    const allCards = this.NgRedux.getState().budget.meta;
    let cards = allCards[type];
    // update cards according to what is saved
    if (data) {
      cards = cards.map(c => {
        return data[c.id] ? data[c.id] : c;
      });
    }
    this.cards = cards;
  }
}
