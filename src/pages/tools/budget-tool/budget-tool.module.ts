import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetToolPage } from './budget-tool';

@NgModule({
  declarations: [
    BudgetToolPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetToolPage),
  ],
  exports: [
    BudgetToolPage
  ]
})
export class BudgetToolPageModule {}
