import { NgRedux } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { Events, IonicPage, NavParams, ViewController } from "ionic-angular";
import { CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";
import { UserActions } from "../../../../actions/user.actions";
import { AppState } from "../../../../reducers/reducers";

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
    private events: Events,
    private ngRedux: NgRedux<AppState>,
    private userActions: UserActions
  ) {}

  saveCard() {
    const type = this.navParams.data.type;
    const id = `_custom_${this.budgetToolProvider.firestorePrvdr.db.createId()}`;
    // *** should add check for uniqueness and possibly strip any other special characters
    // *** need createdBy but won't be populated if firebase never initialised (could use a second local id)
    const card: ICustomBudgetCard = {
      group: "other",
      name: this.cardName,
      id: id,
      type: type,
      custom: true,
      customImg: this.saveCanvasImage(),
      created: new Date().toString(),
      createdBy: "*** get by redux ***"
    };
    console.log("custom budget card created", card);
    const allCustomCards = Object.assign(
      {},
      this.ngRedux.getState().user.budgetCustomCards
    );
    if (!allCustomCards[type]) {
      allCustomCards[type] = [];
    }
    allCustomCards[type].push(card);
    this.userActions.updateUser({ budgetCustomCards: allCustomCards });
    // publish notification for budget card list to repopulate with new cards
    this.events.publish("customCards:updated", allCustomCards);
    this.viewCtrl.dismiss();
  }

  saveCanvasImage() {
    const img = this.canvasWhiteboard.generateCanvasDataUrl("image/png", 0.3);
    return img;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
