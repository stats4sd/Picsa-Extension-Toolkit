import { select } from "@angular-redux/store";
import { Component, OnDestroy } from "@angular/core";
import { Events } from "@ionic/angular";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslationsProvider } from "../../../../providers/translations";
import { BudgetToolActions } from "../../budget-tool.actions";
import { IBudget } from "../../budget-tool.models";
import { BudgetToolProvider } from "../../budget-tool.provider";
import { BUDGET_API_VERSION, upgradeBudget } from "../../budget.upgrade";
import { defaults } from "../../data";
import { PB_MOCK_API_2, PB_MOCK_API_3 } from "../../mocks/budget.mocks";
import REGIONAL_SETTINGS from "src/environments/region";

@Component({
  selector: "budget-load",
  templateUrl: `budget-load.html`
})
export class BudgetLoadComponent implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
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
    private translations: TranslationsProvider
  ) {}
  ngOnInit() {
    console.log("api version", this.apiVersion);
    this.savedBudgets$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(budgets => {
        if (budgets) {
          this.savedBudgets = _jsonObjectValues(budgets);
          console.log("saved budgets", budgets);
        }
      });
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
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
      dotValues: REGIONAL_SETTINGS.currencyCounters
    };
    this.actions.setActiveBudget(budget);
    this.actions.setBudgetView({
      component: "settings",
      title: "Settings"
    });
    // publish event to force card list update
    this.events.publish("load:budget");
  }
  async loadBudget(budget: IBudget) {
    const loader = await this.translations.createTranslatedLoader({
      message: "Preparing budget"
    });
    await loader.present();
    budget = this.checkForBudgetUpgrades(budget);
    this.actions.setActiveBudget(budget);
    this.actions.setBudgetView({
      component: "overview",
      title: budget.title
    });
    this.events.publish("calculate:budget");
    // publish event to force card list update
    this.events.publish("load:budget");
    // give small timeout to give appearance of smoother rendering
    setTimeout(async () => {
      await loader.dismiss();
    }, 1000);
  }
  // recursively go through budget and if api version less than current perform incremental upgrade
  checkForBudgetUpgrades(budget: IBudget) {
    console.log("checking for upgrade", budget.apiVersion, this.apiVersion);
    if (budget.apiVersion < this.apiVersion) {
      budget = upgradeBudget(budget);
      return this.checkForBudgetUpgrades(budget);
    } else {
      console.log("budget up to date");
      return budget;
    }
  }
  async archiveBudget(budget: IBudget) {
    budget.archived = true;
    const toast = await this.translations.createTranslatedToast({
      message: "Budget archived",
      duration: 3000
    });
    await this.budgetPrvdr.saveBudget(budget);
    await toast.present();
  }
  async restoreBudget(budget: IBudget) {
    budget.archived = false;
    const toast = await this.translations.createTranslatedToast({
      message: "Budget restored",
      duration: 3000
    });
    await this.budgetPrvdr.saveBudget(budget);
    await toast.present();
  }
  showArchivedBudgets() {
    this.showArchived = true;
  }
  _ADMIN_LoadBudgetMocks() {
    console.log("loading admin budget", this._adminBudgets);
    this.loadBudget(this._adminBudgets[0]);
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
