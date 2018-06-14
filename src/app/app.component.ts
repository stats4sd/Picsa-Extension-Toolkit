import { NgRedux, select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Events, Nav, Platform } from "ionic-angular";
import { Observable } from "rxjs";
import { AppState } from "../models/models";

// declare var FCMPlugin;

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage = "HomePage";
  showSplitPane: boolean = false;
  @ViewChild(Nav) nav: Nav;
  @select(["user", "lang"])
  readonly lang$: Observable<string>;
  constructor(
    platform: Platform,
    public events: Events,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private ngRedux: NgRedux<AppState>
  ) {
    this.initTranslate();
    platform.ready().then(() => {
      // mobile init
      console.log("platforms", platform.platforms());
      if (platform.is("cordova")) {
        this.mobileInit();
      }
      // hide split pane on home page
      this.nav.viewDidEnter.subscribe(() => {
        console.log("nav view did enter");
        this.showSplitPane = !this.isHomePage();
      });
    });
  }

  mobileInit() {
    // hide splash
    setTimeout(() => {
      this.splashScreen.hide();
    }, 100);
    // default status bar style, could be changed
    this.statusBar.styleDefault();
  }

  isHomePage() {
    return this.nav.getActive().component.name == "HomePage";
  }
  initTranslate() {
    this.translate.setDefaultLang("en");
    this.lang$.subscribe(lang => this.changeLanguage(lang));
  }
  changeLanguage(code: string) {
    this.translate.use(code);
  }
}

// FCMPlugin.getToken(
//   function(token) {
//     console.log('subscribing to fcm topic "chris"');
//     FCMPlugin.subscribeToTopic("chris");
//   },
//   function(err) {
//     console.log("error retrieving token: ", err);
//   }
// );
