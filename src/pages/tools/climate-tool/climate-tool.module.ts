import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClimateToolPage } from './climate-tool';
import { ClimateToolComponentsModule } from './components/climate-tool-components.module'

@NgModule({
  declarations: [
    ClimateToolPage,
  ],
  imports: [
    IonicPageModule.forChild(ClimateToolPage),
    ClimateToolComponentsModule
  ],
  exports: [
    ClimateToolPage
  ]
})
export class ClimateToolPageModule {}
