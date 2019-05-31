import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ErrorPage } from "./error.page";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";

const routes: Routes = [
  {
    path: "",
    component: ErrorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateSharedLazyModuleModule
  ],
  declarations: [ErrorPage]
})
export class ErrorPageModule {}
