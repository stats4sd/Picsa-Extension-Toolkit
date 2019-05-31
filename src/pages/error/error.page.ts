import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-error",
  templateUrl: "./error.page.html",
  styleUrls: ["./error.page.scss"]
})
export class ErrorPage {
  reloading: boolean;
  errorMessage: string;
  constructor(public navParams: NavParams, public modalCtrl: ModalController) {
    this.errorMessage = navParams.data.errorMessage;
  }

  reloadPage() {
    this.reloading = true;
    window.location.reload();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // display main message from error log to allow remote troubleshooting
  showMoreInfo() {}
}
