import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
// Ionic native modules
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
// App pages
import { MyApp } from './app.component';
import { QandAPage } from '../pages/qanda/qanda';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PicsaManualPage } from '../pages/picsa-manual/picsa-manual';
import { RecordDataPage } from '../pages/record-data/record-data';
import { ViewDataPage } from '../pages/view-data/view-data';
import { FormPopup } from "../pages/record-data/form-popup/form-popup";
import { ForumPage } from "../pages/qanda/forum/forum";
import { ForumDiscussionPage } from "../pages/qanda/forum/forum-discussion-page/forum-discussion-page";
import { VideosPage } from "../pages/qanda/videos/videos";
// Angular fire 2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// Providers
import {KoboApi} from "../providers/kobo-api";
import {FileService} from "../providers/file-service";
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
    ForumDiscussionPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot({
      name: '__picsa',
    }),
    BrowserModule,
    HttpModule
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

  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, KoboApi, YoutubeService, AngularFireService, FileService, SplashScreen, File]

})
export class AppModule {}
