import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudget } from "../../budget-tool.models";
import { defaults } from "../../data";

@Component({
  selector: "load-budget",
  template: `<div padding class="saved-budgets">
  <h2>Saved Budgets</h2>
  <ion-scroll style="flex:1">
    <ion-list *ngIf="savedBudgets$ | async">
      <div *ngFor="let budget of savedBudgets$ | async">
        <ion-item *ngIf="!budget.archived">
          <div class="saved-budget" style="display:flex">
            <div class="saved-details" (click)="loadBudget(budget,false)" style="flex-basis:100%">
              <div>{{budget.title}}</div>
              <div>{{budget.created | date:'mediumDate'}}</div>
            </div>
            <button padding icon-left ion-button color="danger" (click)="archive(b)">
              <ion-icon name="trash"></ion-icon>Archive</button>
          </div>
        </ion-item>
      </div>
    </ion-list>
    <div *ngIf="!(savedBudgets$ | async)">
        <p>There are no saved budgets</p>
    </div>
  </ion-scroll>
  <button block ion-button (click)="startNew()" color="primary" style="max-width: 400px">
    <ion-icon name="add" class="large-icon"></ion-icon>
    <span style="margin-left:10px">Create a new Budget</span>
  </button>
</div>`
})
export class BudgetLoadComponent {
  apiVersion: 2;
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  @select(["user", "budgets"])
  savedBudgets$: Observable<IBudget[]>;
  constructor(public actions: BudgetToolActions) {}
  ngOnInit() {}
  startNew() {
    const d = new Date();
    const budget: IBudget = {
      apiVersion: this.apiVersion,
      archived: false,
      created: d.toLocaleString(),
      data: null,
      description: null,
      enterprise: null,
      id: null,
      periods: defaults.periods.days,
      title: null,
      scale: null,
      enterpriseType: null,
      view: null
  ***REMOVED***;
    this.actions.setActiveBudget(budget);
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

  // archive(budget) {
  //   // console.log("archiving budget", budget);
  //   // budget.archived = true;
  //   // this.storagePrvdr
  //   //   .saveUserDoc(budget, true, "budgets", budget.id)
  //   //   .then(() => {
  //   //     this.loadSavedBudgets();
  //   //     const toast = this.toastCtrl.create({
  //   //       message: "Budget Archived",
  //   //       duration: 3000
  //   //   ***REMOVED***);
  //   //     toast.present();
  //   // ***REMOVED***);
  // }

  getSavedBudgets() {
    // load saved budgets from cache
    // this.storagePrvdr.getAll("budgets").then(res => {
    //   const arr = [];
    //   for (const key in res) {
    //     let budget = res[key];
    //     if (budget.archived) {
    //       this.archived.push(budget);
    //   ***REMOVED*** else {
    //       if (!budget.hasOwnProperty("title")) {
    //         budget = this.upgradeBudget(budget);
    //     ***REMOVED***
    //       arr.push(budget);
    //   ***REMOVED***
    // ***REMOVED***
    //   this.saved = arr.reverse();
    //   console.log("saved budgets", this.saved);
    // });
***REMOVED***
}
