import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { YoutubePlayerModule } from "ngx-youtube-player";
import { ComponentsModule } from "../../components/components.module";
import { ChangelogPage } from "./changelog";

@NgModule({
  declarations: [ChangelogPage],
  imports: [
    IonicPageModule.forChild(ChangelogPage),
    ComponentsModule,
    TranslateModule.forChild(),
    YoutubePlayerModule
  ]
})
export class ChangelogPageModule {}
