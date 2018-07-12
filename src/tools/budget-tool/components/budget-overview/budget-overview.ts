import { Component } from "@angular/core";
import { Events, ToastController } from "ionic-angular";
import { IBudget } from "../../../../tools/budget-tool/budget-tool.models";

@Component({
  selector: "budget-overview",
  templateUrl: "budget-overview.html"
})
export class BudgetOverviewComponent {
  budget: IBudget;
  data: any;
  rowTitles: any = [
    "Activities",
    "Inputs",
    "Family Labour",
    "Outputs",
    "Produce Consumed",
    "Cash Balance"
  ];
  highlightActivity: any;
  highlighted: any = { activity: {} ***REMOVED***
  dots: any;
  dotsArray = [];
  backup = {***REMOVED***
  editDotValue: boolean = false;

  constructor(public toastCtrl: ToastController, public events: Events) {
    // this.data = budgetPrvdr.allData;
    this.highlightActivity = { 0: true ***REMOVED***
    // this.budget = navParams.data.title
    //   ? navParams.data
    //   : budgetPrvdr.loadSampleBudget();
    console.log("budget", this.budget);
    this.dots = {
      large: 50000,
      medium: 10000,
      small: 1000,
      half: 500
  ***REMOVED***;
    this.dotsArray = this._objectToArray(this.dots);
    // this.calculateBalance();
    // this.events.subscribe("card:update", d =>
    //   this.cardUpdate(d.periodIndex, d.type, d.value)
    // );
***REMOVED***
  cardUpdate(periodIndex, type, values) {
    console.log("updating card");
    console.log("period", periodIndex);
    console.log("type", type);
    console.log("value", values);
    this.budget.data[periodIndex][type] = [];
    for (const key in values) {
      this.budget.data[periodIndex][type].push(values[key]);
  ***REMOVED***
    console.log("budget", this.budget);
***REMOVED***

  edit(type, period) {
    console.log("editing", type, period);
    // let selected = period[type];
    // let modal = this.modalCtrl.create(
    //   "CardSelectPage",
    //   { type: type, selected: selected, period: period, budget: this.budget },
    //   { enableBackdropDismiss: false }
    // );
    // modal.onDidDismiss(() => {
    //   this.calculateBalance();
    // });
    // modal.present();
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
  newAndLoad(operation) {
    console.log("operation", operation);
    // let modal = this.modalCtrl.create(
    //   "BudgetSettingsPage",
    //   { operation: operation, budget: this.budget },
    //   { enableBackdropDismiss: false }
    // );
    // modal.onDidDismiss(data => {
    //   this.budget = data;
    //   this.calculateBalance();
    // });
    // console.log("presenting modal");
    // modal.present();
***REMOVED***
  saveBudget() {
    // console.log("saving budget");
    // this.storagePrvdr
    //   .saveUserDoc(this.budget, true, "budgets", this.budget.id)
    //   .then(res => {
    //     console.log("save res", res);
    //     const toast = this.toastCtrl.create({
    //       message: "Budget Saved",
    //       duration: 3000
    //   ***REMOVED***);
    //     toast.present();
    // ***REMOVED***);
***REMOVED***
  newBudget() {
    // this.budget = this.bdg.createNewBudget()
    // console.log('new budget', this.budget)
***REMOVED***
  _toArray(value) {
    console.log("converting to array", value);
    return new Array(value).fill(0);
***REMOVED***
  _objectToArray(object) {
    console.log("converting object", object);
    const arr = [];
    for (const key in object) {
      arr.push({ key: key, val: object[key] });
  ***REMOVED***
    return arr;
***REMOVED***
  calculateBalance() {
    // total for current period
    console.log("calculating balance");
    let i = 0;
    let runningNet = 0;
    for (const period of this.budget.data) {
      let inputNet = 0;
      let outputNet = 0;
      let consumedNet = 0;
      let monthlyNet = 0;
      //remember, inputs have negative effect on cash flow as need to be bought
      let j = 0;
      for (const input of period.inputs) {
        if (input.quantity > 0) {
          const temp = input;
          temp.total = input.quantity * input.cost;
          temp.dots = this.valueDotNotation("expense", temp.total);
          // period           current input
          this.budget.data[i].inputs[j] = temp;
          inputNet = inputNet + input.quantity * input.cost;
      ***REMOVED***
        j++;
    ***REMOVED***
      for (const output of period.outputs) {
        if (output.quantity > 0) {
          outputNet = outputNet + output.quantity * output.cost;
          consumedNet = consumedNet + output.consumed * output.cost;
      ***REMOVED***
    ***REMOVED***
      monthlyNet = outputNet - inputNet - consumedNet;
      runningNet = runningNet + monthlyNet;

      const inputDots = this.valueDotNotation("expense", inputNet);
      const outputDots = this.valueDotNotation("income", outputNet);
      const consumedDots = this.valueDotNotation("expense", consumedNet);
      const monthlyDots = this.valueDotNotation("", monthlyNet);
      const runningDots = this.valueDotNotation("", runningNet);

      this.budget.data[i].balance = {
        inputs: {
          total: inputNet,
          dots: inputDots
      ***REMOVED***,
        outputs: {
          total: outputNet,
          dots: outputDots
      ***REMOVED***,
        consumed: {
          total: consumedNet,
          dots: consumedDots
      ***REMOVED***,
        monthly: {
          total: monthlyNet,
          dots: monthlyDots
      ***REMOVED***,
        running: {
          total: runningNet,
          dots: runningDots
      ***REMOVED***
    ***REMOVED***;

      i++;
  ***REMOVED***
    console.log("budget", this.budget);
***REMOVED***
  valueDotNotation(type, val) {
    if (val != 0) {
      let suffix = "";
      if (val < 0 || type == "expense") {
        suffix = "negative";
    ***REMOVED*** else {
        suffix = "positive";
    ***REMOVED***

      const v = Math.abs(val);
      //code could be tidies to loop but it's late!
      const large = Math.abs(Math.floor(v / this.dots.large));
      const largeRemainder = Math.abs(Math.floor(v % this.dots.large));
      const medium = Math.abs(Math.floor(largeRemainder / this.dots.medium));
      const mediumRemainder = Math.abs(
        Math.floor(largeRemainder % this.dots.medium)
      );
      const small = Math.abs(Math.floor(mediumRemainder / this.dots.small));
      const smallRemainder = Math.abs(
        Math.floor(mediumRemainder % this.dots.small)
      );
      const half = Math.abs(Math.round(smallRemainder / this.dots.half));

      const largeArr = new Array(large).fill({
        src: `assets/img/budget/large-${suffix}.png`
    ***REMOVED***);
      const mediumArr = new Array(medium).fill({
        src: `assets/img/budget/medium-${suffix}.png`
    ***REMOVED***);
      const smallArr = new Array(small).fill({
        src: `assets/img/budget/small-${suffix}.png`
    ***REMOVED***);
      const halfArr = new Array(half).fill({
        src: `assets/img/budget/half-${suffix}.png`
    ***REMOVED***);

      let arr = [];
      arr = arr.concat(largeArr, mediumArr, smallArr, halfArr);
      return arr;
  ***REMOVED***

    // if (val < 0 || type == "expense") {
    //   arr = new Array(count).fill(negativeValue)
    // }
    // else if (val > 0) {
    //   arr = new Array(count).fill(positiveValue)
    // }
***REMOVED***
  toggleDotEdit() {
    if (this.editDotValue) {
      this.calculateBalance();
  ***REMOVED***
    this.editDotValue = !this.editDotValue;
***REMOVED***
}