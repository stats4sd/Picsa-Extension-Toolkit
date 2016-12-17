import { Component } from '@angular/core';

import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html'
})
export class ForumPage {
discussions: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af:AngularFire, public alertCtrl:AlertController, public actionSheetCtrl: ActionSheetController) {
    this.discussions=af.database.list('/discussions');
  }

  addDiscussion(){
    let prompt = this.alertCtrl.create({
      title: 'Discussion',
      message: "Enter a title for the discussion",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.discussions.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(discussionId, discussionTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Discussion',
          role: 'destructive',
          handler: () => {
            this.removeDiscussion(discussionId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateDiscussion(discussionId, discussionTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeDiscussion(discussionId: string){
    this.discussions.remove(discussionId);
  }

  updateDiscussion(discussionId, discussionTitle){
    let prompt = this.alertCtrl.create({
      title: 'Discussion Name',
      message: "Update the name for this discussion",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: discussionTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.discussions.update(discussionId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
