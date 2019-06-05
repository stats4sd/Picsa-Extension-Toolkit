import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { BudgetHomePage } from "./pages/budget-home/budget-home.page";
import { BudgetToolRoutingModule } from "./budget-tool-routing.module";

@NgModule({
  imports: [CommonModule, IonicModule, BudgetToolRoutingModule],
  declarations: [BudgetHomePage],
  entryComponents: [],
  bootstrap: [BudgetHomePage]
})
export class BudgetToolModule {}
