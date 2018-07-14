import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { BudgetCardImageComponent } from "./budget-card-image/budget-card-image";
import { BudgetCardComponent } from "./budget-card/budget-card";
import { BudgetCellEditComponent } from "./budget-cell-edit/budget-cell-edit";
import { BudgetCellComponent } from "./budget-cell/budget-cell";
import { BudgetLoadComponent } from "./budget-load/budget-load";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview";
import { BudgetSettingsComponent } from "./budget-settings/budget-settings";
import { CardSelectComponent } from "./card-select/card-select";

@NgModule({
  declarations: [
    BudgetCardComponent,
    BudgetCardImageComponent,
    BudgetCellComponent,
    BudgetCellEditComponent,
    BudgetLoadComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ],
  imports: [IonicModule, TranslateModule.forChild(), CanvasWhiteboardModule],
  exports: [
    BudgetCardComponent,
    BudgetCardImageComponent,
    BudgetCellComponent,
    BudgetCellEditComponent,
    BudgetLoadComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ]
})
export class BudgetToolComponentsModule {}
