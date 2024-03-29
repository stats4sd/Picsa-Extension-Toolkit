import { NgRedux, select } from "@angular-redux/store";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BudgetToolActions } from "./budget-tool.actions";
import {
  IBudget,
  IBudgetCard,
  IBudgetDotValues,
  ICustomBudgetCard
} from "./budget-tool.models";
import { budgetMeta } from "./data";
import { AppState } from "src/app/store/store.model";
import { FirestoreStorageProvider } from "src/providers/firestore";
import { StorageProvider } from "src/providers/storage";
import { UserProvider } from "src/providers/user";

@Injectable({ providedIn: "root" })
export class BudgetToolProvider implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  dotValues: IBudgetDotValues;
  constructor(
    public firestorePrvdr: FirestoreStorageProvider,
    public userPrvdr: UserProvider,
    private actions: BudgetToolActions,
    private storagePrvdr: StorageProvider,
    private ngRedux: NgRedux<AppState>
  ) {
    this.init();
    // this.syncData();
    this.enableAutoSave();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  // automatically populate data from storage
  // if first load, populate storage with hardcoded data
  async init() {
    const budgetData = await this.storagePrvdr.storage.get("_budgetMeta");
    if (!budgetData) {
      await this.storagePrvdr.storage.set("_budgetMeta", budgetMeta);
      this.init();
    } else {
      console.log("setting budget meta", budgetMeta);
      this.actions.setBudgetMeta(budgetMeta);
    }
  }

  // automatically save any changes to the active budget
  enableAutoSave() {
    this.budget$.pipe(takeUntil(this.componentDestroyed)).subscribe(budget => {
      if (budget && budget.title) {
        if (!budget._key) {
          budget._key = this.firestorePrvdr.db.createId();
        }
        this.saveBudget(budget);
      }
    });
  }

  async saveBudget(budget: IBudget) {
    let savedBudgets = await this.userPrvdr.user.budgets;
    if (!savedBudgets) {
      savedBudgets = {};
    }
    savedBudgets[budget._key] = budget;
    this.userPrvdr.updateUser("budgets", savedBudgets);
  }

  // change single budget key/value
  patchBudget(key, val) {
    setTimeout(() => {
      const budget = this.ngRedux.getState().budget.active;
      if (budget) {
        budget[key] = val;
        this.actions.setActiveBudget(budget);
      }
    }, 150);
  }

  /*
      The methods below are used to keep firebase data sync'd locally when internet available
      They are sinukar to firebase and storage provider methods, but included again
      to retain tool independent use, allow subcollection paths and custom data sort
  
      */

  // watch afs data endpoints and reflect changes to redux and localstorage
  // NOTE this is just for main card types and not custom (which is stored to user)
  async syncData() {
    for (const endpoint of Object.keys(budgetMeta)) {
      const collection = this.firestorePrvdr.getCollection(
        `budgetTool/meta/${endpoint}`
      ) as Observable<ICustomBudgetCard[]>;
      collection.subscribe(data => {
        if (data && data.length > 0) {
          const orderedData = this._sortData(data);
          console.log("updating syncd budget meta", data);
          this.actions.patchBudgetMeta({ [endpoint]: orderedData });
          // const meta = this.ngRedux.getState().budget.meta;
          // meta[endpoint] = orderedData;
          // this.storagePrvdr.storage.set("_budgetMeta", meta);
        }
      });
    }
  }

  _sortData(collection: ICustomBudgetCard[]) {
    try {
      // want to first sort alphabetically
      collection = collection.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
      // then demote cards which are 'custom:true'
      collection = collection.sort((a, b) => {
        return !a.custom ? -1 : !b.custom ? 1 : -1;
      });
      return collection;
    } catch (error) {
      return collection;
    }
  }

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
      });
    }
  }
}
