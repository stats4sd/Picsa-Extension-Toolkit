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
    public storagePrvdr: StorageProvider,
    public viewCtrl: ViewController,
    public toastCtrl:ToastController
  ) {
    console.log('nav params', navParams)
    this.operation = navParams.data.operation
    this.budget = navParams.data.budget
    
    if (this.operation == 'load') {
      this.loadSavedBudgets()
  ***REMOVED***
    
    console.log('budget',this.budget)
***REMOVED***

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetSavedPage');
***REMOVED***
  close() {
    this.viewCtrl.dismiss(this.budget)
***REMOVED***
  loadSavedBudgets() {
    this.storagePrvdr.getAll('budgets').then((res) => {
      console.log('budgets loaded', res)
      let arr = []
      for (let key in res) { arr.push(res[key]) }
      this.saved = arr.reverse()
      console.log('saved',this.saved)
  ***REMOVED***)
***REMOVED***
  saveBudget() {
    console.log('saving budget')
    this.storagePrvdr.saveUserDoc(this.budget,true,'budgets',this.budget.id).then((res) => {
      console.log('save res', res)
      this.loadSavedBudgets()
      let toast = this.toastCtrl.create({
        message: 'Budget Saved',
        duration: 3000
    ***REMOVED***);
      toast.present().then(() => {
        this.viewCtrl.dismiss(this.budget);
    ***REMOVED***)
  ***REMOVED***)
    
***REMOVED***
  archive(budget) {
    console.log('archiving budget',budget)
    budget.archived = true;
    this.storagePrvdr.saveUserDoc(this.budget,true,'budgets',this.budget.id).then(()=>{
      this.loadSavedBudgets()
      let toast = this.toastCtrl.create({
        message: 'Budget Archived',
        duration: 3000
    ***REMOVED***);
      toast.present()
  ***REMOVED***)
    
***REMOVED***
  loadBudget(budget) {
    this.budget = budget
    this.viewCtrl.dismiss(this.budget);
***REMOVED***


}
