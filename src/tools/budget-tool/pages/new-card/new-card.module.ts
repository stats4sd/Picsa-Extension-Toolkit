import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { BudgetNewCardPage } from "./new-card";

@NgModule({
  declarations: [BudgetNewCardPage],
  imports: [IonicPageModule.forChild(BudgetNewCardPage), CanvasWhiteboardModule]
})
export class ModalPageModule {}
