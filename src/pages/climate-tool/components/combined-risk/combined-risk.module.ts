import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombinedRiskComponent } from './combined-risk';

@NgModule({
  declarations: [
    CombinedRiskComponent,
  ],
  imports: [
    IonicPageModule.forChild(CombinedRiskComponent),
  ],
  exports: [
    CombinedRiskComponent
  ]
})
export class CombinedRiskComponentModule {}
