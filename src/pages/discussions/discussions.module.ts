import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DiscussionsPage } from "./discussions.page";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";
import { ComponentsModule } from "src/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: DiscussionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    TranslateSharedLazyModuleModule
  ],
  declarations: [DiscussionsPage]
})
export class DiscussionsPageModule {}
