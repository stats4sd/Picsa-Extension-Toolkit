import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";
import { ErrorPage } from "./error";

@NgModule({
  declarations: [ErrorPage],
  imports: [IonicPageModule.forChild(ErrorPage), TranslateModule.forChild()]
})
export class ErrorPageModule {}
