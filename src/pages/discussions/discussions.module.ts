import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { DiscussionsPage } from "./discussions";

@NgModule({
  declarations: [DiscussionsPage],
  imports: [IonicPageModule.forChild(DiscussionsPage), ComponentsModule],
  exports: [DiscussionsPage]
})
export class ForumPageModule {}
