import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Events, LoadingController, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { UtilsProvider } from "../../../../providers/utils";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudget } from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";
import { BUDGET_API_VERSION, upgradeBudget } from "../../budget.upgrade";
import { defaults } from "../../data";
import { PB_MOCK_API_2, PB_MOCK_API_3 } from "../../mocks/budget.mocks";

@Component({
  selector: "budget-load",
  templateUrl: `budget-load.html`
})
export class BudgetLoadComponent {
  apiVersion = BUDGET_API_VERSION;
  _adminBudgets = [PB_MOCK_API_2, PB_MOCK_API_3];
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  @select(["user", "budgets"])
  savedBudgets$: Observable<IBudget[]>;
  savedBudgets: IBudget[];
  showArchived: boolean;
  constructor(
    public actions: BudgetToolActions,
    private events: Events,
    private budgetPrvdr: BudgetToolProvider,
    private loadingCtrl: LoadingController,
    private utils: UtilsProvider
  ) {}
  ngOnInit() {
    console.log("api version", this.apiVersion);
    this.savedBudgets$.subscribe(budgets => {
      if (budgets) {
        this.savedBudgets = _jsonObjectValues(budgets);
        console.log("saved budgets", budgets);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
  startNew() {
    const budget: IBudget = {
      apiVersion: BUDGET_API_VERSION,
      archived: false,
      created: new Date().toISOString(),
      data: {},
      description: null,
      enterprise: null,
      _key: null,
      periods: defaults.periods.days,
      title: null,
      scale: null,
      enterpriseType: null,
      dotValues: {
        large: 50000,
        medium: 10000,
        small: 1000,
        half: 500
    ***REMOVED***
  ***REMOVED***;
    this.actions.setActiveBudget(budget);
    this.actions.setBudgetView({
      component: "settings",
      title: "Settings"
  ***REMOVED***);
    // publish event to force card list update
    this.events.publish("load:budget");
***REMOVED***
  async loadBudget(budget: IBudget) {
    await this.utils.presentLoader({ content: "Preparing budget" });
    budget = this.checkForBudgetUpgrades(budget);
    this.actions.setActiveBudget(budget);
    this.actions.setBudgetView({
      component: "overview",
      title: budget.title
  ***REMOVED***);
    this.events.publish("calculate:budget");
    // publish event to force card list update
    this.events.publish("load:budget");
    // give small timeout to give appearance of smoother rendering
    setTimeout(() => {
      this.utils.dismissLoader();
  ***REMOVED***, 1000);
***REMOVED***
  // recursively go through budget and if api version less than current perform incremental upgrade
  checkForBudgetUpgrades(budget: IBudget) {
    console.log("checking for upgrade", budget.apiVersion, this.apiVersion);
    if (budget.apiVersion < this.apiVersion) {
      budget = upgradeBudget(budget);
      return this.checkForBudgetUpgrades(budget);
  ***REMOVED*** else {
      console.log("budget up to date");
      return budget;
  ***REMOVED***
***REMOVED***
  archiveBudget(budget: IBudget) {
    budget.archived = true;
    this.utils.presentToast({
      message: "Budget archived",
      duration: 3000
  ***REMOVED***);
    this.budgetPrvdr.saveBudget(budget);
***REMOVED***
  restoreBudget(budget: IBudget) {
    budget.archived = false;
    this.utils.presentToast({
      message: "Budget restored",
      duration: 3000
  ***REMOVED***);
    this.budgetPrvdr.saveBudget(budget);
***REMOVED***
  showArchivedBudgets() {
    this.showArchived = true;
***REMOVED***
  _ADMIN_LoadBudgetMocks() {
    console.log("loading admin budget", this._adminBudgets);
    this.loadBudget(this._adminBudgets[0]);
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
