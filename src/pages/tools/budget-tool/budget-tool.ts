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
  rowTitles:any=['Activities','Inputs','Family Labour','Outputs','Produce Consumed','Cash Balance']
  highlightActivity:any;
  highlighted: any = { activity: {} ***REMOVED***

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bdg: BudgetToolProvider,
    private modalCtrl: ModalController,
    private popoverCtrl:PopoverController) {
    
    this.data = bdg.allData
    this.highlightActivity = { 0: true }
    this.budget=this.bdg.sampleBudget
***REMOVED***

  ionViewDidLoad() {
    console.log('budget', this.budget);
***REMOVED***
  close() {
    this.navCtrl.pop();
***REMOVED***
  edit(type, period) {
    console.log('editing',type,period)
    let selected = period[type]
    let modal = this.modalCtrl.create(
      'CardSelectPage',
      {type: type,selected:selected,period:period},
      { enableBackdropDismiss:false})
    modal.onDidDismiss(data => {
      this.budget[period.index-1]=data
  ***REMOVED***)
    modal.present()
    
***REMOVED***
  _toArray(value) {
    return new Array(value).fill(0)
***REMOVED***

}






