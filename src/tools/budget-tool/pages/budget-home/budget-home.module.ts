import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { BudgetHomePage } from "./budget-home.page";
import { TranslateSharedLazyModuleModule } from "src/app/shared/translate-shared-lazy-module.module";
import { BudgetToolComponentsModule } from "../../components/budget-tool.components";

const routes: Routes = [
  {
    path: "",
    component: BudgetHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateSharedLazyModuleModule,
    BudgetToolComponentsModule
  ],
  declarations: [BudgetHomePage]
})
export class BudgetHomePageModule {}
