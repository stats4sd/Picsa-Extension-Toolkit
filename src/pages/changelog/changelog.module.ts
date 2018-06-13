import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangelogPage } from './changelog';

@NgModule({
  declarations: [
    ChangelogPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangelogPage),
  ],
})
export class ChangelogPageModule {}
