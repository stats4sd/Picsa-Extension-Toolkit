import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { Observable } from "rxjs";
import { IBudget } from "../budget-tool.models";
import { BudgetToolProvider } from "../budget-tool.provider";

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-budget-tool",
  templateUrl: "budget-tool.html"
})
export class BudgetToolPage {
  @select(["budget"])
  readonly budget$: Observable<IBudget>;
  @select(["budget", "active", "view"])
  readonly view$: Observable<string>;

  constructor(private budgetPrvdr: BudgetToolProvider) {}
}
