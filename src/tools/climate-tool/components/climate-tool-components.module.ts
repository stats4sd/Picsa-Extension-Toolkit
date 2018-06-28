import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { CombinedProbabilityComponent } from "./combined-probability/combined-probability";
import { SiteSelectComponent } from "./site-select/site-select";

@NgModule({
  declarations: [CombinedProbabilityComponent, SiteSelectComponent],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [CombinedProbabilityComponent, SiteSelectComponent]
})
export class ClimateToolComponentsModule {}
