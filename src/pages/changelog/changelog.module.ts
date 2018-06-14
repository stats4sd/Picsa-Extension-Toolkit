import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { ChangelogPage } from "./changelog";

@NgModule({
  declarations: [ChangelogPage],
  imports: [
    IonicPageModule.forChild(ChangelogPage),
    ComponentsModule,
    TranslateModule.forChild()
  ]
})
export class ChangelogPageModule {}
