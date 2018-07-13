import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { Slides, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { BudgetToolActions } from "../../../../tools/budget-tool/budget-tool.actions";
import {
  IBudget,
  IBudgetCard,
  ICustomBudgetCard
} from "../../budget-tool.models";
import { DAYS, defaults, MONTHS } from "../../data";

@Component({
  selector: "budget-settings",
  templateUrl: "budget-settings.html"
})
export class BudgetSettingsComponent {
  apiVersion: 2;
  @select(["user", "budgets"])
  savedBudgets$: Observable<IBudget[]>;
  @select(["budget", "active", "enterpriseType"])
  enterpriseType$: Observable<string>;
  @select(["budget", "active"])
  budget$: Observable<IBudget>;
  @select(["budget", "active", "enterprise"])
  enterprise$: Observable<string>;
  @select(["budget", "meta", "enterprises"])
  enterprises$: Observable<ICustomBudgetCard[]>;
  allEnterprises: IBudgetCard[] = [];
  filteredEnterprises: IBudgetCard[] = [];
  showIndividualEnterprises: boolean;
  timeScales = ["days", "weeks", "months"];

  savedBudgets: IBudget[] = [];
  newBudget: boolean;
  enterpriseTypes: IBudgetCard[] = [];
  budget: IBudget;
  months: any;
  days: any;
  @ViewChild(Slides) slides: Slides;

  constructor(
    public toastCtrl: ToastController,
    private actions: BudgetToolActions
  ) {
    this.budget$.subscribe(budget => {
      this.budget = budget;
    });
    this.savedBudgets$.subscribe(budgets => {
      if (budgets) {
        this.savedBudgets = budgets;
      }
    });
    this.enterpriseType$.subscribe(type => {
      this._filterEnterprises(type, this.allEnterprises);
    });
    this.enterprises$.subscribe(enterprises => {
      if (enterprises) {
        this.allEnterprises = enterprises;
        this.enterpriseTypes = this._generateEnterpriseTypes(enterprises);
        this._filterEnterprises(null, enterprises);
      }
    });
  }

  // iterate over enterprises and populate groups that exist
  // always populate the 'other/custom' group
  _generateEnterpriseTypes(enterprises: IBudgetCard[]) {
    const groups: any = { other: true };
    enterprises.forEach(enterprise => {
      groups[enterprise.group] = true;
    });
    // convert to array and move 'other' group to end
    const types: string[] = Object.keys(groups);
    types.push(types.splice(types.indexOf("other"), 1)[0]);
    // finally convert to standard budget card format
    const typeCards: IBudgetCard[] = types.map(type => {
      return {
        id: type,
        name: type
      };
    });
    return typeCards;
  }
  // when enterprise type changed only show relevant enterprises
  // if there is only one sub type assume that is the one selected
  _filterEnterprises(type: string, enterprises: IBudgetCard[]) {
    this.showIndividualEnterprises = false;
    if (type) {
      enterprises = enterprises.filter(e => {
        return e.group === type;
      });
      this.filteredEnterprises = enterprises;
      if (enterprises.length == 1 && type != "other") {
        this.setBudget("enterprise", enterprises[0].id);
      } else {
        this.showIndividualEnterprises = true;
      }
    } else {
      // if cards have been updated want to refilter but with same type selected
      if (this.budget && this.budget.enterpriseType) {
        this._filterEnterprises(this.budget.enterpriseType, enterprises);
      }
    }
  }
  // assign budget value, unsetting if already exists (duplicate of budget card function)
  setBudget(key, val) {
    if (this.budget[key] === val) {
      this.budget[key] = null;
    } else {
      this.budget[key] = val;
    }
    this.actions.setActiveBudget(this.budget);
  }

  startNew() {
    const d = new Date();
    const budget: IBudget = {
      apiVersion: this.apiVersion,
      archived: false,
      created: d.toLocaleDateString(),
      data: null,
      description: null,
      enterprise: null,
      id: null,
      periods: defaults.periods.days,
      title: null,
      scale: null,
      enterpriseType: null
    };
    this.budget = budget;
    this.actions.setActiveBudget(budget);
    this.calculatePeriod();
    this.newBudget = true;
    this.slides.slideNext();
  }

  nextSlide() {
    this.slides.slideNext();
  }

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
  }
  // createDataTemplates(labels) {
  //   const arr = [];
  //   console.log("creating templates");
  //   labels.forEach((label, i) => {
  //     arr.push({
  //       label: label,
  //       index: i,
  //       activities: [],
  //       inputs: [],
  //       outputs: [],
  //       familyLabour: { people: 0, days: 0 },
  //       balance: {
  //         inputs: {
  //           total: 0,
  //           dots: []
  //         },
  //         outputs: {
  //           total: 0,
  //           dots: []
  //         },
  //         consumed: {
  //           total: 0,
  //           dots: []
  //         },
  //         monthly: {
  //           total: 0,
  //           dots: []
  //         },
  //         running: {
  //           total: 0,
  //           dots: []
  //         }
  //       }
  //     });
  //   });
  //   return arr;
  // }
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
  //   //     });
  //   //     toast.present();
  //   //   });
  // }

  calculatePeriod() {
    // return array representing time periods
    const timeScale = this.budget.periods.scale;
    const starting = this.budget.periods.starting;
    const total = this.budget.periods.total;
    let arr = [];
    if (timeScale == "months") {
      arr = this.calculatePeriodMonths(total, starting);
    }
    if (timeScale == "days") {
      arr = this.calculatePeriodDays(total, starting);
    }
    if (timeScale == "weeks") {
      arr = this.calculatePeriodConsecutive(total, "week");
    }
    if (timeScale == "none") {
      arr = this.calculatePeriodConsecutive(total);
    }
    this.budget.periods.labels = arr;
  }
  calculatePeriodConsecutive(total, prefix?) {
    if (!prefix) {
      prefix = "";
    }
    const arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push(prefix + i);
    }
    return arr;
  }
  calculatePeriodMonths(total, starting) {
    let array = MONTHS;
    if (starting) {
      const startIndex = MONTHS.indexOf(starting);
      for (let i = 0; i < startIndex; i++) {
        array.push(array.shift());
      }
    }
    if (total > array.length) {
      for (let i = 0; i < Math.ceil(total / array.length); i++) {
        array = array.concat(array);
      }
    }
    return array.slice(0, total);
  }
  calculatePeriodDays(total, starting) {
    let array = DAYS;
    if (starting) {
      const startIndex = DAYS.indexOf(starting);
      for (let i = 0; i < startIndex; i++) {
        array.push(array.shift());
      }
    }
    if (total > array.length) {
      for (let i = 0; i < Math.ceil(total / array.length); i++) {
        array = array.concat(array);
      }
    }
    return array.slice(0, total);
  }
}
