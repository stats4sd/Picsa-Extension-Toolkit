import { Component, OnInit } from "@angular/core";
import { IForm, IFormResponse, IUser } from "src/models/models";
import * as Survey from "survey-angular";
import { FirestoreStorageProvider } from "src/providers/firestore";
import { UserProvider } from "src/providers/user";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FormStore } from "src/stores/form.store";

@Component({
  selector: "app-form-view",
  templateUrl: "./formView.page.html",
  styleUrls: ["./formView.page.scss"]
})
export class FormViewPage implements OnInit {
  form: IForm;
  surveyJson: any;
  @select("forms") forms$: Observable<IForm[]>;
  constructor(
    private firestoreProvider: FirestoreStorageProvider,
    private userPrvdr: UserProvider,
    private route: ActivatedRoute,
    private store: FormStore
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }
  async loadForm() {
    this.form = await this.store.setActiveFormByKey(
      // using route in component and not store as activatedRoute behaves strange in service
      this.route.snapshot.params.formid
    );
    if (this.form) {
      this.surveyJson = this.form.surveyJson;
      this._surveyInit();
    }
  }
  close() {
    // *** note, should probably add some sort of backup for partial form repsonse if available
    // e.g. message prompting whether would like to save draft first
    // this.modalCtrl.dismiss();
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
    this.store.submitForm(responses);
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
