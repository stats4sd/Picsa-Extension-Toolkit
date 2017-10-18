import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, IonicPage } from 'ionic-angular';
import { AngularFireOfflineDatabase, AfoListObservable, AfoObjectObservable } from 'angularfire2-offline/database';
import { Network } from '@ionic-native/network'
@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html'
})
export class ForumPage {
  // discussions: AfoListObservable<any[]>;
  // messages: AfoListObservable<any[]>;
  // statistics: AfoListObservable<any>;
  // discussionDetail: AfoObjectObservable<any>;

  constructor(){}

  // constructor(public navCtrl: NavController, afoDatabase: AngularFireOfflineDatabase, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private network: Network) {
  //   // this.discussions = afoDatabase.list('/discussions');
  //   // this.messages = afoDatabase.list('/messages');
  //   // this.statistics = afoDatabase.list('/statistics');
  //   console.log('network', this.network.type)
  //   this.watchForConnection();
  //   this.watchForDisconnect();
  // }
  // watchForConnection() {
  //   let connectSubscription = this.network.onConnect().subscribe(() => {
  //     console.log('network connected!');
  //     // We just got a connection but we need to wait briefly
  //     // before we determine the connection type.  Might need to wait
  //     // prior to doing any api requests as well.
  //     setTimeout(() => {
  //       console.log(this.network.type)
  //       console.log('we got a connection..');
  //       console.log('Firebase: Go Online..');
  //       // self.dataService.goOnline();
  //       // self.events.publish('network:connected', true);
  //     }, 3000);
  //   });
  // }

  // watchForDisconnect() {
  //   var self = this;
  //   // watch network for a disconnect
  //   let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  //     console.log('network was disconnected :-(');
  //     console.log('Firebase: Go Offline..');
  //     // self.sqliteService.resetDatabase();
  //     // self.dataService.goOffline();
  //     // self.events.publish('network:connected', false);
  //   });
  // }

  // openDiscussion(discussion) {
  //   this.navCtrl.push('ForumDiscussionPage', discussion)
  // }

  // addDiscussion() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Add new discussion',
  //     message: "Enter a title for the discussion",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.discussions.push({
  //             title: data.title,
  //             messages: 0,
  //             created: Date.now(),
  //             lastUpdated: Date.now(),
  //             createdBy: 'user'
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // showOptions(discussionId, discussionTitle) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'What do you want to do?',
  //     buttons: [
  //       {
  //         text: 'Delete Discussion',
  //         role: 'destructive',
  //         handler: () => {
  //           this.removeDiscussion(discussionId);
  //         }
  //       }, {
  //         text: 'Update title',
  //         handler: () => {
  //           this.updateDiscussion(discussionId, discussionTitle);
  //         }
  //       }, {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // removeDiscussion(discussionId: string) {
  //   this.discussions.remove(discussionId);
  // }

  // updateDiscussion(discussionId, discussionTitle) {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Discussion Name',
  //     message: "Update the name for this discussion",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title',
  //         value: discussionTitle
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.discussions.update(discussionId, {
  //             title: data.title
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

}
