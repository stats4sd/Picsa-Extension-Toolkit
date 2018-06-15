import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { ClimateToolPage } from "./climate-tool";
import { ClimateToolComponentsModule } from "./components/climate-tool-components.module";

@NgModule({
  declarations: [ClimateToolPage],
  imports: [
    IonicPageModule.forChild(ClimateToolPage),
    ClimateToolComponentsModule,
    TranslateModule.forChild()
  ],
  exports: [ClimateToolPage]
})
export class ClimateToolPageModule {}
