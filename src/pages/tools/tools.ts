import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IframePage } from '../iframe/iframe'

/**
 * Generated class for the ToolsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {
  tools: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tools = [
      { name: 'Participatory Budget', image: 'assets/img/budget.png', url: 'assets/tools/budget/index.html' },
      { name: 'Climate Tool', image: 'assets/img/climate.png', url: 'assets/tools/climate/index.html' } 
    ]   
    
***REMOVED***

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
***REMOVED***
  loadTool(tool) {
    console.log('tool',tool)
  this.navCtrl.push(IframePage,tool)
***REMOVED***

}
