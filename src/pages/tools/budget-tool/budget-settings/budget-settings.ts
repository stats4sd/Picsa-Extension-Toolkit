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
  newBudget = {
    enterprise: 'crop',
    title:null
***REMOVED***
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.enterprises=['crop','livestock','other']
***REMOVED***

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetSettingsPage 2');
***REMOVED***
  startNew() {
    this.newBudgetSlide = true
    this.loadBudgetSlide = false
    this.slides.update()
    this.slides.slideTo(1, 500);

***REMOVED***
  loadSaved() {
    this.newBudgetSlide = false
    this.loadBudgetSlide = true
    this.slides.update()
    this.slides.slideTo(1, 500);
    
***REMOVED***
  createNewBudget() {
    
***REMOVED***

}
