import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Events, Nav, Platform } from "ionic-angular";
import { FileService, NetworkProvider } from "../providers/providers";
import { StorageProvider } from "../providers/storage";
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
    private userPrvdr: UserProvider,
    private storagePrvdr: StorageProvider,
    private filePrvdr: FileService,
    private networkPrvdr: NetworkProvider
  ) {
    platform.ready().then(() => {
      console.log("platform ready");
      // load user
      console.log("user init");
      this.userPrvdr.init();
      this.storagePrvdr.dataInit();
      this.filePrvdr.init();
      // mobile init
      console.log("platforms", platform.platforms());
      if (platform.is("cordova")) {
        this.mobileInit();
    ***REMOVED***
      // no rush to initialise network
      setTimeout(() => {
        this.networkPrvdr.init();
    ***REMOVED***, 5000);
  ***REMOVED***);
***REMOVED***

  mobileInit() {
    // hide splash
    setTimeout(() => {
      this.splashScreen.hide();
      // default status bar style, could be changed
      this.statusBar.styleDefault();
  ***REMOVED***, 100);
***REMOVED***

  isHomePage() {
    return this.nav.getActive().component.name == "HomePage";
***REMOVED***
}
