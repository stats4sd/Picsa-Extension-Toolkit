import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { BudgetToolPage } from "./budget-tool";
import { BudgetToolComponentsModule } from "./components/budget-tool.components";

@NgModule({
  declarations: [BudgetToolPage],
  imports: [
    IonicPageModule.forChild(BudgetToolPage),
    BudgetToolComponentsModule,
    TranslateModule.forChild()
  ],
  exports: [BudgetToolPage]
})
export class BudgetToolPageModule {}
