import { select } from "@angular-redux/store";
import { Component, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { IBudgetDotValues } from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";

@Component({
  selector: "budget-cell-value",
  templateUrl: "budget-cell-value.html"
})
export class BudgetCellValueComponent {
  @Input()
  set quantity(quantity: number) {
    this._quantity = quantity;
    this.generateRepresentation();
***REMOVED***
  @Input()
  set cost(cost: number) {
    this._cost = cost;
    this.generateRepresentation();
***REMOVED***
  @select(["budget", "active", "dotValues"])
  dotValues$: Observable<IBudgetDotValues>;
  dotValueSubcription: Subscription;
  _quantity: number;
  _cost: number;
  dotValues: IBudgetDotValues;
  dotsArray: number[];
  dotValueAllocation: any = baseAllocation;

  constructor(private budgetPrvdr: BudgetToolProvider) {
    this._addSubscribers();
***REMOVED***
  ngOnDestroy() {
    this._removeSubscribers();
***REMOVED***

  // given updates to cost or quantity split the total into components of the large, medium, small and half values
  // map these values to directed arrays to populate images in the pictorial representation
  generateRepresentation() {
    if (this._cost && this._quantity) {
      const total = this._cost * this._quantity;
      const sign = total >= 0 ? "positive" : "negative";
      let toAllocate = Math.abs(total);
      // keep track of how many times each value is multiplied by to make total
      const dotAllocation = Object.assign({}, this.dotValues);
      // iterate over values, subtracting multiples of divisor
      for (const dotType in this.dotValues) {
        if (this.dotValues.hasOwnProperty(dotType)) {
          const divisor = this.dotValues[dotType];
          const multiples = Math.floor(toAllocate / divisor);
          toAllocate = toAllocate - divisor * multiples;
          dotAllocation[dotType] = this._createArray(multiples, sign);
      ***REMOVED***
    ***REMOVED***
      this.dotValueAllocation = dotAllocation;
  ***REMOVED*** else {
      this.dotValueAllocation = baseAllocation;
  ***REMOVED***
***REMOVED***
  _createArray(length: number, sign: "positive" | "negative") {
    return new Array(length).fill(sign);
***REMOVED***

  _removeSubscribers() {
    this.dotValueSubcription.unsubscribe();
***REMOVED***

  // subscribe to dotValues and recalculate on change
  _addSubscribers() {
    this.dotValueSubcription = this.dotValues$.subscribe(values => {
      if (values) {
        this.dotValues = values;
        this.generateRepresentation();
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
}

const baseAllocation = {
  large: [],
  medium: [],
  small: [],
  half: []
***REMOVED***
