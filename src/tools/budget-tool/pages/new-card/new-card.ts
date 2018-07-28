import { Component, ViewChild } from "@angular/core";
import {
  Events,
  IonicPage,
  NavParams,
  ViewController
} from "ionic-angular";
import { CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";
import { ICustomBudgetCard } from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";

@IonicPage()
@Component({
  selector: "budget-new-card",
  templateUrl: "new-card.html"
})
export class BudgetNewCardPage {
  cardName: string;

  @ViewChild("canvasWhiteboard") canvasWhiteboard: CanvasWhiteboardComponent;
  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private budgetToolProvider: BudgetToolProvider,
    private events: Events
  ) {}

  saveCard() {
    const endpoint = this.navParams.data.type;
    const id = `_custom_${this.budgetToolProvider.firestorePrvdr.db.createId()}`;
    // *** should add check for uniqueness and possibly strip any other special characters
    const card: ICustomBudgetCard = {
      group: "other",
      name: this.cardName,
      id: id,
      custom: true,
      customImg: this.saveCanvasImage(),
      created: new Date().toString(),
      createdBy: "*** get by redux ***"
  ***REMOVED***;
    this.budgetToolProvider.firestorePrvdr
      .addToCollection(`budgetTool/meta/${endpoint}`, card, id)
      .then(() => {
        // publish notification for budget card list to repopulate with new cards
        this.events.publish("customCards:updated");
    ***REMOVED***);
    this.viewCtrl.dismiss();
***REMOVED***

  saveCanvasImage() {
    const img = this.canvasWhiteboard.generateCanvasDataUrl("image/png", 0.3);
    return img;
***REMOVED***

  dismiss() {
    this.viewCtrl.dismiss();
***REMOVED***
}
