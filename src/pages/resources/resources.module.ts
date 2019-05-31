import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ResourcesPage } from "./resources.page";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";

const routes: Routes = [
  {
    path: "",
    component: ResourcesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxYoutubePlayerModule,
    TranslateSharedLazyModuleModule
  ],
  declarations: [ResourcesPage]
})
export class ResourcesPageModule {}
