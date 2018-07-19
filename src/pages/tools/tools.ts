import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-tools",
  templateUrl: "tools.html"
})
export class ToolsPage {
  tools: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tools = [
      // { name: 'Participatory Budget', image: 'assets/img/budget.png', url: 'assets/tools/budget/index.html' },
      // { name: 'Climate Tool', image: 'assets/img/climate.png', url: 'assets/tools/climate/index.html' },
      {
        name: "Climate Tool",
        image: "assets/img/climate-tool.svg",
        page: "ClimateToolPage"
    ***REMOVED***,
      {
        name: "Budget Tool",
        image: "assets/img/budget-tool.svg",
        page: "BudgetToolPage"
    ***REMOVED***
    ];
***REMOVED***

  ionViewDidLoad() {
    console.log("ionViewDidLoad ToolsPage");
***REMOVED***
  loadTool(tool) {
    console.log("tool", tool);
    if (tool.page) {
      this.navCtrl.push(tool.page);
  ***REMOVED*** else {
      this.navCtrl.push("IframePage", tool);
  ***REMOVED***
***REMOVED***
}
