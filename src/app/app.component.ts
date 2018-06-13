import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Events, Nav, Platform } from "ionic-angular";

// declare var FCMPlugin;

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage = "HomePage";
  showSplitPane: boolean = false;
  @ViewChild(Nav) nav: Nav;
  constructor(
    platform: Platform,
    public events: Events,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
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
