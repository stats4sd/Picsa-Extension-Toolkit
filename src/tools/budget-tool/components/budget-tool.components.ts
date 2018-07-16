import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { BudgetCardImageComponent } from "./budget-card-image/budget-card-image";
import { BudgetCardListComponent } from "./budget-card-list/budget-card-list";
import { BudgetCardComponent } from "./budget-card/budget-card";
import { BudgetDataCardComponent } from "./budget-card/budget-data-card";
import { BudgetMetaCardComponent } from "./budget-card/budget-meta-card";
import { BudgetNewCardComponent } from "./budget-card/budget-new-card";
import { BudgetCellComponent } from "./budget-cell/budget-cell";
import { BudgetLoadComponent } from "./budget-load/budget-load";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview";
import { BudgetSettingsComponent } from "./budget-settings/budget-settings";
import { CardSelectComponent } from "./card-select/card-select";

@NgModule({
  declarations: [
    BudgetCardComponent,
    BudgetNewCardComponent,
    BudgetDataCardComponent,
    BudgetMetaCardComponent,
    BudgetCardImageComponent,
    BudgetCardListComponent,
    BudgetCellComponent,
    BudgetLoadComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ],
  imports: [IonicModule, TranslateModule.forChild(), CanvasWhiteboardModule],
  exports: [
    BudgetCardComponent,
    BudgetNewCardComponent,
    BudgetDataCardComponent,
    BudgetMetaCardComponent,
    BudgetCardImageComponent,
    BudgetCardListComponent,
    BudgetCellComponent,
    BudgetLoadComponent,
    BudgetOverviewComponent,
    BudgetSettingsComponent,
    CardSelectComponent
  ]
})
export class BudgetToolComponentsModule {}
