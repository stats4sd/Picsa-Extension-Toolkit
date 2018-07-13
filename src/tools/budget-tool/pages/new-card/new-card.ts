import { NgRedux } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavParams,
  ViewController
} from "ionic-angular";
import { CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import { ICustomBudgetCard } from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";

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
    private ngRedux: NgRedux<AppState>,
    private budgetToolProvider: BudgetToolProvider
  ) {
    this.cardPath = navParams.data.cardPath;
  }

  saveCard() {
    // const budget = this.ngRedux.getState().budget;
    // const cards = budget.customCards ? budget.customCards : newCustomCards;
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
    };
    this.budgetToolProvider.firestorePrvdr.addToCollection(
      `budgetTool/meta/${endpoint}`,
      card,
      id
    );
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

const newCustomCards = {
  enterprises: [],
  inputs: [],
  outputs: []
};
