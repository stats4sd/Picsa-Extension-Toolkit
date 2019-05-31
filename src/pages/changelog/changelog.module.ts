import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { IonicModule } from "@ionic/angular";
import { ChangelogPage } from "./changelog.page";
import { ComponentsModule } from "src/components/components.module";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";

const routes: Routes = [
  {
    path: "",
    component: ChangelogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateSharedLazyModuleModule,
    NgxYoutubePlayerModule
  ],
  declarations: [ChangelogPage]
})
export class ChangelogPageModule {}
