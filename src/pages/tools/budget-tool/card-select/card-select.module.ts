import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSelectPage } from './card-select';

@NgModule({
  declarations: [
    CardSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CardSelectPage),
  ],
  exports: [
    CardSelectPage
  ]
})
export class BudgetCardSelectPageModule {}
