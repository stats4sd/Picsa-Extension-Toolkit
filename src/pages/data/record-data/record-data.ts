import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { IonicPage, ModalController } from "ionic-angular";
import { Observable } from "rxjs";
import { IForm, IUser } from "../../../models/models";
import { AppState } from "../../../reducers/reducers";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-record-data",
  templateUrl: "record-data.html"
})
export class RecordDataPage {
  user: IUser;
  forms: IForm[];
  @select("user") user$: Observable<IUser>;
  constructor(
    private ngRedux: NgRedux<AppState>,
    public modalCtrl: ModalController
  ) {
    this.user$.subscribe(user => this.init(user));
  }

  // when user updated check for available forms (given user group access permissions) and updated submissions
  // only show forms which are marked as active
  init(user) {
    this.user = user;
    try {
      const allForms: IForm[] = this.ngRedux.getState().data.forms;
      let forms = allForms.filter(form => {
        return this._containsCommonElement(form.groups, this.user.groups);
      });
      forms = allForms.filter(form => {
        return form.isActive;
      });
      this.forms = forms;
    } catch (error) {}
  }

  openForm(form: IForm) {
    this.modalCtrl.create("FormViewPage", { form: form }).present();
  }

  // take 2 string arrays and return whether at least one element is shared between them
  _containsCommonElement(arr1: string[], arr2: string[]) {
    let common = false;
    arr1.forEach(el => {
      if (arr2.includes(el)) {
        common = true;
      }
    });
    return common;
  }
}

/********************************************************************
  old methods to sort
*********************************************************************/
//   ionViewDidEnter() {
//     // this.events.subscribe("form:submitted", data => {
//     //   this.saveFormSubmission(data.formName, data.formSubmission);
//     // });
//     // this.uploadSavedForms('reporting', true)
//   }

//   openForm2(form) {
//     // method to open locally produced form pages and listen for save submissions
//     const page = `${form}Page`;
//     this.nav.push(page, {});
//   }

//   async saveFormSubmission(formName, formSubmission) {
//     // save submitted form within submitted forms object, as stringified formsubmission within reporting.formname.pending
//     console.log("saving submission", formName, formSubmission);
//     formSubmission._submissionID = this.firestorePrvdr.db.createId();
//     formSubmission._userID = this.user.id;
//     this.submittedForms[formName].pending.push(formSubmission);
//     console.log("submitted forms", this.submittedForms);
//     await this.storagePrvdr.set("submittedForms", this.submittedForms);
//     console.log("saved submission");
//     this.events.publish("message", { text: "Submission Saved" });
//     this.events.unsubscribe("form:saved");
//     this.showToast("submission saved");
//     // this.uploadSavedForms(formName);
//   }

//   showToast(message) {
//     this.toastCtrl
//       .create({
//         message: message,
//         duration: 3000,
//         closeButtonText: "close",
//         position: "top",
//         dismissOnPageChange: true,
//         showCloseButton: true
//       })
//       .present();
//   }
// }

/************************************************************************
 *  Very old methods, need to sort to see what is valid
 *************************************************************************/

//   uploadSavedForms(formName, backgroundMode?) {
//     // upload reporting form to firebase and resave local
//     // background mode prevents notification messages
//     if (this.submittedForms.reporting.pending.length > 0) {
//       this.uploadDisabled = true;
//       this.networkPrvdr
//         .syncPrepare()
//         .then(
//           res => {
//             console.log("res received, proceeding to sync");
//             const firebaseID = res;
//             this.storagePrvdr.syncForms(firebaseID).then(res => {
//               console.log("submitted successfully!");
//               if (!backgroundMode) {
//                 this.showToast("forms submitted succesffully");
//               }
//               this.submittedForms.reporting.pending.forEach(e => {
//                 this.submittedForms.reporting.complete.push(e);
//               });
//               this.submittedForms.reporting.pending = [];
//               console.log("forms", this.submittedForms.reporting);
//               this.storagePrvdr.saveUserDoc(
//                 this.submittedForms.reporting,
//                 false,
//                 "submittedForms",
//                 "reporting"
//               );
//               this.uploadDisabled = false;
//             });
//           },
//           rej => {
//             console.log("rej", rej);
//             this.uploadDisabled = false;
//             if (!backgroundMode) {
//               this.showToast(rej.message);
//             }
//           }
//         )

//         .catch(err => {
//           console.log("err", err);
//           this.uploadDisabled = false;
//           if (!backgroundMode) {
//             this.showToast(err.message);
//           }
//         });
//     } else {
//       if (!backgroundMode) {
//         this.showToast("all forms already uploaded");
//       }
//     }
//   }
// }

// getForms() {
//   this.refreshing = true;
//   this.anyErrors=false;
//   this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(
//     result => {
//       this.forms = result
//       this.refreshing=false
//     }  ,
//       error => {
//         console.log(error);
//         this.anyErrors = true;
//         this.finished = true;
//         this.refreshing = false
//       },
//       () => {
//         this.finished = true;
//         this.refreshing = false
//         let i=0;
//         this.storagePrvdr.saveUserDoc('forms',this.forms);
//         for(let form of this.forms){
//           this.getLinks(form, i);
//           i++
//         }}
//   );
// }

// getLinks(form, index){
//   this.koboApi.koboRequest(form.url + '/enketo').subscribe(
//       //**need to also save link to cache
//       result =>{
//         this.forms[index].enketoLink = result['enketo_url'].replace('https://','http://')
//       },
//       error =>{console.log(error)},
//       () => {
//         this.storagePrvdr.saveUserDoc('forms',this.forms);
//       })
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
