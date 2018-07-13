import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  Events,
  IonicPage,
  ModalController,
  NavController,
  ToastController
} from "ionic-angular";
import { NetworkProvider } from "../../providers/network";
import { StorageProvider } from "../../providers/storage";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-record-data",
  templateUrl: "record-data.html"
})
export class RecordDataPage {
  results: any = [];
  anyErrors: boolean;
  finished: boolean = false;
  refreshing: boolean = false;
  forms: any = [];
  formOpen: boolean = false;
  uploadDisabled: boolean = false;
  enketoLink: any;
  formDisplay: string = "none";
  submittedForms: any = { reporting: { pending: [], complete: [] } ***REMOVED***
  user: any = { id: "id not registered" ***REMOVED***

  constructor(
    public nav: NavController,
    public modalCtrl: ModalController,
    private storagePrvdr: StorageProvider,
    private networkPrvdr: NetworkProvider,
    public sanitizer: DomSanitizer,
    public events: Events,
    public toastCtrl: ToastController
  ) {
    console.log("getting user from storage");
    this.storagePrvdr.getUser().then(user => {
      this.user = user;
      this.storagePrvdr.getUserDoc("submittedForms").then(res => {
        console.log("submitted forms retrieved", res);
        if (res) {
          this.submittedForms = res;
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***
  ionViewDidEnter() {
    this.events.subscribe("form:submitted", data => {
      this.saveFormSubmission(data.formName, data.formSubmission);
  ***REMOVED***);
    // this.uploadSavedForms('reporting', true)
***REMOVED***

  openForm2(form) {
    // method to open locally produced form pages and listen for save submissions
    const page = `${form}Page`;
    this.nav.push(page, {});
***REMOVED***

  saveFormSubmission(formName, formSubmission) {
    // save submitted form within submitted forms object, as stringified formsubmission within reporting.formname.pending
    console.log("saving submission", formName, formSubmission);
    formSubmission._submissionID = this.storagePrvdr.firestorePrvdr.db.createId();
    formSubmission._userID = this.user.id;
    this.submittedForms[formName].pending.push(formSubmission);
    console.log("submitted forms", this.submittedForms);
    this.storagePrvdr
      .saveUserDoc(
        this.submittedForms[formName],
        false,
        "submittedForms",
        formName
      )
      .then(res => {
        console.log("saved submission");
        this.events.publish("message", { text: "Submission Saved" });
        this.events.unsubscribe("form:saved");
        this.showToast("submission saved");
        this.uploadSavedForms(formName);
    ***REMOVED***);
***REMOVED***
  showToast(message) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000,
        closeButtonText: "close",
        position: "top",
        dismissOnPageChange: true,
        showCloseButton: true
    ***REMOVED***)
      .present();
***REMOVED***

  uploadSavedForms(formName, backgroundMode?) {
    // upload reporting form to firebase and resave local
    // background mode prevents notification messages
    if (this.submittedForms.reporting.pending.length > 0) {
      this.uploadDisabled = true;
      this.networkPrvdr
        .syncPrepare()
        .then(
          res => {
            console.log("res received, proceeding to sync");
            const firebaseID = res;
            this.storagePrvdr.syncForms(firebaseID).then(res => {
              console.log("submitted successfully!");
              if (!backgroundMode) {
                this.showToast("forms submitted succesffully");
            ***REMOVED***
              this.submittedForms.reporting.pending.forEach(e => {
                this.submittedForms.reporting.complete.push(e);
            ***REMOVED***);
              this.submittedForms.reporting.pending = [];
              console.log("forms", this.submittedForms.reporting);
              this.storagePrvdr.saveUserDoc(
                this.submittedForms.reporting,
                false,
                "submittedForms",
                "reporting"
              );
              this.uploadDisabled = false;
          ***REMOVED***);
        ***REMOVED***,
          rej => {
            console.log("rej", rej);
            this.uploadDisabled = false;
            if (!backgroundMode) {
              this.showToast(rej.message);
          ***REMOVED***
        ***REMOVED***
        )

        .catch(err => {
          console.log("err", err);
          this.uploadDisabled = false;
          if (!backgroundMode) {
            this.showToast(err.message);
        ***REMOVED***
      ***REMOVED***);
  ***REMOVED*** else {
      if (!backgroundMode) {
        this.showToast("all forms already uploaded");
    ***REMOVED***
  ***REMOVED***
***REMOVED***
}

// getForms() {
//   this.refreshing = true;
//   this.anyErrors=false;
//   this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
//     result => {
//       this.forms = result
//       this.refreshing=false
//   ***REMOVED***  ,
//       error => {
//         console.log(error);
//         this.anyErrors = true;
//         this.finished = true;
//         this.refreshing = false
//     ***REMOVED***,
//       () => {
//         this.finished = true;
//         this.refreshing = false
//         let i=0;
//         this.storagePrvdr.saveUserDoc('forms',this.forms);
//         for(let form of this.forms){
//           this.getLinks(form, i);
//           i++
//       ***REMOVED***}
//   );
// }

// getLinks(form, index){
//   this.koboApi.koboRequest(form.url + '/enketo').subscribe(
//       //**need to also save link to cache
//       result =>{
//         this.forms[index].enketoLink = result['enketo_url'].replace('https://','http://')
//     ***REMOVED***,
//       error =>{console.log(error)},
//       () => {
//         this.storagePrvdr.saveUserDoc('forms',this.forms);
//     ***REMOVED***)
// }

// openForm(form) {
//   console.log('form',form)
//   console.log('enketo link', form.enketoLink)
//   //http://ee.kobotoolbox.org/x/#YCOj
//   var stringLength = form.enketoLink.length
//   var linkPrefix = form.enketoLink.slice(0, stringLength - 7)
//   var linkSuffix = form.enketoLink.slice(stringLength - 5)
//   var link = linkPrefix + '_/?d[/'+form.id_string+'/User_ID_from_Tablet]=' + this.user.id + linkSuffix
//   console.log('link',link)
//   this.formOpen = true;
//   this.enketoLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
//   this.formDisplay='block'
// }
// closeForm() {
//   this.formOpen = false;
//   this.formDisplay = 'none'
// }

// refresh(){
//   console.log('refreshing');
//   this.finished=false;
//   this.getForms();
// }
