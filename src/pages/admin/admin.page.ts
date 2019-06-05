import { Component } from "@angular/core";
import { FirestoreStorageProvider } from "src/providers/firestore";
import { BudgetToolProvider } from "src/tools/budget-tool/store/budget-tool.provider";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
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
