import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController, ToastController } from 'ionic-angular';
import { StorageProvider } from '../../../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-budget-settings',
  templateUrl: 'budget-settings.html',
})
export class BudgetSettingsPage {
  newBudgetSlide = true;
  loadBudgetSlide = false;
  saved: any = [];
  archived:any=[];
  enterprises: any
  months: any;
  timeScales: any;
  days: any;
  modalMode:boolean;
  budget = {
    title: "New Budget",
    archived: false,
    periods: { labels: [], starting: 'Jan', timeScale: "months", total: 12 }
  }
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storagePrvdr: StorageProvider, public viewCtrl:ViewController, public toastCtrl:ToastController) {
    console.log('loading budget settings page')
    this.enterprises = ['crop', 'livestock', 'livelihood']
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    this.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    this.timeScales = ['months', 'weeks', 'days', 'none']
    this.budget.periods.labels = this.months
    console.log('budget',this.budget)
    
  }

  ionViewDidEnter() {
    // if sent as model
    if(this.navParams.data.operation){
      console.log('navParams',this.navParams)
      this.modalMode=true
      if(this.navParams.data.operation=="new"){this.startNew()}
      if(this.navParams.data.operation=="load"){this.loadSaved()}
    }
  }
  
  startNew() {
    this.newBudgetSlide = true
    this.loadBudgetSlide = false
    this.slides.update()
    this.slides.slideTo(1, 500);
  }
  loadSaved() {
    // load saved click, loads cached budgets and moves to loading screen
    this.newBudgetSlide = false
    this.loadBudgetSlide = true
    this.loadSavedBudgets()
    this.slides.update()
    this.slides.slideTo(1, 500);
  }
  loadSavedBudgets() {
    // load saved budgets from cache
    this.storagePrvdr.getAll('budgets').then((res) => {
      let arr = []
      for (let key in res) { 
        let budget = res[key]
        if(budget.archived){this.archived.push(budget)}
        else{arr.push(budget)}
      }
      this.saved = arr.reverse()
    })
  }
  loadBudget(b, isNew) {
    // click function to return selected budget
    console.log('loading budget', b)
    if (!b.hasOwnProperty('title')) { b = this.upgradeBudget(b) }
    if (isNew) {
      b.created = new Date();
      b.id=this.storagePrvdr.generatePushID();
      b.data = this.createDataTemplates(b.periods.labels);
    }
    if(this.modalMode){this.viewCtrl.dismiss(b)}
    else{this.navCtrl.push('BudgetToolPage',b)}
  }
  createDataTemplates(labels) {
    let arr = []
    console.log('creating templates')
    labels.forEach((label, i) => {
      arr.push({
        label: label,
        index: i,
        activities: [],
        inputs: [],
        outputs: [],
        familyLabour: { people: 0, days: 0 },
        balance: {
          inputs: {
            total: 0,
            dots: []
          },
          outputs: {
            total: 0,
            dots: []
          },
          consumed: {
            total: 0,
            dots: []
          },
          monthly: {
            total: 0,
            dots: []
          },
          running: {
            total: 0,
            dots: []
          }
        }
      })
    });
    return arr
}
archive(budget) {
  console.log('archiving budget',budget)
  budget.archived = true;
  this.storagePrvdr.saveUserDoc(budget,true,'budgets',budget.id).then(()=>{
    this.loadSavedBudgets()
    let toast = this.toastCtrl.create({
      message: 'Budget Archived',
      duration: 3000
    });
    toast.present()
  })
  
}
nextSlide() {
  this.slides.slideNext()
}
calculatePeriod() {
  // return array representing time periods
  let timeScale = this.budget.periods.timeScale
  let starting = this.budget.periods.starting
  let total = this.budget.periods.total
  let arr = []
  if (timeScale == 'months') { arr = this.calculatePeriodMonths(total, starting) }
  if (timeScale == 'days') { arr = this.calculatePeriodDays(total, starting) }
  if (timeScale == 'weeks') { arr = this.calculatePeriodConsecutive(total, 'week') }
  if (timeScale == 'none') { arr = this.calculatePeriodConsecutive(total) }
  this.budget.periods.labels = arr
}
calculatePeriodConsecutive(total, prefix ?) {
  if (!prefix) { prefix = "" }
  let arr = []
  for (let i = 1; i <= total; i++) {
    arr.push(prefix + i)
  }
  return arr
}
calculatePeriodMonths(total, starting) {
  let array = this.months
  if (starting) {
    let startIndex = this.months.indexOf(starting)
    for (let i = 0; i < startIndex; i++) { array.push(array.shift()) }
  }
  if (total > array.length) {
    for (let i = 0; i < Math.ceil(total / array.length); i++) {
      array = array.concat(array)
    }
  }
  return array.slice(0, total)

}
calculatePeriodDays(total, starting) {
  let array = this.days
  if (starting) {
    let startIndex = this.days.indexOf(starting)
    for (let i = 0; i < startIndex; i++) { array.push(array.shift()) }
  }
  if (total > array.length) {
    for (let i = 0; i < Math.ceil(total / array.length); i++) {
      array = array.concat(array)
    }
  }
  return array.slice(0, total)
}

/************* legacy functions, to be removed in future updates *************/

upgradeBudget(b){
  console.log('upgrading budget b')
  if (!b.title) { b.title = b.name; delete b.name }
  if(!b.periods){b.periods={ labels: [], starting: 1, timeScale: "none", total: 12 }}
  return b
}

}
