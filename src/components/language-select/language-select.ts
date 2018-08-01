import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { Select } from "ionic-angular";
import { Observable } from "rxjs";
import { UserActions } from "../../actions/user.actions";

interface ILanguage {
  label: string;
  code: string;
}
@Component({
  selector: "language-select",
  templateUrl: "language-select.html"
})
export class LanguageSelectComponent {
  languages: ILanguage[] = [
    { label: "English", code: "en" },
    { label: "Chichewa", code: "ny" }
  ];
  language: ILanguage;
  @select(["user", "lang"])
  readonly langCode$: Observable<string>;
  @ViewChild(Select) select: Select;

  constructor(private userActions: UserActions) {
    this.langCode$.subscribe(code => {
      if (code) {
        this.setLanguage(code, "redux");
      } else {
        console.log("no language specified, setting default");
        this.language = this.languages[0];
      }
    });
  }
  openLanguageSelect() {
    this.select.open();
  }

  // send language update to redux or update local ngmodel depending on source of update
  setLanguage(code: string, source: "redux" | "home") {
    if (source == "redux") {
      if (code && this.language.code != code) {
        this.language = this.languages.filter(l => {
          return l.code === code;
        })[0];
      }
    } else {
      this.userActions.updateUser({
        lang: this.language.code
      });
    }
  }
}
