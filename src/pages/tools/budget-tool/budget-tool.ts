import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard'
import { BudgetToolProvider } from '../../../providers/budget-tool/budget-tool'

@IonicPage()
@Component({
  selector: 'page-budget-tool',
  templateUrl: 'budget-tool.html',
  viewProviders: [CanvasWhiteboardComponent],
})
export class BudgetToolPage {
  budget: any;
  data: any;
  rowTitles: any = ['Activities', 'Inputs', 'Family Labour', 'Outputs', 'Produce Consumed', 'Cash Balance']
  highlightActivity: any;
  highlighted: any = { activity: {} ***REMOVED***
  dotValue: number = 500;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bdg: BudgetToolProvider,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController) {

    this.data = bdg.allData
    this.highlightActivity = { 0: true }
    this.budget = this.bdg.budget
***REMOVED***

  ionViewDidLoad() {
    console.log('budget', this.budget);
***REMOVED***
  close() {
    this.navCtrl.pop();
***REMOVED***
  edit(type, period) {
    console.log('editing', type, period)
    let selected = period[type]
    let modal = this.modalCtrl.create(
      'CardSelectPage',
      { type: type, selected: selected, period: period },
      { enableBackdropDismiss: false })
    modal.onDidDismiss(d => {
      this.budget.data[period.index - 1] = d
      this.calculateBalance()
  ***REMOVED***)
    modal.present()

***REMOVED***
  saveAndLoad(operation) {
    console.log('operation', operation)
    let modal = this.modalCtrl.create(
      'BudgetSavedPage',
      { operation: operation, budget: this.budget },
      { enableBackdropDismiss: false }
    )
    modal.onDidDismiss(data => {
      this.budget = data
      this.calculateBalance()
  ***REMOVED***)
    console.log('presenting modal')
    modal.present()
***REMOVED***
  _toArray(value) {
    return new Array(value).fill(0)
***REMOVED***
  calculateBalance() {
    // total for current period
    console.log('calculating balance')
    var i = 0
    for (let period of this.budget.data) {
      let expenses = 0
      let income = 0
      for (let input of period.inputs) {
        if (input.quantity > 0) {
          let total = input.quantity * input.cost
          expenses = expenses + total
      ***REMOVED***
    ***REMOVED***
      for (let output of period.outputs) {
        if (output.quantity > 0) {
          let total = (output.quantity - output.consumed) * output.cost
          income = income + total
      ***REMOVED***
    ***REMOVED***
      let net = income - expenses
      this.budget.data[i].balance = {
        expenses: expenses, income: income, net: net
    ***REMOVED***
      // running total
      if (i > 0) {
        let running = this.budget.data[i - 1].runningTotal
        this.budget.data[i].runningTotal = {
          expenses: expenses + running.expenses,
          income: income + running.income,
          net: net + running.net
      ***REMOVED***
    ***REMOVED***
      else { this.budget.data[i].runningTotal = this.budget.data[i].balance }
      i++
  ***REMOVED***
    console.log('budget', this.budget)
***REMOVED***

}






