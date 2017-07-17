import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSelectPage } from './card-select';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

@NgModule({
  declarations: [
    CardSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CardSelectPage),
    CanvasWhiteboardModule
  ],
  exports: [
    CardSelectPage
  ]
})
export class BudgetCardSelectPageModule {}
