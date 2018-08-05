import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Events } from "ionic-angular";
import { Observable, Subscription } from "rxjs";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import {
  IBudget,
  IBudgetCard,
  IBudgetPeriodData,
  IBudgetViewMeta
} from "../../budget-tool.models";

@Component({
  selector: "budget-card-list",
  templateUrl: "budget-card-list.html"
})
export class BudgetCardListComponent {
  @select(["budget", "view", "meta"])
  viewMeta$: Observable<IBudgetViewMeta>;
  cards: IBudgetCard[];
  cardSubscriber: Subscription;
  periodData: IBudgetPeriodData;
  type: string;

  constructor(
    private NgRedux: NgRedux<AppState>,
    private actions: BudgetToolActions,
    private events: Events
  ) {}
  // *** reviewed all this in a rush, need to work on
  ngOnInit() {
    this._addSubscribers();
***REMOVED***
  ngOnDestroy() {
    this.cardSubscriber.unsubscribe();
***REMOVED***

  // check if the given time period index exists on budget data and card type within period
  // if not intialise values
  _checkBudgetDataPath(periodIndex, type) {
    const budget: IBudget = this.NgRedux.getState().budget.active;
    if (!budget.data[periodIndex]) {
      budget.data[periodIndex] = {***REMOVED***
  ***REMOVED***
    if (!budget.data[periodIndex][type]) {
      budget.data[periodIndex][type] = {***REMOVED***
  ***REMOVED***
    this.actions.setActiveBudget(budget);
***REMOVED***

  // every time view changed recalculate what should be shown
  // *** could be optimised better but multiple subscribers proves difficult
  _generateCardList(type: string, periodIndex: string) {
    this.type = type;
    try {
      const periodData = this.NgRedux.getState().budget.active.data[
        periodIndex
      ][type];
      this.periodData = periodData;
  ***REMOVED*** catch (error) {
      // no data for period
  ***REMOVED***
    this.updateCardList();
***REMOVED***

  // watch for updates to custom cards and add to list accordingly
  // triggered from events as the new card builder is launched as a model and doens't update state
  _addSubscribers() {
    this.events.subscribe("load:budget", () => {
      this._generateCardList("enterprises", null);
  ***REMOVED***);
    console.log("adding custom cards subscriber");
    this.events.subscribe("customCards:updated", customCards => {
      console.log("custom cards updated");
      this.updateCardList(customCards);
  ***REMOVED***);
    // when view changes (e.g. activity list -> outputs list) want to check path exists to populate data
    // and update cards list
    // use events redux alone fails to trigger uipdate when period index changed
    // but type remains (e.g. activity 1 => activity 2)
    this.events.subscribe("cell:selected", meta => {
      this.cards = [];
      this._checkBudgetDataPath(meta.periodIndex, meta.type);
      // when type specified add subscriber to the list of cards (including updates to custom)
      // to generate list on update
      this.cardSubscriber = this.NgRedux.select([
        "budget",
        "meta",
        meta.type
      ]).subscribe(cards => {
        console.log("cards updated", cards);
        this._generateCardList(meta.type, meta.periodIndex);
    ***REMOVED***);

      // set view after path checked
      this.actions.setBudgetView({
        component: "cell-edit",
        title: meta.title,
        meta: {
          type: meta.type,
          periodIndex: meta.periodIndex
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  // when the related budget period is updated want to filter all cards by type and update which
  // are already selected and any other meta data (e.g. input quantities)
  updateCardList(customCards?) {
    let type = this.type;
    const data = this.periodData;
    // replace consumed cards with outputs (allow full list in case of consumption before full output harvested)
    if (type == "produceConsumed") {
      type = "outputs";
  ***REMOVED***
    const typeCards = this.NgRedux.getState().budget.meta[this.type];
    let allTypeCards = this.mergeCustomCards(typeCards, customCards);
    if (data && Object.keys(data).length > 0 && allTypeCards) {
      // update cards according to what is saved
      allTypeCards = allTypeCards.map(c => {
        return data[c.id] ? data[c.id] : c;
    ***REMOVED***);
  ***REMOVED***
    // use timeout so that cards can be properly destroyed and not repopulated if same field selected in different time period
    this.cards = null;
    setTimeout(() => {
      this.cards = allTypeCards;
  ***REMOVED***, 100);
***REMOVED***

  // merge custom type cards with hard-coded type cards
  mergeCustomCards(typeCards, customCards?) {
    if (typeCards) {
      if (!customCards) {
        try {
          customCards = this.NgRedux.getState().user.budgetCustomCards[
            this.type
          ];
          if (!customCards) {
            customCards = {***REMOVED***
        ***REMOVED***
      ***REMOVED*** catch (error) {
          customCards = {***REMOVED***
      ***REMOVED***
    ***REMOVED***
      console.log("custom cards", customCards);
      Object.keys(customCards).forEach(key => {
        typeCards.push(customCards[key]);
    ***REMOVED***);
  ***REMOVED***
    return typeCards;
***REMOVED***
}
