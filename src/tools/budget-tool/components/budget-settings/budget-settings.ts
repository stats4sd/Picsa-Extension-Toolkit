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
  }

  // various listeners for budget change actions
  _addSubscribers() {
    this.enterpriseType$.subscribe(type => {
      this._filterEnterprises(type, this.allEnterprises);
    });
    // update enterprise types and filter list when enterprises changes
    this.enterprises$.subscribe(enterprises => {
      if (enterprises) {
        this.allEnterprises = enterprises;
        this.enterpriseTypes = this._generateEnterpriseTypes(enterprises);
        const type = this.budget ? this.budget.enterpriseType : null;
        this._filterEnterprises(type, enterprises);
      }
    });
    // calculate time periods when new timescale specified
    this.timescale$.subscribe(scale => {
      if (scale) {
        this.calculatePeriod(scale);
      }
    });
    this.budget$.subscribe(budget => {
      this.budget = budget;
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
  // if there is only one sub type assume that is the one selected (unless other/custom)
  _filterEnterprises(type: string, enterprises: IBudgetCard[]) {
    this.showIndividualEnterprises = false;
    if (type) {
      enterprises = enterprises.filter(e => {
        return e.group === type;
      });
      this.filteredEnterprises = enterprises;
      if (type == "other") {
        this.showIndividualEnterprises = true;
      } else {
        // when only one result set it as type
        if (enterprises.length == 1) {
          this.budgetPrvdr.patchBudget("enterprise", enterprises[0].id);
        } else {
          this.showIndividualEnterprises = true;
          this.budgetPrvdr.patchBudget("enterprise", null);
        }
      }
    } else {
      this.budgetPrvdr.patchBudget("enterprise", null);
    }
  }

  nextSlide() {
    this.slides.slideNext();
  }

  viewBudget() {
    this.budget.view = "overview";
    this.actions.setActiveBudget(this.budget);
  }

  calculatePeriod(timescale) {
    const budget = this.ngRedux.getState().budget.active;
    // return array representing time periods
    const starting = budget.periods.starting;
    const total = budget.periods.total;
    let arr = [];
    if (timescale == "months") {
      budget.periods.total = 12;
      budget.periods.starting = "Jan";
      arr = this.calculatePeriodMonths(total, starting);
    }
    if (timescale == "days") {
      budget.periods.starting = "Mon";
      budget.periods.total = 7;
      arr = this.calculatePeriodDays(total, starting);
    }
    if (timescale == "weeks") {
      budget.periods.starting = null;
      budget.periods.total = 4;
      arr = this.calculatePeriodConsecutive(total, "week");
    }
    if (timescale == "none") {
      arr = this.calculatePeriodConsecutive(total);
    }
    budget.periods.labels = arr;
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

  // createDataTemplates(labels) {
  //   const arr = [];
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
}
