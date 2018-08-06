import { NgRedux } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { Events } from "ionic-angular";
import { IBudgetCard, IBudgetPeriodData } from "../../budget-tool.models";

@Component({
  selector: "budget-cell",
  templateUrl: "budget-cell.html"
})
export class BudgetCellComponent {
  @Input("periodIndex") periodIndex: number;
  @Input("rowLabel") rowLabel: string;
  @Input("type") type: string;
  @Input("typeLabel") typeLabel: string;
  @Input()
  set cellData(cellData: IBudgetPeriodData) {
    if (cellData) {
      this.setCellData(cellData);
  ***REMOVED***
***REMOVED***
  _cellData: IBudgetCard[];

  constructor(private events: Events) {}

  setCellData(data: IBudgetPeriodData) {
    const cards = _jsonObjectValues(data);
    if (cards.length > 0) {
      this._cellData = cards;
  ***REMOVED*** else {
      // empty should be treated as null (cell has been entered but no data selected)
      this._cellData = null;
  ***REMOVED***
    console.log("cell data set", cards);
***REMOVED***

  editCell() {
    // use both events and redux as redux alone fails to trigger uipdate when period index changed
    // but type remains (e.g. activity 1 => activity 2)
    this.events.publish("cell:selected", {
      type: this.type,
      periodIndex: this.periodIndex,
      title: `${this.rowLabel} ${this.typeLabel}`
  ***REMOVED***);
***REMOVED***
}

function _jsonObjectValues(json: any) {
  const values = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      values.push(json[key]);
  ***REMOVED***
***REMOVED***
  return values;
}
