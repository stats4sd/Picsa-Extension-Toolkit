import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Events, Nav, Platform } from "ionic-angular";
import { UserProvider } from "../providers/user";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage = "HomePage";
  // showSplitPane: boolean = false;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    public events: Events,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userPrvdr: UserProvider
  ) {
    console.log("app component constructor");
    platform.ready().then(() => {
      // load user
      this.userPrvdr.init();
      // mobile init
      console.log("platforms", platform.platforms());
      if (platform.is("cordova")) {
        this.mobileInit();
      }
    });
  }

  mobileInit() {
    // hide splash
    setTimeout(() => {
      this.splashScreen.hide();
      // default status bar style, could be changed
      this.statusBar.styleDefault();
    }, 100);
  }

  isHomePage() {
    return this.nav.getActive().component.name == "HomePage";
  }
}
