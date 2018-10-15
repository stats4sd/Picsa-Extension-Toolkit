import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Events, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudget } from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";
import { defaults } from "../../data";

@Component({
  selector: "budget-load",
  templateUrl: `budget-load.html`
})
export class BudgetLoadComponent {
  apiVersion = 2;
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  @select(["user", "budgets"])
  savedBudgets$: Observable<IBudget[]>;
  savedBudgets: IBudget[];
  showArchived: boolean;
  constructor(
    public actions: BudgetToolActions,
    private events: Events,
    private toastCtrl: ToastController,
    private budgetPrvdr: BudgetToolProvider
  ) {}
  ngOnInit() {
    this.savedBudgets$.subscribe(budgets => {
      if (budgets) {
        this.savedBudgets = _jsonObjectValues(budgets);
        console.log("saved budgets", budgets);
      }
    });
  }
  startNew() {
    const budget: IBudget = {
      apiVersion: this.apiVersion,
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
      }
    };
    this.actions.setActiveBudget(budget);
    this.actions.setBudgetView({
      component: "settings",
      title: "Settings"
    });
    // publish event to force card list update
    this.events.publish("load:budget");
  }
  loadBudget(budget: IBudget) {
    this.actions.setActiveBudget(budget);
    this.actions.setBudgetView({
      component: "overview",
      title: budget.title
    });
    this.events.publish("calculate:budget");
    // publish event to force card list update
    this.events.publish("load:budget");
  }
  archiveBudget(budget: IBudget) {
    budget.archived = true;
    this.toastCtrl
      .create({
        message: "Budget archived",
        duration: 3000
      })
      .present();
    this.budgetPrvdr.saveBudget(budget);
  }
  restoreBudget(budget: IBudget) {
    budget.archived = false;
    this.toastCtrl
      .create({
        message: "Budget restored",
        duration: 3000
      })
      .present();
    this.budgetPrvdr.saveBudget(budget);
  }
  showArchivedBudgets() {
    this.showArchived = true;
  }

  /*
  <button padding icon-left ion-button color="danger" (click)="archive(b)">
              <ion-icon name="trash"></ion-icon>Archive</button>
              */

  // archive(budget) {
  //   // console.log("archiving budget", budget);
  //   // budget.archived = true;
  //   // this.storagePrvdr
  //   //   .saveUserDoc(budget, true, "budgets", budget._key)
  //   //   .then(() => {
  //   //     this.loadSavedBudgets();
  //   //     const toast = this.toastCtrl.create({
  //   //       message: "Budget Archived",
  //   //       duration: 3000
  //   //     });
  //   //     toast.present();
  //   //   });
  // }

  getSavedBudgets() {
    // load saved budgets from cache
    // this.storagePrvdr.getAll("budgets").then(res => {
    //   const arr = [];
    //   for (const key in res) {
    //     let budget = res[key];
    //     if (budget.archived) {
    //       this.archived.push(budget);
    //     } else {
    //       if (!budget.hasOwnProperty("title")) {
    //         budget = this.upgradeBudget(budget);
    //       }
    //       arr.push(budget);
    //     }
    //   }
    //   this.saved = arr.reverse();
    //   console.log("saved budgets", this.saved);
    // });
  }
}

function _jsonObjectValues(json: any) {
  const values = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      values.push(json[key]);
    }
  }
  return values;
}
