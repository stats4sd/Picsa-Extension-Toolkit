import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { MyApp } from './app.component';
import { QandAPage } from '../pages/qanda/qanda';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PicsaManualPage } from '../pages/picsa-manual/picsa-manual';
import { RecordDataPage } from '../pages/record-data/record-data';
import { ViewDataPage } from '../pages/view-data/view-data';
// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {KoboApi} from "../providers/kobo-api";
import {FormPopup} from "../pages/record-data/form-popup/form-popup";
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHzsaVc4TuG3QMFjI_SKP1Px-E5QRglcM",
  authDomain: "extension-toolkit.firebaseapp.com",
  databaseURL: "https://extension-toolkit.firebaseio.com",
  storageBucket: "extension-toolkit.appspot.com",
  messagingSenderId: "249750594240"
***REMOVED***

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
***REMOVED***

@NgModule({
  declarations: [
    MyApp,
    QandAPage,
    HomePage,
    TabsPage,
    PicsaManualPage,
    ViewDataPage,
    RecordDataPage,
    FormPopup
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QandAPage,
    HomePage,
    TabsPage,
    PicsaManualPage,
    ViewDataPage,
    RecordDataPage,
    FormPopup
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, KoboApi, Storage]
})
export class AppModule {}
