import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {StorageProvider } from '../../../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-budget-saved',
  templateUrl: 'budget-saved.html',
})
export class BudgetSavedPage {

  operation: string
  budget: any = { name: 'New Budget' }
  saved:any=[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public viewCtrl: ViewController,
    public toastCtrl:ToastController
  ) {
    console.log('nav params', navParams)
    this.operation = navParams.data.operation
    this.budget = navParams.data.budget
    if (this.operation == 'load') {
      this.storage.load('budgets').then((res)=>{
        console.log('budgets loaded', res)
        this.saved=res
      })
    }
    
    console.log('budget',this.budget)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetSavedPage');
  }
  close() {
    this.viewCtrl.dismiss(this.budget)
  }
  saveBudget() {
    console.log('saving budget')
    this.storage.push('budgets', this.budget)
    let toast = this.toastCtrl.create({
      message: 'Budget Saved',
      duration: 3000
    });
    toast.present
    this.viewCtrl.dismiss(this.budget);

  }
  loadBudget(budget) {
    this.budget = budget
    this.viewCtrl.dismiss(this.budget);
  }


}
