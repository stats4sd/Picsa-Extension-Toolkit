import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { FirestoreStorageProvider } from "../../providers/firestore";

@IonicPage()
@Component({
  selector: "page-admin",
  templateUrl: "admin.html"
})
export class AdminPage {
  updated: Boolean;
  constructor(private firestorePrvdr: FirestoreStorageProvider) {}

  updateHardcodedData() {
    this.firestorePrvdr.populateDB();
    this.updated = true;
  }
}
