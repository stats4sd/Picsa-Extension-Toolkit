import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {KoboApi} from "../../providers/kobo-api";
// import {Observable} from 'rxjs/Observable'
import {ModalController} from "ionic-angular"
import { StorageProvider } from '../../providers/storage/storage'
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
  user: any={id:'id not registered'}

  constructor(
    public koboApi: KoboApi,
    public nav: NavController,
    public modal: ModalController,
    private storagePrvdr: StorageProvider,
    public sanitizer: DomSanitizer) {
    // can move to storage provider code
    this.storagePrvdr.get('forms').then((forms)=> {
        if (forms) {
            this.forms = forms
        }
        else {
            this.finished = false;
            this.getForms()
        }
    })
    console.log('getting user from storage')
    this.storagePrvdr.getUser().then((user) => {
      console.log('user retrieved',user)
      this.user=user
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
          this.storagePrvdr.set('forms',this.forms);
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
          this.storagePrvdr.set('forms',this.forms);
        })
  }

  openForm(form) {
    console.log('form',form)
    console.log('enketo link', form.enketoLink)
    //http://ee.kobotoolbox.org/x/#YCOj
    var stringLength = form.enketoLink.length
    var linkPrefix = form.enketoLink.slice(0, stringLength - 7)
    var linkSuffix = form.enketoLink.slice(stringLength - 5)
    var link = linkPrefix + '_/?d[/'+form.id_string+'/User_ID_from_Tablet]=' + this.user.id + linkSuffix
    console.log('link',link)
    this.formOpen = true;
    this.enketoLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
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
