import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { BudgetToolProvider } from '../../../providers/budget-tool/budget-tool'

@IonicPage()
@Component({
  selector: 'page-budget-tool',
  templateUrl: 'budget-tool.html',
})
export class BudgetToolPage {
  budget: any;
  data: any;
  rowTitles: any = ['Activities', 'Inputs', 'Family Labour', 'Outputs', 'Produce Consumed', 'Cash Balance']
  highlightActivity: any;
  highlighted: any = { activity: {} ***REMOVED***
  dots: any
  dotsArray=[]

  editDotValue: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bdg: BudgetToolProvider,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController) {

    this.data = bdg.allData
    this.highlightActivity = { 0: true }
    this.budget = this.bdg.budget
    this.dots = {
      large: 50000,
      medium: 10000,
      small: 1000,
      half: 500
  ***REMOVED***
    this.dotsArray=this._objectToArray(this.dots)
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
  _objectToArray(object) {
    console.log('converting object',object)
    let arr = []
    for (let key in object) {
      arr.push({key:key,val:object[key]})
  ***REMOVED***
    return arr
***REMOVED***
  calculateBalance() {
    // total for current period
    console.log('calculating balance')
    let i = 0
    let runningNet = 0
    for (let period of this.budget.data) {
      let expenses = 0
      let inputNet = 0
      let outputNet = 0
      let consumedNet = 0
      let monthlyNet = 0
      //remember, inputs have negative effect on cash flow as need to be bought
      for (let input of period.inputs) {
        if (input.quantity > 0) {
          inputNet = inputNet + input.quantity * input.cost
      ***REMOVED***
    ***REMOVED***
      for (let output of period.outputs) {
        if (output.quantity > 0) {
          outputNet = outputNet + output.quantity * output.cost
          consumedNet = consumedNet + output.consumed * output.cost
      ***REMOVED***
    ***REMOVED***
      monthlyNet = outputNet - inputNet
      runningNet = runningNet + monthlyNet

      let inputDots = this.valueDotNotation('expense', inputNet)
      let outputDots = this.valueDotNotation('income', outputNet)
      let consumedDots = this.valueDotNotation('expense', consumedNet)
      let monthlyDots = this.valueDotNotation('', monthlyNet)
      let runningDots = this.valueDotNotation('', runningNet)

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
      ***REMOVED***,

    ***REMOVED***

      i++
  ***REMOVED***
    console.log('budget', this.budget)

***REMOVED***
  valueDotNotation(type, val) {
    if (val != 0) {
      //code could be tidies to loop but it's late!
      let large = Math.abs(Math.round(val / this.dots.large))
      let largeRemainder = Math.abs(Math.round(val % this.dots.large))
      let medium = Math.abs(Math.round(largeRemainder / this.dots.medium))
      let mediumRemainder = Math.abs(Math.round(largeRemainder % this.dots.medium))
      let small = Math.abs(Math.round(mediumRemainder / this.dots.small))
      let smallRemainder = Math.abs(Math.round(mediumRemainder % this.dots.small))
      let half = Math.abs(Math.round(smallRemainder / this.dots.half))
      console.log('val', val, 'large', large, 'medium', medium, 'small', small)
    
      let suffix=""
      if (val < 0 || type == "expense") { suffix = "negative" }
      else { suffix = "positive" }
    
      let largeArr = new Array(large).fill({ src: "assets/img/budget/large-" + suffix + ".png" })
      let mediumArr = new Array(medium).fill({ src: "assets/img/budget/medium-" + suffix + ".png" })
      let smallArr = new Array(small).fill({ src: "assets/img/budget/small-" + suffix + ".png" })
      let halfArr = new Array(half).fill({ src: "assets/img/budget/half-" + suffix + ".png" })
      
      let arr=[]
      arr=arr.concat(largeArr,mediumArr,smallArr,halfArr)
      return arr
    
  ***REMOVED***

    
    // if (val < 0 || type == "expense") {
    //   arr = new Array(count).fill(negativeValue)
    // }
    // else if (val > 0) {
    //   arr = new Array(count).fill(positiveValue)
    // }
    

***REMOVED***
  toggleDotEdit() {
    if (this.editDotValue) { this.calculateBalance(); }
    this.editDotValue = !this.editDotValue

***REMOVED***

}






