import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { ViewDataPage } from "./view-data";

@NgModule({
  declarations: [ViewDataPage],
  imports: [IonicPageModule.forChild(ViewDataPage), TranslateModule.forChild()],
  exports: [ViewDataPage]
})
export class ViewDataPageModule {}
