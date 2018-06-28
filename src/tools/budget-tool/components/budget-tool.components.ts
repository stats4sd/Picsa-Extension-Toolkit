import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { BudgetSettingsComponent } from "./budget-settings/budget-settings";
import { CardSelectComponent } from "./card-select/card-select";

@NgModule({
  declarations: [BudgetSettingsComponent, CardSelectComponent],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [BudgetSettingsComponent, CardSelectComponent]
})
export class BudgetToolComponentsModule {}
