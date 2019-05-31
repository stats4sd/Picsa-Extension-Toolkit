import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ClimateToolPage } from "./climate-tool.page";
import { ClimateToolComponentsModule } from "../components/climate-tool-components.module";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";

const routes: Routes = [
  {
    path: "",
    component: ClimateToolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClimateToolComponentsModule,
    TranslateSharedLazyModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClimateToolPage]
})
export class ClimateToolPageModule {}
