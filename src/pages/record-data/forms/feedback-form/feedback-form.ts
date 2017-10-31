/*
Note, entire system could do with overhaul, too much split logic. for should just handle updating form fields,
meta data should be done via provider so that both view-data and record-data pages have access to same methods
*/

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import {StorageProvider} from '../../../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-feedback-form',
  templateUrl: 'feedback-form.html',
})
export class FeedbackFormPage {

  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;

  submitAttempt: boolean = false;
  template:any={
    date:new Date().toISOString(),
    location:'',
    name:'',
    males:null,
    females:null,
    activities:'',
    comments:'',
    shared:'',
    tablets:'',
    _submissionID:null,
    _userID:null
***REMOVED***

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public events:Events, public navParams:NavParams, public storagePrvdr:StorageProvider) {
    if(this.navParams.data.hasOwnProperty('_submissionID')){this._enableEdit(this.navParams.data)}
    this.slideOneForm = formBuilder.group({
      date: [this.template.date, Validators.required],
      location:[this.template.location || '',Validators.required],
      name:[this.template.name || '',Validators.required],   
  ***REMOVED***);
    this.slideTwoForm = formBuilder.group({
      males:[this.template.males,Validators.required],
      females:[this.template.females,Validators.required],
      activities:[this.template.activities,Validators.required],
  ***REMOVED***);
    this.slideThreeForm = formBuilder.group({
      comments:[this.template.comments],
      shared:[this.template.shared],
      tablets:[this.template.tablets],  
      //metadata
      _submissionID:[this.template._submissionID],
      _userID:[this.template._userID],
  ***REMOVED***);
***REMOVED***

  next() {
    this.signupSlider.slideNext();
***REMOVED***

  prev() {
    this.signupSlider.slidePrev();
***REMOVED***
  _enableEdit(form){
    console.log('enabling edit',form)
    if(!this.template.updates){this.template.updates=1}
    else{this.template.updates++}
    for(let key in form){
      if(this.template.hasOwnProperty(key)){
        this.template[key]=form[key]
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  save() {
    this.submitAttempt = true;
    
    console.log('submission',this.template)
    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
  ***REMOVED***
    else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
  ***REMOVED***
    else if (!this.slideThreeForm.valid) {
      this.signupSlider.slideTo(2);
  ***REMOVED***
    else {
      let submission = Object.assign({},this.slideOneForm.value, this.slideTwoForm.value, this.slideThreeForm.value);
      if(submission._submissionID){
        console.log('preparing to update form',submission)
        this.events.publish('form:updated',{formName:'reporting',formSubmission:submission})
    ***REMOVED***
      else{
        console.log('preparing to submit form',submission)
        this.events.publish('form:submitted',{formName:'reporting',formSubmission:submission})}
      
      this.navCtrl.pop()
  ***REMOVED***

***REMOVED***

}