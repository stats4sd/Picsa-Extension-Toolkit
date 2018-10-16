import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-error",
  templateUrl: "error.html"
})
export class ErrorPage {
  reloading: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  reloadPage() {
    this.reloading = true;
    window.location.reload();
  }
}
