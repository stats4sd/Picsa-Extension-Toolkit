import { Component } from '@angular/core';

import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-qanda',
  templateUrl: 'qanda.html'
})
export class QandAPage {
  songs: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af:AngularFire, public alertCtrl:AlertController, public actionSheetCtrl: ActionSheetController) {
    this.songs=af.database.list('/songs');
    console.log(this.songs)


***REMOVED***

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
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
            this.songs.push({
              title: data.title
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
        ***REMOVED***
      ***REMOVED***,{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
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

  removeSong(songId: string){
    this.songs.remove(songId);
***REMOVED***

  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
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
            this.songs.update(songId, {
              title: data.title
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***

}
