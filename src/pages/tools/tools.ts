import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {
  tools: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tools = [
      // { name: 'Participatory Budget', image: 'assets/img/budget.png', url: 'assets/tools/budget/index.html' },
      // { name: 'Climate Tool', image: 'assets/img/climate.png', url: 'assets/tools/climate/index.html' }, 
      { name: 'Climate Tool (Beta)', image: 'assets/img/climate-beta.png', url: 'assets/tools/climate/index.html', page: 'ClimateToolPage' },
      { name: 'Budget Tool (Beta)', image: 'assets/img/budget-beta.png', url: 'assets/tools/budget/index.html', page: 'BudgetToolPage' } 
    ]   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
  }
  loadTool(tool) {
    console.log('tool', tool)
    if (tool.page) { this.navCtrl.push(tool.page) }
    else {
      this.navCtrl.push('IframePage', tool)      
    }
  
  }

}
