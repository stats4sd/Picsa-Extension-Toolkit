import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { WhatsappGroupComponent } from "./whatsapp-group/whatsapp-group";
import { LanguageSelectComponent } from './language-select/language-select';

@NgModule({
  declarations: [WhatsappGroupComponent,
    LanguageSelectComponent],
  imports: [IonicModule],
  exports: [WhatsappGroupComponent,
    LanguageSelectComponent]
})
export class ComponentsModule {}
