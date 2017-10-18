import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
// Ionic native modules
import { SplashScreen } from '@ionic-native/splash-screen';

import { Network} from '@ionic-native/network';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { FileOpener } from '@ionic-native/file-opener';
// App pages
import { MyApp } from './app.component';
// Angular firestore
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
// Providers
import {KoboApi} from "../providers/kobo-api";
// import {FileService} from "../providers/file-service";
import {YoutubeService} from '../providers/youtube-service';
import { C3ChartProvider } from '../providers/c3-chart/c3-chart';
import { ForumServiceProvider } from '../providers/forum-service/forum-service';
import { MalawiDataProvider } from '../providers/c3-chart/malawi-data';
import { BudgetToolProvider } from '../providers/budget-tool/budget-tool';
import { StorageProvider } from '../providers/storage/storage';
import { NetworkProvider } from '../providers/network/network';


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHzsaVc4TuG3QMFjI_SKP1Px-E5QRglcM",
  authDomain: "extension-toolkit.firebaseapp.com",
  databaseURL: "https://extension-toolkit.firebaseio.com",
  storageBucket: "extension-toolkit.appspot.com",
  messagingSenderId: "249750594240"
***REMOVED***

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    IonicStorageModule.forRoot({
      name: '__picsa',
  ***REMOVED***),
    BrowserModule,
    HttpModule,
    CanvasWhiteboardModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],

  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    KoboApi,
    YoutubeService,
    // FileService,
    SplashScreen,
    C3ChartProvider,
    Network,
    ForumServiceProvider,
    MalawiDataProvider,
    BudgetToolProvider,
    StorageProvider,
    FileOpener,
    File,
    NetworkProvider
    ]

})
export class AppModule {}
