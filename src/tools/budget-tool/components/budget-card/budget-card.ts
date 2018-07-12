import { NgRedux, select } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { ModalController } from "ionic-angular";
import { Observable } from "rxjs/observable";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../../../tools/budget-tool/budget-tool.actions";
import {
  IBudget,
  IBudgetCard
} from "../../../../tools/budget-tool/budget-tool.models";

@Component({
  selector: "budget-card",
  templateUrl: "budget-card.html"
})
export class BudgetCardComponent {
  @select(["budget", "active"])
  readonly budget$: Observable<IBudget>;
  @Input("path") cardPath: string;
  @Input("card") card: IBudgetCard;
  @Input("newCardType") newCardType: string;
  cardSlug: string;
  budget: IBudget;
  cardPathValue: string;
  selected: boolean;
  value$: any;

  constructor(
    public ngRedux: NgRedux<AppState>,
    public actions: BudgetToolActions,
    private modalCtrl: ModalController
  ) {
    this.budget$.subscribe(budget => {
      this.budget = budget;
    });
  }

  ngOnInit() {
    // skip init if card not specified (e.g. addNewCard card doesn't have properties)
    if (this.card) {
      this.addValueSubscriber();
    }
  }

  // subscribe to specific value changes related to this card's value path (prepended with /budget/active)
  // don't add if card name 'other' as has own methods
  addValueSubscriber() {
    const pathArray: string[] = this.cardPath.split(".");
    pathArray.unshift("active");
    pathArray.unshift("budget");
    this.value$ = this.ngRedux.select(pathArray);
    console.log("adding value sub", this.card);
    this.value$.subscribe(v => {
      this.cardPathValue = v;
      this.selected = v === this.card.id;
    });
  }

  // assign budget value, unsetting if already exists
  cardClicked() {
    if (this.cardPathValue === this.card.id) {
      this.updateBudget(null);
    } else {
      this.updateBudget(this.card.id);
    }
  }

  addNewCard() {
    this.modalCtrl
      .create("BudgetNewCardPage", {
        type: this.newCardType,
        cardPath: this.cardPath
      })
      .present();
  }

  // navigate through budget object to set specific subkey (currently not fully implemented for nested paths)
  updateBudget(value) {
    if (this.cardPath.includes(".")) {
      throw new Error("deep path not supported");
    } else {
      this.budget[this.cardPath] = value;
      this.actions.setActiveBudget(this.budget);
    }
  }
}
