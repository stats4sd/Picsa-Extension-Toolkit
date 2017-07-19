import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {
  resources: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fileOpener:FileOpener) {
    this.resources = [
      { name: 'Picsa Manual', src: 'assets/picsa-field-manual.pdf' }
    ]
***REMOVED***

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
    this.fileOpener.open('assets/picsa-field-manual.pdf', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));
***REMOVED***

}
