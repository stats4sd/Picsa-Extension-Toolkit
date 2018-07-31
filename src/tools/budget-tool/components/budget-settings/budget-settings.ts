import { NgRedux, select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";
import { Observable } from "rxjs";
import { AppState } from "../../../../reducers/reducers";
import { BudgetToolActions } from "../../budget-tool.actions";
import {
  IBudget,
  IBudgetCard,
  ICustomBudgetCard
} from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";
import { DAYS, MONTHS } from "../../data";

@Component({
  selector: "budget-settings",
  templateUrl: "budget-settings.html"
})
export class BudgetSettingsComponent {
  // budget property observers
  @select(["budget", "active", "enterpriseType"])
  enterpriseType$: Observable<string>;
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  @select(["budget", "active", "enterprise"])
  enterprise$: Observable<string>;
  @select(["budget", "active", "periods", "scale"])
  timescale$: Observable<string>;
  @select(["budget", "meta", "enterprises"])
  enterprises$: Observable<ICustomBudgetCard[]>;
  @select(["budget", "active", "created"])
  created$: Observable<string>;
  // additional properties
  allEnterprises: IBudgetCard[] = [];
  filteredEnterprises: IBudgetCard[] = [];
  showIndividualEnterprises: boolean;
  timescales = ["days", "weeks", "months"];
  days = DAYS;
  months = MONTHS;
  enterpriseTypes: IBudgetCard[] = [];
  budget: IBudget;
  @ViewChild(Slides) slides: Slides;

  constructor(
    public actions: BudgetToolActions,
    public ngRedux: NgRedux<AppState>,
    public budgetPrvdr: BudgetToolProvider
  ) {}

  ngOnInit() {
    this._addSubscribers();
***REMOVED***

  // various listeners for budget change actions
  _addSubscribers() {
    this.enterpriseType$.subscribe(type => {
      this._filterEnterprises(type, this.allEnterprises);
  ***REMOVED***);
    // update enterprise types and filter list when enterprises changes
    this.enterprises$.subscribe(enterprises => {
      if (enterprises) {
        this.allEnterprises = enterprises;
        this.enterpriseTypes = this._generateEnterpriseTypes(enterprises);
        const type = this.budget ? this.budget.enterpriseType : null;
        this._filterEnterprises(type, enterprises);
    ***REMOVED***
  ***REMOVED***);
    // calculate time periods when new timescale specified
    this.timescale$.subscribe(scale => {
      if (scale) {
        this.calculatePeriod(scale);
    ***REMOVED***
  ***REMOVED***);
    this.budget$.subscribe(budget => {
      this.budget = budget;
  ***REMOVED***);
***REMOVED***

  // iterate over enterprises and populate groups that exist
  // always populate the 'other/custom' group
  _generateEnterpriseTypes(enterprises: IBudgetCard[]) {
    const groups: any = { other: true ***REMOVED***
    enterprises.forEach(enterprise => {
      groups[enterprise.group] = true;
  ***REMOVED***);
    // convert to array, sort alphabetically and move 'other' group to end
    let types: string[] = Object.keys(groups);
    types = this._sortAlphabetcially(types);
    types.push(types.splice(types.indexOf("other"), 1)[0]);
    // finally convert to standard budget card format
    const typeCards: IBudgetCard[] = types.map(type => {
      return {
        id: type,
        name: type
    ***REMOVED***;
  ***REMOVED***);
    return typeCards;
***REMOVED***
  // when enterprise type changed only show relevant enterprises
  // if there is only one sub type assume that is the one selected (unless other/custom)
  _filterEnterprises(type: string, enterprises: IBudgetCard[]) {
    this.showIndividualEnterprises = false;
    if (type) {
      enterprises = enterprises.filter(e => {
        return e.group === type;
    ***REMOVED***);
      this.filteredEnterprises = this._sortByField(enterprises, "name");
      if (type == "other") {
        this.showIndividualEnterprises = true;
    ***REMOVED*** else {
        // when only one result set it as type
        if (enterprises.length == 1) {
          this.budgetPrvdr.patchBudget("enterprise", enterprises[0].id);
      ***REMOVED*** else {
          // otherwise set enterprise as null (if not already defined)
          this.showIndividualEnterprises = true;
          if (!this.budget || !this.budget.enterprise) {
            this.budgetPrvdr.patchBudget("enterprise", null);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else {
      this.budgetPrvdr.patchBudget("enterprise", null);
  ***REMOVED***
***REMOVED***
  _sortAlphabetcially(arr: string[]) {
    return arr.sort((a, b) => {
      return a > b ? 1 : -1;
  ***REMOVED***);
***REMOVED***

  _sortByField(arr: any[], field) {
    return arr.sort((a, b) => {
      return a[field] > b[field] ? 1 : -1;
  ***REMOVED***);
***REMOVED***

  nextSlide() {
    this.slides.slideNext();
***REMOVED***

  viewBudget() {
    this.actions.setActiveBudget(this.budget);
    this.actions.setBudgetView({
      component: "overview",
      title: this.budget.title
  ***REMOVED***);
***REMOVED***

  calculatePeriod(timescale?) {
    const budget = this.ngRedux.getState().budget.active;
    // return array representing time periods
    const starting = budget.periods.starting;
    const total = budget.periods.total;
    if (!timescale) {
      timescale = budget.periods.scale;
  ***REMOVED***
    console.log("calculate period", timescale);
    let arr = [];
    if (timescale == "months") {
      budget.periods.total = total ? total : 12;
      budget.periods.starting = MONTHS.includes(starting) ? starting : "Jan";
      arr = this.calculatePeriodMonths(total, starting);
  ***REMOVED***
    if (timescale == "days") {
      budget.periods.starting = DAYS.includes(starting) ? starting : "Mon";
      budget.periods.total = total ? total : 7;
      arr = this.calculatePeriodDays(total, starting);
  ***REMOVED***
    if (timescale == "weeks") {
      budget.periods.starting = null;
      budget.periods.total = 4;
      arr = this.calculatePeriodConsecutive(total, "week");
  ***REMOVED***
    if (timescale == "none") {
      arr = this.calculatePeriodConsecutive(total);
  ***REMOVED***
    budget.periods.labels = arr;
***REMOVED***
  calculatePeriodConsecutive(total, prefix?) {
    if (!prefix) {
      prefix = "";
  ***REMOVED***
    const arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push(prefix + i);
  ***REMOVED***
    return arr;
***REMOVED***
  calculatePeriodMonths(total, starting) {
    let array = MONTHS;
    if (starting) {
      const startIndex = MONTHS.indexOf(starting);
      for (let i = 0; i < startIndex; i++) {
        array.push(array.shift());
    ***REMOVED***
  ***REMOVED***
    if (total > array.length) {
      for (let i = 0; i < Math.ceil(total / array.length); i++) {
        array = array.concat(array);
    ***REMOVED***
  ***REMOVED***
    return array.slice(0, total);
***REMOVED***
  calculatePeriodDays(total, starting) {
    let array = DAYS;
    if (starting) {
      const startIndex = DAYS.indexOf(starting);
      for (let i = 0; i < startIndex; i++) {
        array.push(array.shift());
    ***REMOVED***
  ***REMOVED***
    if (total > array.length) {
      for (let i = 0; i < Math.ceil(total / array.length); i++) {
        array = array.concat(array);
    ***REMOVED***
  ***REMOVED***
    return array.slice(0, total);
***REMOVED***
}
