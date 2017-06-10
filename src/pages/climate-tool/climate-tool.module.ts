import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClimateToolPage } from './climate-tool';

@NgModule({
  declarations: [
    ClimateToolPage,
  ],
  imports: [
    IonicPageModule.forChild(ClimateToolPage),
  ],
  exports: [
    ClimateToolPage
  ]
})
export class ClimateToolPageModule {}
