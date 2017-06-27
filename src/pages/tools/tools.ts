import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IframePage } from '../iframe/iframe';
import { ClimateToolPage } from '../climate-tool/climate-tool';
import { BudgetToolPage } from '../budget-tool/budget-tool';

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
      { name: 'Climate Tool', image: 'assets/img/climate.png', url: 'assets/tools/climate/index.html' }, 
      { name: 'Climate Tool (Beta)', image: 'assets/img/climate-beta.png', url: 'assets/tools/climate/index.html', page: ClimateToolPage },
      { name: 'Budget Tool (Beta)', image: 'assets/img/budget-beta.png', url: 'assets/tools/budget/index.html', page: BudgetToolPage } 
    ]   
    
***REMOVED***

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
***REMOVED***
  loadTool(tool) {
    console.log('tool', tool)
    if (tool.page) { this.navCtrl.push(tool.page) }
    else {
      this.navCtrl.push(IframePage, tool)      
  ***REMOVED***
  
***REMOVED***

}
