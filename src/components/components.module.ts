import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "ionic-angular";
import { LanguageSelectComponent } from "./language-select/language-select";
import { WhatsappGroupComponent } from "./whatsapp-group/whatsapp-group";

@NgModule({
  declarations: [WhatsappGroupComponent, LanguageSelectComponent],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [WhatsappGroupComponent, LanguageSelectComponent]
})
export class ComponentsModule {}
