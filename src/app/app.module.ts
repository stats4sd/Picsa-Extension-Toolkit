import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
// Ionic native modules
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Network} from '@ionic-native/network';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
// App pages
import { MyApp } from './app.component';
// Angular fire 2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';
// Providers
import {KoboApi} from "../providers/kobo-api";
import {FileService} from "../providers/file-service";
import {YoutubeService} from '../providers/youtube-service';
import { C3ChartProvider } from '../providers/c3-chart/c3-chart';
import { ForumServiceProvider } from '../providers/forum-service/forum-service';
import { MalawiDataProvider } from '../providers/c3-chart/malawi-data';
import { BudgetToolProvider } from '../providers/budget-tool/budget-tool';
import { StorageProvider } from '../providers/storage/storage';


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
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireOfflineModule,
    IonicStorageModule.forRoot({
      name: '__picsa',
    }),
    BrowserModule,
    HttpModule,
    CanvasWhiteboardModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // QandAPage,
    // TabsPage,
    // PicsaManualPage,
    // ViewDataPage,
    // RecordDataPage,
    // FormPopup,
    // ForumPage,
    // VideosPage,
    // ForumDiscussionPage,
    // ClimateToolPage,
    // BudgetToolPage,
    // IframePage,
    // ToolsPage,
  ],

  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    KoboApi,
    YoutubeService,
    FileService,
    SplashScreen,
    File,
    C3ChartProvider,
    Network,
    ForumServiceProvider,
    MalawiDataProvider,
    BudgetToolProvider,
    StorageProvider]

})
export class AppModule {}
