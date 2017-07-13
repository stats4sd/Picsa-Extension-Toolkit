import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormPopupPage } from './form-popup';

@NgModule({
  declarations: [
    FormPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(FormPopupPage),
  ],
  exports: [
    FormPopupPage
  ]
})
export class FormPopupPageModule {}
