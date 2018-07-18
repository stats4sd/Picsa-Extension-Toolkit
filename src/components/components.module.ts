import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { LanguageSelectComponent } from "./language-select/language-select";
import { UserGroupComponent } from "./user-group/user-group";
import { WhatsappGroupComponent } from "./whatsapp-group/whatsapp-group";

@NgModule({
  declarations: [
    UserGroupComponent,
    WhatsappGroupComponent,
    LanguageSelectComponent
  ],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [UserGroupComponent, WhatsappGroupComponent, LanguageSelectComponent]
})
export class ComponentsModule {}
