import { NgRedux } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavParams, ViewController } from "ionic-angular";
import { CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";
import { BudgetToolActions } from "../../../../../actions/budget-tool.actions";
import { IBudgetCard } from "../../../../../models/budget-tool.models";
import { AppState } from "../../../../../reducers/reducers";

@IonicPage()
@Component({
  selector: "budget-new-card",
  templateUrl: "new-card.html"
})
export class BudgetNewCardPage {
  cardPath: string;
  cardName: string;

  @ViewChild("canvasWhiteboard") canvasWhiteboard: CanvasWhiteboardComponent;
  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private actions: BudgetToolActions,
    private ngRedux: NgRedux<AppState>
  ) {
    this.cardPath = navParams.data.cardPath;
***REMOVED***

  saveCard() {
    const budget = this.ngRedux.getState().budget;
    const cards = budget.customCards ? budget.customCards : newCustomCards;
    const type = this.navParams.data.type;
    const id = this.generateSlug(this.cardName);
    // *** should add check for uniqueness and possibly strip any other special characters
    const card: IBudgetCard = {
      type: "other",
      name: this.cardName,
      id: id,
      custom: true,
      customImg: this.saveCanvasImage()
  ***REMOVED***;
    cards[type][id] = card;
    this.actions.updateCustomCards(cards);
    this.viewCtrl.dismiss();
***REMOVED***

  generateSlug(text) {
    return text
      .toLowerCase()
      .split(" ")
      .join("-");
***REMOVED***

  saveCanvasImage() {
    const img = this.canvasWhiteboard.generateCanvasDataUrl("image/png", 0.3);
    return img;
***REMOVED***

  dismiss() {
    this.viewCtrl.dismiss();
***REMOVED***
}

const newCustomCards = {
  enterprises: {},
  inputs: {},
  outputs: {}
***REMOVED***
