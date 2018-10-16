import { select } from "@angular-redux/store";
import { Component, OnDestroy } from "@angular/core";
import { Events, IonicPage } from "ionic-angular";
import { Observable, Subject } from "rxjs";
import { TranslationsProvider } from "../../../providers/translations";
import { BudgetToolActions } from "../budget-tool.actions";
import { IBudget, IBudgetView } from "../budget-tool.models";

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-budget-tool",
  templateUrl: "budget-tool.html"
})
export class BudgetToolPage implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
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
    private translations: TranslationsProvider,
    private actions: BudgetToolActions,
    private events: Events
  ) {
    // show load screen when first opened
    this.actions.setBudgetView({ component: "load", title: "Budget Tool" });
    this.actions.setActiveBudget(null);
    this.budget$
      .takeUntil(this.componentDestroyed)
      .subscribe(budget => (this.budget = budget));
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  async setView(view: IBudgetView) {
    console.log("setting view", view);
    const title = view.title
      ? await this.translations.translateText(view.title)
      : this.budget.title;
    this.actions.setBudgetView({
      component: view.component,
      title: title,
      meta: null
    });
    if (view.component == "overview") {
      this.events.publish("calculate:budget");
    }
  }
}
