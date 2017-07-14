import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireOfflineDatabase, AfoListObservable, AfoObjectObservable } from 'angularfire2-offline/database';


@IonicPage()
@Component({
  selector: 'page-forum-discussion',
  templateUrl: 'forum-discussion-page.html'
})
export class ForumDiscussionPage {
  discussion: any;
  newMessage: any = "";
  messages: AfoListObservable<any[]>;
  messageDetail: AfoObjectObservable<any>;

  constructor(public navCtrl: NavController, params: NavParams, afoDatabase:AngularFireOfflineDatabase, public alertCtrl: AlertController) {
    this.discussion = params.data
    console.log(this.discussion);
    this.messages = afoDatabase.list('/messages/' + this.discussion.$key);
***REMOVED***

  ionViewDidLoad() {
***REMOVED***

  postMessage() {
    if (this.newMessage != "")
      this.messages.push({
        contents: this.newMessage,
        created: Date.now(),
        user: 'user',
        discussion: this.discussion.$key,
        votes:0
    ***REMOVED***);
    this.newMessage = ""
    console.log(this.messages)
***REMOVED***

  addMessage() {
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
