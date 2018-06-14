import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-discussions",
  templateUrl: "discussions.html"
})
export class DiscussionsPage {
  groups: group[] = [
    {
      label: "App Feedback",
      description: "Give your suggestions or ask for help using the PICSA app",
      link: "https://chat.whatsapp.com/8wEc1tjLRqI7XyU4Lv5OLk"
  ***REMOVED***
  ];
  constructor() {}

  ngOnInit() {
    console.log("groups", this.groups);
***REMOVED***
}

interface group {
  label: string;
  description: string;
  link: string;
}
