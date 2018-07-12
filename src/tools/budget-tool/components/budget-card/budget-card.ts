import { NgRedux, select } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { ModalController } from "ionic-angular";
import { Observable } from "rxjs/observable";
import { BudgetToolActions } from "../../../../actions/budget-tool.actions";
import { IBudget } from "../../../../models/budget-tool.models";
import { AppState } from "../../../../reducers/reducers";

@Component({
  selector: "budget-card",
  templateUrl: "budget-card.html"
})
export class BudgetCardComponent {
  @select("budget") readonly budget$: Observable<IBudget>;
  @Input("path") cardPath: string;
  @Input("name") cardName: string;
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
    this.cardSlug = this.cardName
      .toLowerCase()
      .split(" ")
      .join("-");
    if (this.cardName != "other") {
      this.addValueSubscriber();
    }
  }

  // subscribe to specific value changes related to this card's value path
  // don't add if card name 'other' as has own methods
  addValueSubscriber() {
    const pathArray: string[] = this.cardPath.split(".");
    pathArray.unshift("budget");
    this.value$ = this.ngRedux.select(pathArray);
    this.value$.subscribe(v => {
      this.cardPathValue = v;
      this.selected = v === this.cardName;
    });
  }

  // assign budget value, unsetting if already exists
  cardClicked() {
    if (this.cardPathValue === this.cardName) {
      this.updateBudget(null);
    } else {
      this.updateBudget(this.cardName);
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
      this.actions.set(this.budget);
    }
  }
}
