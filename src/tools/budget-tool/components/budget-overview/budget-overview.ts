import { NgRedux, select } from "@angular-redux/store";
import { Component, OnDestroy } from "@angular/core";
import { Events } from "ionic-angular";
import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AppState } from "../../../../reducers/reducers";
import {
  IBudget,
  IBudgetCard,
  IBudgetDotValues,
  IBudgetPeriodData
} from "../../budget-tool.models";

@Component({
  selector: "budget-overview",
  templateUrl: "budget-overview.html"
})
export class BudgetOverviewComponent implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  @select(["budget", "active", "dotValues"])
  dotValues$: Observable<IBudgetDotValues>;
  budget: IBudget;
  rowTitles: any = [
    { type: "activities", label: "Activities" },
    { type: "inputs", label: "Inputs" },
    { type: "familyLabour", label: "Family Labour" },
    { type: "outputs", label: "Outputs" },
    { type: "produceConsumed", label: "Produce Consumed" },
    { type: "cashBalance", label: "Balance" }
  ];
  dotsLegend = [];
  balance: any;
  budgetUpdated = true;

  constructor(public events: Events, private ngRedux: NgRedux<AppState>) {
    // on changes refresh whole budget
    // *** inefficient but otherwise difficult to get bindings triggering correctly
    // tried cdr and application ref but neither seemed to work. Also tried listening
    // on child components but again was tempermental
    this.budget$
      .pipe(debounceTime(250))
      .takeUntil(this.componentDestroyed)
      .subscribe(budget => {
        console.log("budget updated");
        this.budgetUpdated = false;
        this.budget = budget;
        setTimeout(() => {
          this.budgetUpdated = true;
      ***REMOVED***, 50);
    ***REMOVED***);
    this.dotValues$.takeUntil(this.componentDestroyed).subscribe(values => {
      if (values) {
        this.dotsLegend = this._objectToArray(values);
    ***REMOVED***
  ***REMOVED***);
    this.events.subscribe("calculate:budget", () => {
      this.calculateBalance();
  ***REMOVED***);
***REMOVED***
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
***REMOVED***
  _objectToArray(json) {
    const array = [];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        array.push({ key: key, value: json[key] });
    ***REMOVED***
  ***REMOVED***
    return array;
***REMOVED***

  getIndex(array, card) {
    let index: number = -1;
    let i = 0;
    for (const item of array) {
      if (item.ID == card.ID) {
        index = i;
    ***REMOVED***
      i++;
  ***REMOVED***
    return index;
***REMOVED***

  calculateBalance() {
    // total for current period
    const data = this.ngRedux.getState().budget.active.data;
    const totals = {***REMOVED***
    let runningTotal = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const periodTotal = this._calculatePeriodTotal(data[key]);
        runningTotal = runningTotal + periodTotal;
        totals[key] = {
          period: periodTotal,
          running: runningTotal
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
    this.balance = totals;
***REMOVED***
  _calculatePeriodTotal(period: IBudgetPeriodData) {
    let balance = 0;
    if (period) {
      const inputCards = _jsonObjectValues(period.inputs);
      const inputsBalance = this._calculatePeriodCardTotals(inputCards);
      const outputCards = _jsonObjectValues(period.outputs);
      const outputsBalance = this._calculatePeriodCardTotals(outputCards);
      balance = inputsBalance + outputsBalance;
  ***REMOVED***
    return balance;
***REMOVED***
  _calculatePeriodCardTotals(cards: IBudgetCard[]) {
    let total = 0;
    if (cards && cards.length > 0) {
      cards.forEach(card => {
        if (card.quantity && card.cost) {
          total = total + card.quantity * card.cost;
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
    return total;
***REMOVED***
}
function _jsonObjectValues(json: any) {
  const values = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      values.push(json[key]);
  ***REMOVED***
***REMOVED***
  return values;
}
