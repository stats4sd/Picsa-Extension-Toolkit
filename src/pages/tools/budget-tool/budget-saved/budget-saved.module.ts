import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetSavedPage } from './budget-saved';

@NgModule({
  declarations: [
    BudgetSavedPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetSavedPage),
  ],
  exports: [
    BudgetSavedPage
  ]
})
export class BudgetSavedPageModule {}
