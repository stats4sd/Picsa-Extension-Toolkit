import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard'
import { BudgetToolProvider } from '../../providers/budget-tool/budget-tool'
import { BudgetCardPage} from './budget-card/budget-card'

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
  highlighted: any = { activity: {} };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bdg: BudgetToolProvider,
    private modalCtrl:ModalController) {
    
    var init = this.newTimePeriod
    this.data = bdg.allData
    this.highlightActivity = { 0: true }
    this.budget=this.bdg.sampleBudget
  }

  ionViewDidLoad() {
    console.log('budget', this.budget);
  }
  close() {
    this.navCtrl.pop();
  }
  highlight(type,i){
    // if(!this.highlighted[type]){this.highlighted[type]={}}
    // this.highlighted[type][i] = !this.highlighted[type][i]
    if (!this.data[type][i].selected) { this.data[type][i].selected = true }
    else { this.data[type][i].selected = !this.data[type][i].selected }
  }
  addCard() {
    let modal = this.modalCtrl.create(BudgetCardPage);
    modal.onDidDismiss(data => {
      console.log('dismissed',data);
    });
    modal.present();
  }

  newTimePeriod() {
    return {
      activities: [],
      inputs: [],
      family: [],
      outputs: [],
      consumed: [],
    }
  }

}






