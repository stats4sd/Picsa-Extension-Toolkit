import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {KoboApi} from "../../providers/kobo-api";
// import {Observable} from 'rxjs/Observable'
import {ModalController} from "ionic-angular"
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-record-data',
  templateUrl: 'record-data.html',
})

export class RecordDataPage {
  results: any = [];
  anyErrors: boolean;
  finished: boolean=true;
  forms:any=[];
  enketoLink:any;

  constructor(public koboApi:KoboApi, public nav:NavController, public modal:ModalController, private storage:Storage) {
    this.storage.get('forms').then((forms)=> {
        if (forms) {
            this.forms = (JSON.parse(forms))
      ***REMOVED***
        else {
            this.finished = false;
            this.getForms()
      ***REMOVED***
  ***REMOVED***)
***REMOVED***

  getForms(){
    this.anyErrors=false;
    this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
        result =>this.forms = result,
        error => {
          console.log(error);
          this.anyErrors = true;
          this.finished = true;
      ***REMOVED***,
        () => {
          this.finished = true;
          let i=0;
          this.storage.set('forms',JSON.stringify(this.forms));
          for(let form of this.forms){
            this.getLinks(form, i);
            i++
        ***REMOVED***}
    );
***REMOVED***

  getLinks(form, index){
    this.koboApi.koboRequest(form.url + '/enketo').subscribe(
        //**need to also save link to cache
        result =>{
          this.forms[index].enketoLink = result['enketo_url'].replace('https://','http://')
      ***REMOVED***,
        error =>{console.log(error)},
        () => {
          this.storage.set('forms',JSON.stringify(this.forms));
      ***REMOVED***)
***REMOVED***

  openForm(form) {
    let modal = this.modal.create('FormPopupPage', {form: form}, {
      showBackdrop: false,
      enableBackdropDismiss: false
  ***REMOVED***);
    modal.onDidDismiss(data=> {
      console.log(data)
  ***REMOVED***);
    modal.present();
***REMOVED***


  refresh(){
    console.log('refreshing');
    this.finished=false;
    this.getForms();
***REMOVED***



}
