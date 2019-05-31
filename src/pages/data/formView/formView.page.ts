import { Component, OnInit } from "@angular/core";
import { IForm, IFormResponse, IUser } from "src/models/models";
import { NavParams, ModalController } from "@ionic/angular";
import * as Survey from "survey-angular";
import { FirestoreStorageProvider } from "src/providers/firestore";
import { UserProvider } from "src/providers/user";

@Component({
  selector: "app-form-view",
  templateUrl: "./formView.page.html",
  styleUrls: ["./formView.page.scss"]
})
export class FormViewPage implements OnInit {
  form: IForm;
  surveyJson: any;
  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private firestoreProvider: FirestoreStorageProvider,
    private userPrvdr: UserProvider
  ) {
    console.log("params", navParams);
  }

  ngOnInit(): void {
    this.form = this.navParams.data.form;
    console.log("form", this.form);
    this.surveyJson = this.form.surveyJson;
    this._surveyInit();
  }
  close() {
    // *** note, should probably add some sort of backup for partial form repsonse if available
    // e.g. message prompting whether would like to save draft first
    this.modalCtrl.dismiss();
  }
  // when user submits a form two version are saved, one to user profile and one to firebase collection
  // if no user id (never has authenticated) then user info may be retrieved at a future date through the response key
  submitForm(response: IFormResponse) {
    // add to user forms
    this.userPrvdr.saveFormResponse(this.form._key, response);
    // add to firebase forms
    this.firestoreProvider.addToCollection(
      `forms/${this.form._key}/submissions`,
      response,
      response._key
    );
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 1500);
  }
  _surveyInit() {
    const s = new Survey.Model(this.surveyJson);
    s.onComplete.add(this._surveyComplete);
    s.completeText = "Submit";
    s.showPageTitles = false;
    Survey.SurveyNG.render("surveyElement", { model: s });
  }
  // custom function called when survey complete
  _surveyComplete = (sender: Survey.Model, options) => {
    const responses: IFormResponse = this._addUserMeta(sender.data);
    this.submitForm(responses);
  };

  // add additional user meta keys to the data
  _addUserMeta(data: any) {
    const user: IUser = this.userPrvdr.user;
    data._userID = user.id ? user.id : null;
    data._submitted = new Date().toString();
    data._key = this.firestoreProvider.db.createId();
    return data;
  }
}
