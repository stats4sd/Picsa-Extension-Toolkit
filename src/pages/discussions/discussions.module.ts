import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DiscussionsPage } from "./discussions";

@NgModule({
  declarations: [DiscussionsPage],
  imports: [IonicPageModule.forChild(DiscussionsPage)],
  exports: [DiscussionsPage]
})
export class ForumPageModule {}
