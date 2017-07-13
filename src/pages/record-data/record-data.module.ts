import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordDataPage } from './record-data';

@NgModule({
  declarations: [RecordDataPage],
  imports: [
    IonicPageModule.forChild(RecordDataPage)    
  ],
  exports: [
    RecordDataPage
  ]
})
export class RecordDataPageModule {}
