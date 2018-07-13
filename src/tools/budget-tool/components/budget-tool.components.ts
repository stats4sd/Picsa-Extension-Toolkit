import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { BudgetCardImageComponent } from "./budget-card-image/budget-card-image";
import { BudgetCardComponent } from "./budget-card/budget-card";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview";
import { BudgetSettingsComponent } from "./budget-settings/budget-settings";
import { BudgetLoadComponent } from "./budget-settings/load-budget";
import { CardSelectComponent } from "./card-select/card-select";

@NgModule({
  declarations: [
    BudgetCardComponent,
    BudgetCardImageComponent,
    BudgetLoadComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ],
  imports: [IonicModule, TranslateModule.forChild(), CanvasWhiteboardModule],
  exports: [
    BudgetCardComponent,
    BudgetCardImageComponent,
    BudgetLoadComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ]
})
export class BudgetToolComponentsModule {}
