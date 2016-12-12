import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {KoboApi} from "../../providers/kobo-api";
// import {Observable} from 'rxjs/Observable'
import {ModalController} from "ionic-angular"
import {Storage} from '@ionic/storage'
import {FormPopup} from "./form-popup/form-popup";



@Component({
  selector: 'page-record-data',
  templateUrl: 'record-data.html',
  providers:[KoboApi, Storage]
})

export class RecordDataPage {
  results: any = [];
  anyErrors: boolean;
  finished: boolean=true;
  forms:any;
  generating:boolean;
  enketoLink:any;

  constructor(public koboApi:KoboApi, public nav:NavController, public modal:ModalController, public storage:Storage) {
   console.log('accessing storage');
    this.storage.get('forms').then((forms)=>{
      if(forms){this.forms=(JSON.parse(forms))}
      else{
          this.finished=false;
          //add dummy form for testing
          this.forms=[{
              downloadable:false,
              title:'Test Form',
              date_modified:null,
              eneketoLink:'https://test'
        ***REMOVED***];
          this.getResults()}
      console.log(this.forms)}
    )
***REMOVED***

  getResults(){
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
    let modal = this.modal.create(FormPopup, {form: form}, {
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
    this.getResults();
***REMOVED***



}
