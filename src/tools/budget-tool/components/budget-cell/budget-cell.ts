import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";

@Component({
  selector: "budget-cell",
  templateUrl: "budget-cell.html"
})
export class BudgetCellComponent {
  @Input("rowIndex") rowIndex: number;
  @Input("rowLabel") rowLabel: string;
  @Input("type") type: string;
  @Input("typeLabel") typeLabel: string;
  cellData: any;
  constructor(
    private NgRedux: NgRedux<AppState>,
    private actions: BudgetToolActions
  ) {}
  ngOnInit() {
    this._addDataSubscriber();
***REMOVED***

  // bind to budget data entry for specific row index and type (e.g. time period 2 activities)
  _addDataSubscriber() {
    this.NgRedux.select(["budget", "active", "data", this.rowIndex]).subscribe(
      data => {
        // console.log(`${this.type} ${this.rowIndex} data`, data);
        this.cellData = data;
    ***REMOVED***
    );
***REMOVED***

  editCell() {
    this.actions.setBudgetView({
      component: "cell-edit",
      title: `${this.rowLabel} ${this.typeLabel}`,
      meta: {
        type: this.type,
        rowIndex: this.rowIndex
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
}
