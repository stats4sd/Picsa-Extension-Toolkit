import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { UserActions } from "../../actions/actions";

@Component({
  selector: "language-select",
  templateUrl: "language-select.html"
})
export class LanguageSelectComponent {
  languages = [
    { label: "English", code: "en" },
    { label: "Chichewa", code: "ny" }
  ];
  language: any = {};
  @select(["user", "lang"])
  readonly lang$: Observable<string>;

  constructor(private userActions: UserActions) {
    console.log("Hello LanguageSelectComponent Component");
    this.lang$.subscribe(code => {
      this.setLanguage(code, "redux");
    });
  }

  // send language update to redux or update local ngmodel depending on source of update
  setLanguage(code: string, source: "redux" | "home") {
    if (source == "redux") {
      console.log("redux lang", code);
      if (code && this.language.code != code) {
        this.language = this.languages.filter(l => {
          return l.code === code;
        });
      }
    } else {
      console.log("language", this.language);
      this.userActions.updateUser({
        lang: this.language.code
      });
    }
  }
}
