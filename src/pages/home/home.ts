import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { StorageProvider } from "../../providers/storage";
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
    private toastCtrl: ToastController
  ) {
    this.links = [
      // {name:' Picsa Manual', color:'picsa-manual', icon:'book',page:'PicsaManualPage', text:''},
      {
        name: "Resources",
        icon: "book",
        page: "ResourcesPage"
      },
      {
        name: "Tools",
        icon: "tablet-portrait",
        page: "ToolsPage"
      },
      {
        name: " Discussions",
        icon: "chatbubbles",
        page: "DiscussionsPage"
      },
      {
        name: "Data Collection",
        img: "data-collection",
        page: "RecordDataPage"
      },
      {
        name: "Settings",
        icon: "settings",
        page: "SettingsPage"
      }
    ];
  }
  ionViewDidEnter() {
    console.log("loading db");
    this.checkForUpdates();
  }

  checkForUpdates() {
    // https://medium.com/progressive-web-apps/pwa-create-a-new-update-available-notification-using-service-workers-18be9168d717
    window["isUpdateAvailable"]()
      .then(
        isAvailable => {
          console.log("update available?", isAvailable);
          if (isAvailable) {
            const toast = this.toastCtrl.create({
              message:
                "New Update available! Reload this page to see the latest version.",
              position: "bottom",
              showCloseButton: true,
              closeButtonText: "Reload"
            });
            toast.onDidDismiss(() => {
              location.reload();
            });
            toast.present();
          }
        },
        notAvailable => {
          console.log("no update available");
        }
      )
      .catch(err => console.error(err));
  }
}
