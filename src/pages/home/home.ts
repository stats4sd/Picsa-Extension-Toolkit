import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  Platform,
  ToastController
} from "ionic-angular";
import { StorageProvider } from "../../providers/storage";
import { TranslationsProvider } from "../../providers/translations";
import version from "../changelog/version";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  links: any;
  name: string;
  version = version;
  constructor(
    public navCtrl: NavController,
    public storagePrvdr: StorageProvider,
    private toastCtrl: ToastController,
    private translations: TranslationsProvider,
    private platform: Platform
  ) {
    this.links = [
      {
        name: "Resources",
        icon: "book",
        page: "ResourcesPage"
    ***REMOVED***,
      {
        name: "Tools",
        icon: "tablet-portrait",
        page: "ToolsPage"
    ***REMOVED***,
      {
        name: "Discussions",
        icon: "chatbubbles",
        page: "DiscussionsPage"
    ***REMOVED***,
      {
        name: "Data Collection",
        img: "data-collection",
        page: "RecordDataPage"
    ***REMOVED***,
      {
        name: "Settings",
        icon: "settings",
        page: "SettingsPage"
    ***REMOVED***
    ];
***REMOVED***
  ionViewDidEnter() {
    if (!this.platform.is("cordova")) {
      this.checkForSWUpdates();
  ***REMOVED***
***REMOVED***

  async checkForSWUpdates() {
    // https://medium.com/progressive-web-apps/pwa-create-a-new-update-available-notification-using-service-workers-18be9168d717
    console.log("checking for service worker updates");
    window["isUpdateAvailable"]()
      .then(
        async isAvailable => {
          console.log("update available?", isAvailable);
          if (isAvailable) {
            const message = await this.translations.translateText(
              "New Update available! Reload this page to see the latest version."
            );
            const toast = this.toastCtrl.create({
              message: message,
              position: "bottom",
              showCloseButton: true,
              closeButtonText: "Reload"
          ***REMOVED***);
            toast.onDidDismiss(() => {
              location.reload();
          ***REMOVED***);
            toast.present();
        ***REMOVED***
      ***REMOVED***,
        notAvailable => {
          console.log("no update available");
      ***REMOVED***
      )
      .catch(err => console.error(err));
***REMOVED***
}
