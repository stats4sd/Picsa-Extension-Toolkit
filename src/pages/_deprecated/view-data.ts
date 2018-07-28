import { Component } from "@angular/core";
import { Events, IonicPage, NavController } from "ionic-angular";
import { NetworkProvider } from "../../providers/network";
import { StorageProvider } from "../../providers/storage";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-view-data",
  templateUrl: "view-data.html"
})
export class ViewDataPage {
  mySubmissions: any = {
    reporting: {
      complete: [],
      pending: []
    }
  };
  editIndex: number;
  editLocation: string;

  constructor(
    public navCtrl: NavController,
    public storagePrvdr: StorageProvider,
    public networkPrvdr: NetworkProvider,
    public events: Events
  ) {
    this.events.subscribe("form:updated", res => {
      this.saveFormUpdate(res.formName, res.formSubmission);
    });
    // this.storagePrvdr.getUserDoc("submittedForms").then(res => {
    //   console.log("res", res);
    //   for (const key in res) {
    //     if (this.mySubmissions.hasOwnProperty(key)) {
    //       this.mySubmissions[key] = res[key];
    //     }
    //   }
    //   console.log("mySubmissions", this.mySubmissions);
    // });
  }

  ionViewDidLoad() {}
  editSubmission(submission, index, subset) {
    // receives submission, index, and subset (whether from pending or complete)
    this.editIndex = index;
    this.editLocation = subset;
    console.log("editing submissions", submission, index);
    this.navCtrl.push("FeedbackFormPage", submission);
  }

  saveFormUpdate(formName, formSubmission) {
    // save submitted form within submitted forms object, as stringified formsubmission within reporting.formname.pending
    console.log("saving update", formName, this.editIndex, formSubmission);
    this.mySubmissions[formName].pending.push(formSubmission);
    // delete old form from copmleted array
    console.log("edit location", this.editLocation);
    this.mySubmissions[formName][this.editLocation].splice(this.editIndex, 1);
    this.storagePrvdr;
    // .saveUserDoc(
    //   this.mySubmissions[formName],
    //   false,
    //   "submittedForms",
    //   formName
    // )
    // .then(() => {
    //   console.log("saved submission");
    //   this.events.publish("message", { text: "Submission Saved" });
    //   this.events.unsubscribe("form:saved");
    //   this.syncForms();
    //   // this.showToast('submission saved')
    //   // this.uploadSavedForms(formName)
    // });
  }

  syncForms() {
    // this.networkPrvdr
    //   .syncPrepare()
    //   .then(res => {
    //     console.log("res received, proceeding to sync");
    //     const firebaseID = res;
    //     // this.storagePrvdr.syncForms(firebaseID);
    //   })
    //   .catch();
  }
}
