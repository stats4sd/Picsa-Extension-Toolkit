import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BudgetToolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-budget-tool',
  templateUrl: 'budget-tool.html',
})
export class BudgetToolPage {
  budget: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var init=this.newTimePeriod
    this.budget = [init]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetToolPage');
  }

  newTimePeriod() {
    return {
      activities: [
        { id: 'apply fertiliser' },
      ],
      inputs: [
        { id: 'chemicals', quantity: 5, cost: 8 },
      ],
      family: [
        { id: 'labour', members: 1, days: 2 },
      ],
      outputs: [
        { id: 'wood', quantity: 1, cost: 100 },
      ],
      consumed: [
        { id: 'crop', quantity: 1, cost: 100 },
      ],
    }
  }

}
