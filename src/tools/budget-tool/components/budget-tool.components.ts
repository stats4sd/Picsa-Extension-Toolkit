import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { BudgetCardImageComponent } from "./budget-card-image/budget-card-image";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview";
import { BudgetSettingsComponent } from "./budget-settings/budget-settings";
import { CardSelectComponent } from "./card-select/card-select";

@NgModule({
  declarations: [
    BudgetCardImageComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ],
  imports: [IonicModule, TranslateModule.forChild(), CanvasWhiteboardModule],
  exports: [
    BudgetCardImageComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ]
})
export class BudgetToolComponentsModule {}
