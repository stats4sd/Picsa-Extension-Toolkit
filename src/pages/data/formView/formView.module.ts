import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { FormViewPage } from "./formView.page";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";
import { ComponentsModule } from "src/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: FormViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateSharedLazyModuleModule,
    ComponentsModule
  ],
  declarations: [FormViewPage]
})
export class FormViewPageModule {}
