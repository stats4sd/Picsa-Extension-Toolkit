import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { BudgetToolRoutingModule } from "./budget-tool-routing.module";
import { BudgetToolComponent } from "./budget-tool.component";

@NgModule({
  imports: [CommonModule, IonicModule, BudgetToolRoutingModule],
  declarations: [BudgetToolComponent],
  entryComponents: [],
  bootstrap: [BudgetToolComponent]
})
export class BudgetToolModule {}
