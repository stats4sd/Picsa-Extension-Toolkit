import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-changelog",
  templateUrl: "changelog.html"
})
export class ChangelogPage {
  whatsAppGroup = {
    label: "App Feedback",
    description: "Give your suggestions or ask for help using the PICSA app",
    link: "https://chat.whatsapp.com/8wEc1tjLRqI7XyU4Lv5OLk"
  };
  constructor() {
    console.log("whatsapp group", this.whatsAppGroup);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChangelogPage");
  }
}