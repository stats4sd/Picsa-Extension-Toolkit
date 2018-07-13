/* tslint:disable:ordered-imports */
import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { BrowserModule } from "@angular/platform-browser";
// import { HttpModule, Http } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { File } from "@ionic-native/file";
// Ionic native modules
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { FileOpener } from "@ionic-native/file-opener";
import { StatusBar } from "@ionic-native/status-bar";
// App pages
import { MyApp } from "./app.component";
// Angular firestore
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
// Providers
import {
  FileService,
  FirestoreStorageProvider,
  NetworkProvider,
  StorageProvider,
  UserProvider,
  YoutubeService
} from "../providers/providers";
import { C3ChartProvider } from "../providers/c3-chart/c3-chart";
import { MalawiDataProvider } from "../providers/c3-chart/malawi-data";
// redux
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from "@angular-redux/store";
import { AppState, INITIAL_STATE, rootReducer } from "../reducers/reducers";
import { UserActions } from "../actions/user.actions";
// Tools
import { BudgetToolProvider } from "../tools/budget-tool/budget-tool.provider";
import { ClimateToolActions } from "../actions/climate-tool.actions";
import { BudgetToolActions } from "../tools/budget-tool/budget-tool.actions";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHzsaVc4TuG3QMFjI_SKP1Px-E5QRglcM",
  authDomain: "extension-toolkit.firebaseapp.com",
  databaseURL: "https://extension-toolkit.firebaseio.com",
  storageBucket: "extension-toolkit.appspot.com",
  messagingSenderId: "249750594240"
***REMOVED***

@NgModule({
  declarations: [MyApp],
  imports: [
    IonicModule.forRoot(MyApp, { preloadModules: true }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    IonicStorageModule.forRoot({
      name: "__picsa"
  ***REMOVED***),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    ***REMOVED***
  ***REMOVED***),
    CanvasWhiteboardModule,
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],

  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SplashScreen,
    C3ChartProvider,
    Network,
    MalawiDataProvider,
    FileOpener,
    File,
    StatusBar,
    FileService,
    FirestoreStorageProvider,
    NetworkProvider,
    StorageProvider,
    UserProvider,
    YoutubeService,
    UserActions,
    ClimateToolActions,
    BudgetToolActions,
    BudgetToolProvider
  ]
})
export class AppModule {
  // configure redux
  constructor(store: NgRedux<AppState>, devTools: DevToolsExtension) {
    store.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      // [reduxLogger.createLogger()],
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );
***REMOVED***
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
