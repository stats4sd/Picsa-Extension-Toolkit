/* tslint:disable:ordered-imports */
console.log("app module.ts");
import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// Ionic native modules
import { File } from "@ionic-native/file";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { FileOpener } from "@ionic-native/file-opener";
import { StatusBar } from "@ionic-native/status-bar";
// Angular firestore
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
// App entry component
import { MyApp } from "./app.component";
// Providers
import {
  FileService,
  FirestoreStorageProvider,
  NetworkProvider,
  StorageProvider,
  UserProvider,
  YoutubeService
} from "../providers/providers";
// redux
import {
  NgRedux,
  DevToolsExtension,
  NgReduxModule
} from "@angular-redux/store";
import { AppState, INITIAL_STATE, rootReducer } from "../reducers/reducers";
import { UserActions } from "../actions/user.actions";
import { DataActions } from "../actions/data.actions";
// Tools
import { BudgetToolActions } from "../tools/budget-tool/budget-tool.actions";
import { BudgetToolProvider } from "../tools/budget-tool/budget-tool.provider";
import { ClimateToolActions } from "../tools/climate-tool/climate-tool.actions";
import { ClimateToolProvider } from "../tools/climate-tool/climate-tool.provider";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHzsaVc4TuG3QMFjI_SKP1Px-E5QRglcM",
  authDomain: "extension-toolkit.firebaseapp.com",
  databaseURL: "https://extension-toolkit.firebaseio.com",
  storageBucket: "extension-toolkit.appspot.com",
  messagingSenderId: "249750594240"
};
// error handling
import { SentryErrorHandler } from "../providers/error-handler";
import { UtilsProvider } from "../providers/utils";

// want to use sentry-cordova, but fails when cordova not available...
// *** should link to mobile init app component call... still seems to have issues
// stick to raven as captures js errors fine (no device info from cordova)

// Sentry.init({
//   dsn: "https://68f91fcd849a436193d615bc943c0259@sentry.io/1249964"
// });

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
    }),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CanvasWhiteboardModule,
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],

  providers: [
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    SplashScreen,
    ClimateToolProvider,
    Network,
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
    BudgetToolProvider,
    DataActions,
    UtilsProvider
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
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
