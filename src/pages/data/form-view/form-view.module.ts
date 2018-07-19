import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../../components/components.module";
import { FormViewPage } from "./form-view";

@NgModule({
  declarations: [FormViewPage],
  imports: [IonicPageModule.forChild(FormViewPage), ComponentsModule]
})
export class FormViewPageModule {}
