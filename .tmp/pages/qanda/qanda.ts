import { Component } from '@angular/core';

import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-qanda',
  templateUrl: 'qanda.html'
})
export class QandAPage {
  discussions: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af:AngularFire, public alertCtrl:AlertController, public actionSheetCtrl: ActionSheetController) {
    this.discussions=af.database.list('/discussions');
***REMOVED***

  addDiscussion(){
    let prompt = this.alertCtrl.create({
      title: 'Discussion',
      message: "Enter a title for the discussion",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
      ***REMOVED***,
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
        ***REMOVED***
      ***REMOVED***,
        {
          text: 'Save',
          handler: data => {
            this.discussions.push({
              title: data.title
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***

  showOptions(discussionId, discussionTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Discussion',
          role: 'destructive',
          handler: () => {
            this.removeDiscussion(discussionId);
        ***REMOVED***
      ***REMOVED***,{
          text: 'Update title',
          handler: () => {
            this.updateDiscussion(discussionId, discussionTitle);
        ***REMOVED***
      ***REMOVED***,{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    actionSheet.present();
***REMOVED***

  removeDiscussion(discussionId: string){
    this.discussions.remove(discussionId);
***REMOVED***

  updateDiscussion(discussionId, discussionTitle){
    let prompt = this.alertCtrl.create({
      title: 'Discussion Name',
      message: "Update the name for this discussion",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: discussionTitle
      ***REMOVED***,
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
        ***REMOVED***
      ***REMOVED***,
        {
          text: 'Save',
          handler: data => {
            this.discussions.update(discussionId, {
              title: data.title
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***

}
