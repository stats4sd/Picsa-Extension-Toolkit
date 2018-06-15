import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { SiteSelectPage } from "./site-select";

@NgModule({
  declarations: [SiteSelectPage],
  imports: [
    IonicPageModule.forChild(SiteSelectPage),
    TranslateModule.forChild()
  ],
  exports: [SiteSelectPage]
})
export class SiteSelectPageModule {}
