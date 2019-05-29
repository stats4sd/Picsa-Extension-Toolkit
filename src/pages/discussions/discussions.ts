import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { IWhatsAppGroup } from "../../components/whatsapp-group/whatsapp-group";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-discussions",
  templateUrl: "discussions.html"
})
export class DiscussionsPage {
  groups: IWhatsAppGroup[] = [
    {
      label: "App Feedback",
      description: "Give your suggestions or ask for help using the PICSA app",
      link: "https://chat.whatsapp.com/8wEc1tjLRqI7XyU4Lv5OLk"
    }
  ];
  constructor() {}

  ngOnInit() {
    console.log("groups", this.groups);
  }
}
