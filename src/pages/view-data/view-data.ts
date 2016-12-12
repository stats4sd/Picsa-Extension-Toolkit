import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ViewData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-data',
  templateUrl: 'view-data.html'
})
export class ViewDataPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ViewDataPage Page');
  }

}
