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
  highlighted: any = { activity: {} };
  dotValue: number = 500;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bdg: BudgetToolProvider,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController) {

    this.data = bdg.allData
    this.highlightActivity = { 0: true }
    this.budget = this.bdg.sampleBudget
  }

  ionViewDidLoad() {
    console.log('budget', this.budget);
  }
  close() {
    this.navCtrl.pop();
  }
  edit(type, period) {
    console.log('editing', type, period)
    let selected = period[type]
    let modal = this.modalCtrl.create(
      'CardSelectPage',
      { type: type, selected: selected, period: period },
      { enableBackdropDismiss: false })
    modal.onDidDismiss(data => {
      this.budget[period.index - 1] = data
      this.calculateBalance()
    })
    modal.present()

  }
  saveAndLoad(operation) {
    console.log('operation', operation)
    let modal = this.modalCtrl.create(
      'BudgetSavedPage',
      { operation: operation, budget: this.budget },
      // { enableBackdropDismiss: false }
    )
    modal.onDidDismiss(data => {
      this.budget = data
      this.calculateBalance()
    })
    modal.present()
  }
  _toArray(value) {
    return new Array(value).fill(0)
  }
  calculateBalance() {
    // total for current period
    console.log('calculating balance')
    var i = 0
    for (let period of this.budget) {
      let expenses = 0
      let income = 0
      for (let input of period.inputs) {
        if (input.quantity > 0) {
          let total = input.quantity * input.cost
          expenses = expenses + total
        }
      }
      for (let output of period.outputs) {
        if (output.quantity > 0) {
          let total = (output.quantity - output.consumed) * output.cost
          income = income + total
        }
      }
      let net = income - expenses
      this.budget[i].balance = {
        expenses: expenses, income: income, net: net
      }
      // running total
      if (i > 0) {
        let running = this.budget[i - 1].runningTotal
        this.budget[i].runningTotal = {
          expenses: expenses + running.expenses,
          income: income + running.income,
          net: net + running.net
        }
      }
      else { this.budget[i].runningTotal = this.budget[i].balance }
      i++
    }
    console.log('budget', this.budget)
  }

}






