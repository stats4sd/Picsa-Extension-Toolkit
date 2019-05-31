import { select } from "@angular-redux/store";
import { Component, OnDestroy, ViewChild, OnInit } from "@angular/core";
import { IonSelect } from "@ionic/angular";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserActions } from "../../actions/user.actions";
import REGIONAL_SETTINGS from "src/environments/region";

interface ILanguage {
  label: string;
  code: string;
}
@Component({
  selector: "language-select",
  templateUrl: "language-select.html"
})
export class LanguageSelectComponent implements OnDestroy, OnInit {
  private componentDestroyed: Subject<any> = new Subject();
  languages: ILanguage[] = REGIONAL_SETTINGS.languages;
  language: ILanguage;
  @select(["user", "lang"]) readonly langCode$: Observable<string>;
  @ViewChild(IonSelect) select: IonSelect;

  constructor(private userActions: UserActions) {}
  ngOnInit() {
    console.log("langCode", this.langCode$);
    this.langCode$.pipe(takeUntil(this.componentDestroyed)).subscribe(code => {
      if (code) {
        this.setLanguage(code, "redux");
      } else {
        console.log("no language specified, setting default");
        this.language = this.languages[0];
      }
    });
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
  openLanguageSelect() {
    this.select.open();
  }

  // send language update to redux or update local ngmodel depending on source of update
  setLanguage(code: string, source: "redux" | "home") {
    if (source == "redux") {
      if (code && this.language && this.language.code != code) {
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
