import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { Slides, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { BudgetToolActions } from "../../../../actions/budget-tool.actions";
import {
  IBudget,
  IEnterpriseOptions
} from "../../../../models/budget-tool.models";
import { StorageProvider } from "../../../../providers/storage/storage";
import * as data from "../../data";

@Component({
  selector: "budget-settings",
  templateUrl: "budget-settings.html"
})
export class BudgetSettingsComponent {
  apiVersion: 2;
  @select(["user", "budgets"])
  savedBudgets$: Observable<IBudget[]>;
  @select(["budget", "enterpriseType"])
  enterpriseType$: Observable<string>;
  @select("budget") budget$: Observable<IBudget>;
  @select(["budget", "customCards", "enterprises"])
  customEnterprises$: Observable<any>;
  customEnterprises: IEnterpriseOptions[];
  savedBudgets: IBudget[] = [];
  newBudget: boolean;
  enterpriseTypes: string[];
  budget: IBudget;

  saved: any = [];
  archived: any = [];
  enterprises: any;
  months: any;
  timeScales: any;
  days: any;
  modalMode: boolean;
  // budget = {
  //   title: "New Budget",
  //   archived: false,
  //   periods: { labels: [], starting: "Jan", timeScale: "months", total: 12 }
  // ***REMOVED***
  @ViewChild(Slides) slides: Slides;

  constructor(
    private storagePrvdr: StorageProvider,
    public toastCtrl: ToastController,
    private actions: BudgetToolActions
  ) {
    this.budget$.subscribe(budget => {
      this.budget = budget;
  ***REMOVED***);
    this.savedBudgets$.subscribe(budgets => {
      if (budgets) {
        this.savedBudgets = budgets;
    ***REMOVED***
  ***REMOVED***);
    this.enterpriseType$.subscribe(type => {
      this._filterEnterprises(type);
  ***REMOVED***);
    this.enterpriseTypes = this._generateEnterpriseTypes(data.enterprises);
    this.customEnterprises$.subscribe(enterprises => {
      console.log("enterprises", enterprises);
      if (enterprises) {
        this.customEnterprises = Object.values(enterprises);
        console.log("custom enterprises", this.customEnterprises);
    ***REMOVED***
  ***REMOVED***);
    console.log("budget", this.budget);
***REMOVED***

  _generateEnterpriseTypes(enterprises: IEnterpriseOptions[]) {
    const types = {***REMOVED***
    enterprises.forEach(enterprise => {
      types[enterprise.type] = true;
  ***REMOVED***);
    return Object.keys(types);
***REMOVED***
  // when enterprise type changed only show relevant enterprises
  // if there is only one sub type assume that is the one selected
  _filterEnterprises(type: string) {
    let enterprises = data.enterprises;
    if (type) {
      enterprises = enterprises.filter(e => {
        return e.type === type;
    ***REMOVED***);
  ***REMOVED***
    this.enterprises = enterprises;
    if (enterprises.length == 1) {
      this.setBudget("enterprise", enterprises[0]);
  ***REMOVED***
***REMOVED***
  // assign budget value, unsetting if already exists (duplicate of budget card function)
  setBudget(key, val) {
    if (this.budget[key] === val) {
      this.budget[key] = null;
  ***REMOVED*** else {
      this.budget[key] = val;
  ***REMOVED***
    this.actions.set(this.budget);
***REMOVED***

  startNew() {
    const d = new Date();
    const budget = {
      apiVersion: this.apiVersion,
      archived: false,
      created: d.toLocaleDateString(),
      data: null,
      description: null,
      enterprise: null,
      id: null,
      periods: null,
      title: null,
      scale: null
  ***REMOVED***;
    this.actions.createNew(budget);
    this.newBudget = true;
***REMOVED***

  loadSaved() {}
  getSavedBudgets() {
    // load saved budgets from cache
    this.storagePrvdr.getAll("budgets").then(res => {
      const arr = [];
      for (const key in res) {
        let budget = res[key];
        if (budget.archived) {
          this.archived.push(budget);
      ***REMOVED*** else {
          if (!budget.hasOwnProperty("title")) {
            budget = this.upgradeBudget(budget);
        ***REMOVED***
          arr.push(budget);
      ***REMOVED***
    ***REMOVED***
      this.saved = arr.reverse();
      console.log("saved budgets", this.saved);
  ***REMOVED***);
***REMOVED***
  loadBudget(b, isNew) {
    // click function to return selected budget
    // console.log("loading budget", b);
    // if (isNew) {
    //   b.created = new Date();
    //   b.id = this.storagePrvdr.generatePushID();
    //   b.data = this.createDataTemplates(b.periods.labels);
    // }
    // if (this.modalMode) {
    //   this.viewCtrl.dismiss(b);
    // } else {
    //   this.navCtrl.push("BudgetToolPage", b);
    // }
***REMOVED***
  createDataTemplates(labels) {
    const arr = [];
    console.log("creating templates");
    labels.forEach((label, i) => {
      arr.push({
        label: label,
        index: i,
        activities: [],
        inputs: [],
        outputs: [],
        familyLabour: { people: 0, days: 0 },
        balance: {
          inputs: {
            total: 0,
            dots: []
        ***REMOVED***,
          outputs: {
            total: 0,
            dots: []
        ***REMOVED***,
          consumed: {
            total: 0,
            dots: []
        ***REMOVED***,
          monthly: {
            total: 0,
            dots: []
        ***REMOVED***,
          running: {
            total: 0,
            dots: []
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
    return arr;
***REMOVED***
  archive(budget) {
    // console.log("archiving budget", budget);
    // budget.archived = true;
    // this.storagePrvdr
    //   .saveUserDoc(budget, true, "budgets", budget.id)
    //   .then(() => {
    //     this.loadSavedBudgets();
    //     const toast = this.toastCtrl.create({
    //       message: "Budget Archived",
    //       duration: 3000
    //   ***REMOVED***);
    //     toast.present();
    // ***REMOVED***);
***REMOVED***
  nextSlide() {
    this.slides.slideNext();
***REMOVED***
  calculatePeriod() {
    // return array representing time periods
    // const timeScale = this.budget.periods.timeScale;
    // const starting = this.budget.periods.starting;
    // const total = this.budget.periods.total;
    // let arr = [];
    // if (timeScale == "months") {
    //   arr = this.calculatePeriodMonths(total, starting);
    // }
    // if (timeScale == "days") {
    //   arr = this.calculatePeriodDays(total, starting);
    // }
    // if (timeScale == "weeks") {
    //   arr = this.calculatePeriodConsecutive(total, "week");
    // }
    // if (timeScale == "none") {
    //   arr = this.calculatePeriodConsecutive(total);
    // }
    // this.budget.periods.labels = arr;
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
    let array = this.months;
    if (starting) {
      const startIndex = this.months.indexOf(starting);
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
    let array = this.days;
    if (starting) {
      const startIndex = this.days.indexOf(starting);
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

  /************* legacy functions, to be removed in future updates *************/

  upgradeBudget(b) {
    console.log("upgrading budget b");
    if (!b.title) {
      b.title = b.name;
      delete b.name;
  ***REMOVED***
    if (!b.periods) {
      b.periods = { labels: [], starting: 1, timeScale: "none", total: 12 ***REMOVED***
  ***REMOVED***
    return b;
***REMOVED***
}
