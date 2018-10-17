import { Component } from "@angular/core";
import { IonicPage, NavParams, ViewController } from "ionic-angular";

/* Error handler popup page - can be tested by uncommenting Error Test button in tools page */
@IonicPage()
@Component({
  selector: "page-error",
  templateUrl: "error.html"
})
export class ErrorPage {
  reloading: boolean;
  errorMessage: string;
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.errorMessage = navParams.data;
***REMOVED***

  reloadPage() {
    this.reloading = true;
    window.location.reload();
***REMOVED***

  dismiss() {
    this.viewCtrl.dismiss();
***REMOVED***

  // display main message from error log to allow remote troubleshooting
  showMoreInfo() {}
}
