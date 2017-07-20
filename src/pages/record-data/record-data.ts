import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {KoboApi} from "../../providers/kobo-api";
// import {Observable} from 'rxjs/Observable'
import {ModalController} from "ionic-angular"
import { Storage } from '@ionic/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



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

  constructor(
    public koboApi: KoboApi,
    public nav: NavController,
    public modal: ModalController,
    private storage: Storage,
    public sanitizer:DomSanitizer) {
    this.storage.get('forms').then((forms)=> {
        if (forms) {
            this.forms = (JSON.parse(forms))
        }
        else {
            this.finished = false;
            this.getForms()
        }
    })
  }

  getForms() {
    this.refreshing = true;
    this.anyErrors=false;
    this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
      result => {
        this.forms = result
        this.refreshing=false
      }  ,
        error => {
          console.log(error);
          this.anyErrors = true;
          this.finished = true;
          this.refreshing = false
        },
        () => {
          this.finished = true;
          this.refreshing = false
          let i=0;
          this.storage.set('forms',JSON.stringify(this.forms));
          for(let form of this.forms){
            this.getLinks(form, i);
            i++
          }}
    );
  }

  getLinks(form, index){
    this.koboApi.koboRequest(form.url + '/enketo').subscribe(
        //**need to also save link to cache
        result =>{
          this.forms[index].enketoLink = result['enketo_url'].replace('https://','http://')
        },
        error =>{console.log(error)},
        () => {
          this.storage.set('forms',JSON.stringify(this.forms));
        })
  }

  openForm(form) {
    this.formOpen = true;
    this.enketoLink = this.sanitizer.bypassSecurityTrustResourceUrl(form.enketoLink);
    this.formDisplay='block'
  }
  closeForm() {
    this.formOpen = false;
    this.formDisplay = 'none'
  }


  refresh(){
    console.log('refreshing');
    this.finished=false;
    this.getForms();
  }



}
