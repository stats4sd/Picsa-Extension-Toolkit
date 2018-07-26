import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { FirestoreStorageProvider } from "../../providers/firestore";
import { BudgetToolProvider } from "../../tools/budget-tool/budget-tool.provider";

@IonicPage()
@Component({
  selector: "page-admin",
  templateUrl: "admin.html"
})
export class AdminPage {
  updated: Boolean;
  constructor(
    private firestorePrvdr: FirestoreStorageProvider,
    private budgetPrvdr: BudgetToolProvider
  ) {}

  updateHardcodedData() {
    this.firestorePrvdr.populateDB();
    this.updated = true;
  }
  updateBudgetData() {
    this.budgetPrvdr.populateDB();
    this.updated = true;
  }
}
