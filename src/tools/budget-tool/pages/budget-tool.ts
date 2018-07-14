import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Observable } from "rxjs";
import { BudgetToolActions } from "../budget-tool.actions";
import { IBudget, IBudgetView } from "../budget-tool.models";
import { BudgetToolProvider } from "../budget-tool.provider";

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-budget-tool",
  templateUrl: "budget-tool.html"
})
export class BudgetToolPage {
  @select(["budget", "active"])
  readonly budget$: Observable<IBudget>;
  @select(["budget", "view", "component"])
  readonly viewComponent$: Observable<string>;
  @select(["budget", "view", "title"])
  readonly title$: Observable<string>;
  budget: IBudget;
  views: IBudgetView[] = [
    { component: "overview", title: null, icon: "apps" },
    { component: "settings", title: "Settings", icon: "settings" },
    { component: "export", title: "Share Budget", icon: "share" }
  ];
  constructor(
    private budgetPrvdr: BudgetToolProvider,
    private actions: BudgetToolActions
  ) {
    // show load screen when first opened
    this.actions.setBudgetView({ component: "load", title: "Budget Tool" });
    this.actions.setActiveBudget(null);
    this.budget$.subscribe(budget => (this.budget = budget));
  }

  setView(view: IBudgetView) {
    const title = view.title ? view.title : this.budget.title;
    this.actions.setBudgetView({
      component: view.component,
      title: title,
      meta: null
    });
  }
}
