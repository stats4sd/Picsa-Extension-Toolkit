import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";
import { ChangelogPage } from "./changelog";

@NgModule({
  declarations: [ChangelogPage],
  imports: [IonicPageModule.forChild(ChangelogPage), ComponentsModule]
})
export class ChangelogPageModule {}
