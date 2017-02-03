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
import {FileService} from "../providers/file-service";
import {FormPopup} from "../pages/record-data/form-popup/form-popup";
import {ForumPage} from "../pages/qanda/forum/forum";
import {ForumDiscussionPage} from "../pages/qanda/forum/forum-discussion-page/forum-discussion-page";
import {VideosPage} from "../pages/qanda/videos/videos";
import {YoutubeService} from '../providers/youtube-service';
import {AngularFireService} from '../providers/angular-fire-service';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHzsaVc4TuG3QMFjI_SKP1Px-E5QRglcM",
  authDomain: "extension-toolkit.firebaseapp.com",
  databaseURL: "https://extension-toolkit.firebaseio.com",
  storageBucket: "extension-toolkit.appspot.com",
  messagingSenderId: "249750594240"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    QandAPage,
    HomePage,
    TabsPage,
    PicsaManualPage,
    ViewDataPage,
    RecordDataPage,
    FormPopup,
    ForumPage,
    VideosPage,
    ForumDiscussionPage
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
    FormPopup,
    ForumPage,
    VideosPage,
    ForumDiscussionPage
  ],
<<<<<<< HEAD
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, KoboApi, Storage, FileService]
=======
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, KoboApi, Storage, YoutubeService, AngularFireService]
>>>>>>> d472e0482f5e9fbe4e02d336cff84aa86cf7cc88
})
export class AppModule {}
