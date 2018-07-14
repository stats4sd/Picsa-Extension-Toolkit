import { NgRedux, select } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudgetCard, IBudgetMeta } from "../../budget-tool.models";

@Component({
  selector: "budget-cell-edit",
  templateUrl: "budget-cell-edit.html"
})
export class BudgetCellEditComponent {
  @select(["budget", "view", "meta", "type"])
  type$: Observable<string>;
  @select(["budget", "view", "meta", "rowIndex"])
  rowIndex$: Observable<number>;
  @select(["budget", "meta"])
  cardMeta$: Observable<IBudgetMeta>;
  allCards: IBudgetMeta;
  cards: IBudgetCard[];
  cellData: any;

  constructor(
    private NgRedux: NgRedux<AppState>,
    private actions: BudgetToolActions
  ) {}
  ngOnInit() {
    this.cardMeta$.subscribe(cards => {
      this.allCards = cards;
  ***REMOVED***);
    this.type$.subscribe(type => {
      if (type) {
        this.setCards(type);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  setCards(type) {
    this.cards = this.allCards[type];
    console.log("cards", this.cards);
***REMOVED***
}
