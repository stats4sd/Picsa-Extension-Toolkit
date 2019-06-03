import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AppState } from "src/app/store/store.model";
import { BudgetToolActions } from "../../budget-tool.actions";
import { BudgetCardComponent } from "./budget-card";

/*
Budget new cards are used to display new card placeholders
*/
@Component({
  selector: "budget-new-card",
  templateUrl: "budget-card.html"
})
export class BudgetNewCardComponent extends BudgetCardComponent {
  @Input("newCardType") newCardType: string;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions,
    private modalCtrl: ModalController
  ) {
    super(ngRedux, actions);
  }

  // as no card is input instead create placeholder
  ngOnInit() {
    this.card = {
      id: "add",
      name: "Add New"
    };
    this.type = "new";
  }
  // when adding a new card opens modal
  // *** note, this should be changed to use view meta instead and load as component instead of page
  async cardClicked() {
    console.log("new card type", this.newCardType);
    const modal = await this.modalCtrl.create({
      component: "BudgetNewCardPage",
      componentProps: {
        type: this.newCardType
      }
    });
    await modal.present();
  }
}
