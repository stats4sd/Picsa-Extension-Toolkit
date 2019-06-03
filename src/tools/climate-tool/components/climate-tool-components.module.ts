import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { ClimateChartComponent } from "./climate-chart/climate-chart";
import { CombinedProbabilityComponent } from "./combined-probability/combined-probability";
import { SiteSelectComponent } from "./site-select/site-select";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ClimateChartComponent,
    CombinedProbabilityComponent,
    SiteSelectComponent
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    TranslateSharedLazyModuleModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    ClimateChartComponent,
    CombinedProbabilityComponent,
    SiteSelectComponent
  ]
})
export class ClimateToolComponentsModule {}
