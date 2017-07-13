import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetCardPage } from './budget-card';

@NgModule({
  declarations: [
    BudgetCardPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetCardPage),
  ],
  exports: [
    BudgetCardPage
  ]
})
export class BudgetCardPageModule {}
