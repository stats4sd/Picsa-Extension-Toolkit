import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteSelectPage } from './site-select';

@NgModule({
  declarations: [
    SiteSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SiteSelectPage),
  ],
  exports: [
    SiteSelectPage
  ]
})
export class SiteSelectPageModule {}
