import { Component } from "@angular/core";
import { IonicPage, LoadingController, NavController } from "ionic-angular";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-tools",
  templateUrl: "tools.html"
})
export class ToolsPage {
  tools: any;

  constructor(
    public navCtrl: NavController,
    private loader: LoadingController
  ) {
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

  loadTool(tool) {
    const loader = this.loader.create({
      content: `${tool.name} Loading...`,
      dismissOnPageChange: true
  ***REMOVED***);
    loader.present().then(_ => {
      if (tool.page) {
        this.navCtrl.push(tool.page);
    ***REMOVED*** else {
        this.navCtrl.push("IframePage", tool);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
}
