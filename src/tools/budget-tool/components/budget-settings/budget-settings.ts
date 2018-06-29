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
  // };
  @ViewChild(Slides) slides: Slides;

  constructor(
    private storagePrvdr: StorageProvider,
    public toastCtrl: ToastController,
    private actions: BudgetToolActions
  ) {
    this.budget$.subscribe(budget => {
      console.log("budget change", budget);
      this.budget = budget;
    });
    this.savedBudgets$.subscribe(budgets => {
      if (budgets) {
        this.savedBudgets = budgets;
      }
    });
    this.enterpriseType$.subscribe(type => {
      console.log("enterprise type change", type);
      this._filterEnterprises(type);
    });
    this.enterpriseTypes = this._generateEnterpriseTypes(data.enterprises);

    // this.enterprises = ["crop", "livestock", "livelihood"];
    // this.months = data.months;
    // this.days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    // this.timeScales = ["months", "weeks", "days", "none"];
    // this.budget.periods.labels = this.months;
    console.log("budget", this.budget);
  }

  _generateEnterpriseTypes(enterprises: IEnterpriseOptions[]) {
    const types = {};
    enterprises.forEach(enterprise => {
      types[enterprise.type] = true;
    });
    console.log("enterprise types", Object.keys(types));
    return Object.keys(types);
  }
  // when enterprise type changed only show relevant enterprises
  // if there is only one sub type assume that is the one selected
  _filterEnterprises(type: string) {
    console.log("filtering enterprises", type);
    let enterprises = data.enterprises;
    if (type) {
      enterprises = enterprises.filter(e => {
        return e.type === type;
      });
    }
    this.enterprises = enterprises;
    if (enterprises.length == 1) {
      this.setBudget("enterprise", enterprises[0]);
    }
  }
  // assign budget value, unsetting if already exists
  setBudget(key, val) {
    console.log("setting budget", key, val);
    if (this.budget[key] === val) {
      this.budget[key] = null;
    } else {
      this.budget[key] = val;
    }
    this.actions.set(this.budget);
  }

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
    };
    this.actions.createNew(budget);
    this.newBudget = true;
  }

  loadSaved() {}
  getSavedBudgets() {
    // load saved budgets from cache
    this.storagePrvdr.getAll("budgets").then(res => {
      const arr = [];
      for (const key in res) {
        let budget = res[key];
        if (budget.archived) {
          this.archived.push(budget);
        } else {
          if (!budget.hasOwnProperty("title")) {
            budget = this.upgradeBudget(budget);
          }
          arr.push(budget);
        }
      }
      this.saved = arr.reverse();
      console.log("saved budgets", this.saved);
    });
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
          },
          outputs: {
            total: 0,
            dots: []
          },
          consumed: {
            total: 0,
            dots: []
          },
          monthly: {
            total: 0,
            dots: []
          },
          running: {
            total: 0,
            dots: []
          }
        }
      });
    });
    return arr;
  }
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
    //     });
    //     toast.present();
    //   });
  }
  nextSlide() {
    this.slides.slideNext();
  }
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
    let array = this.months;
    if (starting) {
      const startIndex = this.months.indexOf(starting);
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
    let array = this.days;
    if (starting) {
      const startIndex = this.days.indexOf(starting);
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

  /************* legacy functions, to be removed in future updates *************/

  upgradeBudget(b) {
    console.log("upgrading budget b");
    if (!b.title) {
      b.title = b.name;
      delete b.name;
    }
    if (!b.periods) {
      b.periods = { labels: [], starting: 1, timeScale: "none", total: 12 };
    }
    return b;
  }
}
