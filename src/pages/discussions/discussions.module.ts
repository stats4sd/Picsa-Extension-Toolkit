import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { DiscussionsPage } from "./discussions";

@NgModule({
  declarations: [DiscussionsPage],
  imports: [
    IonicPageModule.forChild(DiscussionsPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
  exports: [DiscussionsPage]
})
export class ForumPageModule {}
