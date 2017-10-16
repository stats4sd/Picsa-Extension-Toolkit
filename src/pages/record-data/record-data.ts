import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, Events } from 'ionic-angular';
import { KoboApi } from "../../providers/kobo-api";
// import {Observable} from 'rxjs/Observable'
import { StorageProvider } from '../../providers/storage/storage'
import { NetworkProvider } from '../../providers/network/network'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FeedbackFormPageModule } from './forms/feedback-form/feedback-form.module'



@IonicPage()
@Component({
  selector: 'page-record-data',
  templateUrl: 'record-data.html',
})

export class RecordDataPage {
  results: any = [];
  anyErrors: boolean;
  finished: boolean = false;
  refreshing: boolean = false;
  forms: any = [];
  formOpen: boolean = false;
  enketoLink: any;
  formDisplay: string = 'none';
  submittedForms: any = { reporting: { pending: [], complete: [] } }
  user: any = { id: 'id not registered' }

  constructor(
    public koboApi: KoboApi,
    public nav: NavController,
    public modalCtrl: ModalController,
    private storagePrvdr: StorageProvider,
    private networkPrvdr: NetworkProvider,
    public sanitizer: DomSanitizer,
    public events: Events) {

    console.log('getting user from storage')
    this.storagePrvdr.getUser().then((user) => {
      console.log('user retrieved', user)
      this.user = user
      console.log('submitted forms', this.submittedForms)
      this.storagePrvdr.getUserDoc('submittedForms').then(res => {
        console.log('submitted forms retrieved', res)
        if (res) { this.submittedForms = res }
    ***REMOVED***)

  ***REMOVED***)

***REMOVED***

  openForm2(form) {
    // method to open locally produced form pages and listen for save submissions
    this.events.subscribe('form:submitted', data => {
      this.saveFormSubmission(data.formName, data.formSubmission)
  ***REMOVED***)
    console.log('opening local form', form)
    let page = form + 'Page'
    this.nav.push(page, {})


***REMOVED***

  saveFormSubmission(formName, formSubmission) {
    // save submitted form within submitted forms object, as stringified formsubmission within reporting.formname.pending
    console.log('saving submission', formName, formSubmission)
    formSubmission._submissionID = this.storagePrvdr.generatePushID()
    formSubmission._userID = this.user.id
    this.submittedForms[formName].pending.push(formSubmission)
    console.log('submitted forms', this.submittedForms)
    this.storagePrvdr.saveUserDoc(this.submittedForms[formName], false, 'submittedForms', formName).then(res => {
      console.log('saved submission')
      this.events.publish('message', { text: 'Submission Saved' })
      this.events.unsubscribe('form:saved')
      this.uploadSavedForms(formName)
  ***REMOVED***)
***REMOVED***

  uploadSavedForms(formName) {
    // upload reporting form to firebase and resave local
    if (this.submittedForms.reporting.pending.length > 0) {
      this.networkPrvdr.syncPrepare().then(res => {
        let firebaseID = res
        this.storagePrvdr.syncForms(firebaseID).then(res => {
          console.log('submitted successfully!')
          this.submittedForms.reporting.pending.forEach(e => {
            this.submittedForms.reporting.complete.push(e)
        ***REMOVED***)
          this.submittedForms.reporting.pending = []
          this.storagePrvdr.saveUserDoc(this.submittedForms[formName], false, 'submittedForms', formName)
      ***REMOVED***)
    ***REMOVED***)
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




