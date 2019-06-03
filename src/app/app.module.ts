import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// native
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { File } from "@ionic-native/file/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Network } from "@ionic-native/network/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
// translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
// redux
import { NgReduxModule } from "@angular-redux/store";
import { NgReduxRouterModule } from "@angular-redux/router";
import { StoreModule } from "./store/store.module";
// angular firestore
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
// misc
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";
import { SentryErrorHandler } from "src/app/error-handler";
import { ServiceWorkerModule } from "@angular/service-worker";
import ENVIRONMENT from "src/environments/environment";
import { MobxAngularModule } from "mobx-angular";

// configure translation from file
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: "__picsa"
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(ENVIRONMENT.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    MobxAngularModule,
    StoreModule,
    CanvasWhiteboardModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: ENVIRONMENT.production && !ENVIRONMENT.usesCordova
    })
  ],
  exports: [TranslateModule],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    SocialSharing,
    Network,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
