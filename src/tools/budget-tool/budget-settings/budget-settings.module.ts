import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetSettingsPage } from './budget-settings';

@NgModule({
  declarations: [
    BudgetSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetSettingsPage),
  ],
  exports: [
    BudgetSettingsPage
  ]
})
export class BudgetSettingsPageModule {}
