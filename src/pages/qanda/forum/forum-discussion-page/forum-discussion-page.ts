import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireService} from '../../../../providers/angular-fire-service';

/*
  Generated class for the ForumDiscussionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forum-discussion',
  templateUrl: 'forum-discussion-page.html'
})
export class ForumDiscussionPage {
  discussion:any;
  messages: FirebaseListObservable<any>;
  newMessage:any="";

  constructor(public navCtrl: NavController, params:NavParams, afService:AngularFireService, public alertCtrl:AlertController) {
    this.discussion=params.data
    console.log(this.discussion);
    this.messages=afService.bindData('/messages/'+this.discussion.$key);
***REMOVED***

  ionViewDidLoad() {
***REMOVED***

  postMessage(){
    if(this.newMessage!="")
    this.messages.push({
        contents:this.newMessage,
        title:'test'
    ***REMOVED***);
    this.newMessage=""
    console.log(this.messages)
***REMOVED***

  addMessage(){
    let prompt = this.alertCtrl.create({
      title: 'Add new discussion',
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
            this.messages.push({
              title: data.title
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***

}
