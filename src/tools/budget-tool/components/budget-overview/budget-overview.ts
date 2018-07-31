import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Events, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
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
export class BudgetOverviewComponent {
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

  constructor(
    public toastCtrl: ToastController,
    public events: Events,
    private ngRedux: NgRedux<AppState>
  ) {
    this.budget$.subscribe(budget => {
      this.budget = budget;
  ***REMOVED***);
    this.dotValues$.subscribe(values => {
      if (values) {
        this.dotsLegend = this._objectToArray(values);
        console.log("dots legend", this.dotsLegend);
    ***REMOVED***
  ***REMOVED***);
    this.events.subscribe("calculate:budget", () => {
      this.calculateBalance();
  ***REMOVED***);
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
    console.log("calculating balance");
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
    console.log("balance", totals);
    this.balance = totals;
***REMOVED***
  _calculatePeriodTotal(period: IBudgetPeriodData) {
    let balance = 0;
    if (period) {
      console.log("calculating period total", period);
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
      console.log("calulcating card totals", cards);
      cards.forEach(card => {
        if (card.quantity && card.cost) {
          total = total + card.quantity * card.cost;
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
    return total;
***REMOVED***

  // const i = 0;
  // let runningNet = 0;
  // for (const period of this.budget.data) {
  //   let inputNet = 0;
  //   let outputNet = 0;
  //   let consumedNet = 0;
  //   let monthlyNet = 0;
  //   //remember, inputs have negative effect on cash flow as need to be bought
  //   let j = 0;
  //   for (const input of period.inputs) {
  //     if (input.quantity > 0) {
  //       const temp = input;
  //       temp.total = input.quantity * input.cost;
  //       temp.dots = this.valueDotNotation("expense", temp.total);
  //       // period           current input
  //       this.budget.data[i].inputs[j] = temp;
  //       inputNet = inputNet + input.quantity * input.cost;
  //   ***REMOVED***
  //     j++;
  // ***REMOVED***
  //   for (const output of period.outputs) {
  //     if (output.quantity > 0) {
  //       outputNet = outputNet + output.quantity * output.cost;
  //       consumedNet = consumedNet + output.consumed * output.cost;
  //   ***REMOVED***
  // ***REMOVED***
  //   monthlyNet = outputNet - inputNet - consumedNet;
  //   runningNet = runningNet + monthlyNet;

  // this.budget.data[i].balance = {
  //   inputs: {
  //     total: inputNet,
  //     dots: inputDots
  // ***REMOVED***,
  //   outputs: {
  //     total: outputNet,
  //     dots: outputDots
  // ***REMOVED***,
  //   consumed: {
  //     total: consumedNet,
  //     dots: consumedDots
  // ***REMOVED***,
  //   monthly: {
  //     total: monthlyNet,
  //     dots: monthlyDots
  // ***REMOVED***,
  //   running: {
  //     total: runningNet,
  //     dots: runningDots
  // ***REMOVED***
  // ***REMOVED***

  // i++;
  // }
  // }

  // toggleDotEdit() {
  //   if (this.editDotValue) {
  //     this.calculateBalance();
  // ***REMOVED***
  //   this.editDotValue = !this.editDotValue;
  // }
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
