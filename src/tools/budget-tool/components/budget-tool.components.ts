import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview";
import { BudgetSettingsComponent } from "./budget-settings/budget-settings";
import { CardSelectComponent } from "./card-select/card-select";

@NgModule({
  declarations: [
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ],
  imports: [IonicModule, TranslateModule.forChild(), CanvasWhiteboardModule],
  exports: [
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ]
})
export class BudgetToolComponentsModule {}
