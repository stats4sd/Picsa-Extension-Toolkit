import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { ToolsPage } from "./tools";

@NgModule({
  declarations: [ToolsPage],
  imports: [IonicPageModule.forChild(ToolsPage), TranslateModule.forChild()],
  exports: [ToolsPage]
})
export class ToolsPageModule {}
