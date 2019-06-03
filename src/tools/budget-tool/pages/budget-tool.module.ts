import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { BudgetToolPage } from "./budget-tool.page";
import { BudgetToolComponentsModule } from "../components/budget-tool.components";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";

const routes: Routes = [
  {
    path: "",
    component: BudgetToolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetToolComponentsModule,
    RouterModule.forChild(routes),
    TranslateSharedLazyModuleModule
  ],
  declarations: [BudgetToolPage]
})
export class BudgetToolPageModule {}
