import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { UtilsProvider } from "../../providers/utils";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-tools",
  templateUrl: "tools.html"
})
export class ToolsPage {
  tools: any;

  constructor(public navCtrl: NavController, public utils: UtilsProvider) {
    this.tools = [
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

  async loadTool(tool) {
    await this.utils.presentLoader({
      content: `Loading...`,
      dismissOnPageChange: true
  ***REMOVED***);
    if (tool.page) {
      this.navCtrl.push(tool.page);
  ***REMOVED*** else {
      this.navCtrl.push("IframePage", tool);
  ***REMOVED***
***REMOVED***
}
