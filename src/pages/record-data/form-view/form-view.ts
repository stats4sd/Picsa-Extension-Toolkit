import { Component } from "@angular/core";
import { IonicPage, NavParams, ViewController } from "ionic-angular";
import * as Survey from "survey-angular";
import { IForm } from "../../../models/models";

@IonicPage()
@Component({
  selector: "page-form-view",
  templateUrl: "form-view.html"
})
export class FormViewPage {
  form: IForm;
  surveyJson: any;
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    console.log("params", navParams);
***REMOVED***

  ngOnInit(): void {
    this.form = this.navParams.data.form;
    console.log("form", this.form);
    this.surveyJson = exampleSurvey;
    this._surveyInit();
***REMOVED***
  close() {
    // *** note, should probably add some sort of backup for partial form repsonse if available
    // e.g. message prompting whether would like to save draft first
    this.viewCtrl.dismiss();
***REMOVED***
  _surveyInit() {
    const s = new Survey.Model(this.surveyJson);
    s.onComplete.add(this._surveyComplete);
    s.completeText = "Submit";
    Survey.SurveyNG.render("surveyElement", { model: s });
***REMOVED***
  // custom function called when survey complete
  _surveyComplete(sender: Survey.Model, options) {
    const responses = sender.data;
    console.log("responses", responses);
***REMOVED***
}

const exampleSurvey = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "question1"
      ***REMOVED***
      ]
  ***REMOVED***
  ]
***REMOVED***
