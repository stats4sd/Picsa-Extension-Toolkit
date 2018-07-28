import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Events } from "ionic-angular";
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
  cardSubscriber: Observable<ICustomBudgetCard[]>;
  periodSubscriber: Observable<IBudgetPeriodData>;
  periodData: IBudgetPeriodData;
  type: string;

  constructor(
    private NgRedux: NgRedux<AppState>,
    private actions: BudgetToolActions,
    private events: Events
  ) {}
  ngOnInit() {
    this._addCustomCardsSubscriber();
    // when view changes (e.g. activity list -> outputs list) want to check path exists to populate data
    // and update cards list
    this.viewMeta$.subscribe(meta => {
      if (meta) {
        this._checkBudgetDataPath(meta.periodIndex, meta.type);
        this._generateCardList(meta);
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

  // every time view changed recalculate what should be shown
  // *** could be optimised better but multiple subscribers proves difficult
  _generateCardList(meta) {
    this.type = meta.type;
    try {
      const periodData = this.NgRedux.getState().budget.active.data[
        meta.periodIndex
      ][meta.type];
      console.log("update cards", periodData);
      this.updateCardList(periodData, meta.type);
    } catch (error) {
      this.updateCardList({}, meta.type);
      //no data for period, initialise default set
    }
  }

  // watch for updates to custom cards and add to list accordingly
  // triggered from events as the new card builder is launched as a model and doens't update state
  _addCustomCardsSubscriber() {
    this.events.subscribe("customCards:updated", () => {
      this.updateCardList({}, this.type);
    });
  }

  // when the related budget period is updated want to filter all cards by type and update which
  // are already selected and any other meta data (e.g. input quantities)
  updateCardList(data, type) {
    const allCards = this.NgRedux.getState().budget.meta;
    // replace consumed cards with outputs (allow full list in case of consumption before full output harvested)
    if (type == "produceConsumed") {
      type = "outputs";
    }
    // use timeout so that cards can be properly destroyed and not repopulated if same field selected in different time period
    setTimeout(() => {
      // update cards according to what is saved
      if (Object.keys(data).length == 0) {
        // when no data return full set
        this.cards = [...allCards[type]];
      } else {
        this.cards = allCards[type].map(c => {
          return data[c.id] ? data[c.id] : c;
        });
      }
    }, 100);
  }
}
