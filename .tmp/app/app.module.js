import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PicsaManualPage } from '../pages/picsa-manual/picsa-manual';
export var AppModule = (function () {
    function AppModule() {
  ***REMOVED***
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyApp,
                        AboutPage,
                        HomePage,
                        TabsPage,
                        PicsaManualPage
                    ],
                    imports: [
                        IonicModule.forRoot(MyApp)
                    ],
                    bootstrap: [IonicApp],
                    entryComponents: [
                        MyApp,
                        AboutPage,
                        HomePage,
                        TabsPage,
                        PicsaManualPage
                    ],
                    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
              ***REMOVED***,] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map