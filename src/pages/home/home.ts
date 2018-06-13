import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { environment } from "../../environments/environment";
import { StorageProvider } from "../../providers/storage/storage";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  links: any;
  name: string;
  version: string = environment.VERSION;
  version_date: string = environment.VERSION_DATE;

  constructor(
    public navCtrl: NavController,
    public storagePrvdr: StorageProvider,
    private toastCtrl: ToastController
  ) {
    this.links = [
      // {name:' Picsa Manual', color:'picsa-manual', icon:'book',page:'PicsaManualPage', text:''},
      {
        name: "Resources",
        color: "picsa-manual",
        icon: "book",
        page: "ResourcesPage",
        text: ""
      },
      {
        name: "Tools",
        color: "picsa-view",
        icon: "tablet-portrait",
        page: "ToolsPage"
      },
      {
        name: " Discussions",
        color: "picsa-discussions",
        icon: "chatbubbles",
        page: "ForumPage"
      },
      // {name:' Videos', color:'picsa-videos', icon:'logo-youtube', page:VideosPage},
      {
        name: " Record Data",
        color: "picsa-record",
        icon: "create",
        page: "RecordDataPage"
      },
      {
        name: "View Data",
        color: "picsa-view",
        icon: "stats",
        page: "ViewDataPage"
      }
    ];
  }
  ionViewDidLoad() {}
  ionViewDidEnter() {
    console.log("loading db");
    this.storagePrvdr.storageInit();
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
