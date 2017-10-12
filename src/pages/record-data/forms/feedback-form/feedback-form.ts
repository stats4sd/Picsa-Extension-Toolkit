import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, IonicPage } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
      date: [(new Date()).toISOString(), Validators.required],
      location:['',Validators.required],
      name:['',Validators.required],   
  ***REMOVED***);
    this.slideTwoForm = formBuilder.group({
      males:['',Validators.required],
      females:['',Validators.required],
      activities:['',Validators.required],
  ***REMOVED***);
    this.slideThreeForm = formBuilder.group({
      comments:[''],
      shared:[''],
      tablets:[''],     
  ***REMOVED***);
    // firstName: ['test', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    // lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    // age: []
    // username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
    // privacy: ['', Validators.required],
    // bio: ['']


***REMOVED***

  next() {
    this.signupSlider.slideNext();
***REMOVED***

  prev() {
    this.signupSlider.slidePrev();
***REMOVED***

  save() {
    this.submitAttempt = true;
    let submission = Object.assign({},this.slideOneForm.value, this.slideTwoForm.value, this.slideThreeForm.value);
    console.log('submission',submission)
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
      submission._deviceID='test';
      console.log("success!")
  ***REMOVED***

***REMOVED***

}