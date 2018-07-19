import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { RecordDataPage } from "./record-data";

@NgModule({
  declarations: [RecordDataPage],
  imports: [
    IonicPageModule.forChild(RecordDataPage),
    TranslateModule.forChild()
  ],
  exports: [RecordDataPage]
})
export class RecordDataPageModule {}
