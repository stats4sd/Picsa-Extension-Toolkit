import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RecordData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record-data',
  templateUrl: 'record-data.html'
})
export class RecordDataPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RecordDataPage Page');
  }

}
