import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Events, Nav, Platform } from "ionic-angular";
import { Observable } from "rxjs";

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
    private translate: TranslateService
  ) {
    this.initTranslate();
    platform.ready().then(() => {
      // mobile init
      console.log("platforms", platform.platforms());
      if (platform.is("cordova")) {
        this.mobileInit();
    ***REMOVED***
      // hide split pane on home page
      this.nav.viewDidEnter.subscribe(() => {
        console.log("nav view did enter");
        this.showSplitPane = !this.isHomePage();
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  mobileInit() {
    // hide splash
    setTimeout(() => {
      this.splashScreen.hide();
  ***REMOVED***, 100);
    // default status bar style, could be changed
    this.statusBar.styleDefault();
***REMOVED***

  isHomePage() {
    return this.nav.getActive().component.name == "HomePage";
***REMOVED***
  initTranslate() {
    this.translate.setDefaultLang("en");
    this.lang$.subscribe(lang => this.changeLanguage(lang));
***REMOVED***
  changeLanguage(code: string) {
    this.translate.use(code);
***REMOVED***
}

// FCMPlugin.getToken(
//   function(token) {
//     console.log('subscribing to fcm topic "chris"');
//     FCMPlugin.subscribeToTopic("chris");
// ***REMOVED***,
//   function(err) {
//     console.log("error retrieving token: ", err);
// ***REMOVED***
// );
