import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as c3 from 'c3';

/**
 * Generated class for the ClimateToolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-climate-tool',
  templateUrl: 'climate-tool.html',
})
export class ClimateToolPage {
  chart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('c3?',c3)
***REMOVED***  

  ionViewDidLoad() {
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

}
