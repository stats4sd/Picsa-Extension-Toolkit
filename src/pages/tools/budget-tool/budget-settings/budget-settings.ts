import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the BudgetSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-budget-settings',
  templateUrl: 'budget-settings.html',
})
export class BudgetSettingsPage {
  newBudgetSlide = true;
  loadBudgetSlide = false;
  enterprises: any
  months: any;
  days: any;
  newBudget = {
    title: null,
    periods: { values: [], starting: 'Jan', scale: "months", total: 12 }
  }
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.enterprises = ['crop', 'livestock', 'other']
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    this.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    this.newBudget.periods.values = this.months
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetSettingsPage 2');
  }
  startNew() {
    this.newBudgetSlide = true
    this.loadBudgetSlide = false
    this.slides.update()
    this.slides.slideTo(1, 500);

  }
  loadSaved() {
    this.newBudgetSlide = false
    this.loadBudgetSlide = true
    this.slides.update()
    this.slides.slideTo(1, 500);

  }
  nextSlide() {
    this.slides.slideNext()
  }
  calculatePeriod() {
    console.log('calculating period')
    let scale = this.newBudget.periods.scale
    let starting = this.newBudget.periods.starting
    let total = this.newBudget.periods.total
    let arr = []
    if (scale == 'months') { arr = this.calculatePeriodMonths(total, starting) }
    if (scale == 'weeks') { arr = this.calculatePeriodWeeks(total) }
    if (scale == 'days') { arr = this.calculatePeriodDays(total, starting) }
    this.newBudget.periods.values = arr
  }
  calculatePeriodWeeks(total) {
    console.log('total',total)
    let arr = []
    for (let i = 1; i <= total; i++) {
      arr.push('week ' + i)
    }
    return arr
  }
  calculatePeriodMonths(total, starting) {
    let array = this.months
    if (starting) {
      let startIndex = this.months.indexOf(starting)
      console.log('start index', startIndex)
      for (let i = 0; i < startIndex; i++) { array.push(array.shift()) }
    }
    if(total>array.length){
      for(let i=0;i<Math.ceil(total/array.length);i++){
        array = array.concat(array)
      }
    }
    return array.slice(0,total)

  }
  calculatePeriodDays(total, starting) {
    let array = this.days
    if (starting) {
      let startIndex = this.days.indexOf(starting)
      console.log('start index', startIndex)
      for (let i = 0; i < startIndex; i++) { array.push(array.shift()) }
    }
    if(total>array.length){
      for(let i=0;i<Math.ceil(total/array.length);i++){
        array = array.concat(array)
      }
    }
    return array.slice(0,total)
  }

  createNewBudget() {

  }

}
