import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Observable } from "rxjs";
import { IBudget, IBudgetData } from "../../models/budget-tool.models";
import { StorageProvider } from "../../providers/storage/storage";
import allData from "./budget-data";
import sampleBudget from "./sample-budget";

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-budget-tool",
  templateUrl: "budget-tool.html"
})
export class BudgetToolPage {
  @select(["budget"])
  readonly budget$: Observable<IBudget>;
  allData: IBudgetData = allData;
  budget: any;

  constructor(public storagePrvdr: StorageProvider) {
    console.log("Hello BudgetToolProvider Provider");
    //load saved cards
    this.storagePrvdr.loadUser().then(user => {
      console.log("user loaded", user);
      this.loadSavedCards();
  ***REMOVED***);
***REMOVED***

  loadSavedCards() {
    this.storagePrvdr.getAll("budgetCards").then((cards: any) => {
      console.log("loading saved cards", cards);
      for (const card of cards) {
        console.log("adding type", card.Types);
        card.userGenerated = true;
        this.allData[card.Types].push(card);
    ***REMOVED***
      console.log("all data", this.allData);
  ***REMOVED***);
***REMOVED***
  loadSampleBudget() {
    return sampleBudget;
***REMOVED***
}
