import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicsaManualPage } from './picsa-manual';

@NgModule({
    declarations: [
        PicsaManualPage,
    ],
    imports: [
        IonicPageModule.forChild(PicsaManualPage),
    ],
    exports: [
        PicsaManualPage
    ]
})
export class PicsaManualPageModule { }
