import { Component } from "@angular/core";
import { IonicPage, NavParams, ViewController } from "ionic-angular";
import * as Survey from "survey-angular";
import { IForm, IFormResponse, IUser } from "../../../models/models";
import {
  FirestoreStorageProvider,
  UserProvider
} from "../../../providers/providers";

@IonicPage()
@Component({
  selector: "page-form-view",
  templateUrl: "form-view.html"
})
export class FormViewPage {
  form: IForm;
  surveyJson: any;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
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
    this.viewCtrl.dismiss();
  }
  submitForm(response: IFormResponse) {
    // add to user forms
    this.userPrvdr.saveFormResponse(this.form._key, response);
    // add to firebase forms
    this.firestoreProvider.addToCollection(
      `forms/${this.form._key}/submissions`,
      response,
      response._key
    );
    this.viewCtrl.dismiss();
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
    data._userID = user.id;
    data._submitted = new Date().toString();
    data._key = this.firestoreProvider.db.createId();
    return data;
  }
}
