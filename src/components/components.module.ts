import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { LanguageSelectComponent } from "./language-select/language-select";
import { UserGroupComponent } from "./user-group/user-group";
import { WhatsappGroupComponent } from "./whatsapp-group/whatsapp-group";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateSharedLazyModuleModule } from "../app/shared/translate-shared-lazy-module.module";

@NgModule({
  declarations: [
    UserGroupComponent,
    WhatsappGroupComponent,
    LanguageSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateSharedLazyModuleModule
  ],
  exports: [UserGroupComponent, WhatsappGroupComponent, LanguageSelectComponent]
})
export class ComponentsModule {}
