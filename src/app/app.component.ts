import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Events, Nav, Platform } from "ionic-angular";
import { Observable } from "rxjs";
import { UserProvider } from "../providers/user";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage = "HomePage";
  // showSplitPane: boolean = false;
  @ViewChild(Nav) nav: Nav;
  @select(["user", "lang"])
  readonly lang$: Observable<string>;
  constructor(
    platform: Platform,
    public events: Events,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private userPrvdr: UserProvider
  ) {
    console.log("app component constructor");
    platform.ready().then(() => {
      this.initTranslate();
      // load user
      this.userPrvdr.init();
      // mobile init
      console.log("platforms", platform.platforms());
      if (platform.is("cordova")) {
        this.mobileInit();
    ***REMOVED***
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
  initTranslate() {
    this.translate.setDefaultLang("en");
    this.lang$.subscribe(lang => this.changeLanguage(lang));
***REMOVED***
  changeLanguage(code: string) {
    this.translate.use(code);
***REMOVED***
}
