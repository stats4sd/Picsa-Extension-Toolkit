import { NgRedux } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { FirestoreStorageProvider } from "../../providers/storage/firestore";
import { StorageProvider } from "../../providers/storage/storage";
import { AppState } from "../../reducers/reducers";
import { BudgetToolActions } from "./budget-tool.actions";
import { IBudgetCard } from "./budget-tool.models";
import { budgetMeta } from "./data";

@Injectable()
export class BudgetToolProvider {
  constructor(
    public firestorePrvdr: FirestoreStorageProvider,
    private actions: BudgetToolActions,
    private storagePrvdr: StorageProvider,
    private ngRedux: NgRedux<AppState>
  ) {
    this.init();
    this.syncData();
***REMOVED***

  // automatically populate data from storage
  // if first load, populate storage with hardcoded data
  async init() {
    const budgetData = await this.storagePrvdr.storage.get("_budgetMeta");
    if (!budgetData) {
      await this.storagePrvdr.storage.set("_budgetMeta", budgetMeta);
      this.init();
  ***REMOVED*** else {
      this.actions.setBudgetMeta(budgetMeta);
  ***REMOVED***
***REMOVED***

  // watch afs data endpoints and reflect changes to redux and localstorage
  async syncData() {
    for (const endpoint of Object.keys(budgetMeta)) {
      const collection = this.firestorePrvdr.getCollection(
        `budgetTool/meta/${endpoint}`
      );
      collection.subscribe(data => {
        console.log("budget data received", endpoint, data);
        this.actions.setBudgetMeta({ [endpoint]: data });
        const meta = this.ngRedux.getState().budget.meta;
        meta[endpoint] = data;
        this.storagePrvdr.storage.set("_budgetMeta", meta);
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

  // instead of usual sync from db to local, this can be used to populate the main db from local
  // NOTE, THIS OVERRIDES EXISTING DATA ON MATCH, ONLY USE IF YOU KNOW WHAT YOU ARE DOING
  async populateDB() {
    for (const endpoint of Object.keys(budgetMeta)) {
      const data: IBudgetCard[] = budgetMeta[endpoint];
      data.forEach(datum => {
        const docId = datum.id;
        this.firestorePrvdr.setDoc(
          `budgetTool/meta/${endpoint}/${docId}`,
          datum
        );
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
}
