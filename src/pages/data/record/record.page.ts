import { Component } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { IUser, IForm } from "src/models/models";
import { select, NgRedux } from "@angular-redux/store";
import { AppState } from "src/app/store/store.model";
import { ModalController } from "@ionic/angular";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-record",
  templateUrl: "./record.page.html",
  styleUrls: ["./record.page.scss"]
})
export class RecordPage {
  private componentDestroyed: Subject<any> = new Subject();

  user: IUser;
  forms: IForm[];
  @select("user") user$: Observable<IUser>;
  constructor(
    private ngRedux: NgRedux<AppState>,
    public modalCtrl: ModalController
  ) {
    this.user$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(user => this.init(user));
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  // when user updated check for available forms (given user group access permissions) and updated submissions
  // only show forms which are marked as active
  init(user) {
    this.user = user;
    try {
      const allForms: IForm[] = this.ngRedux.getState().data.forms;
      console.log("forms", allForms);
      let forms = allForms.filter(form => {
        // only filter forms which has groups specified (otherwise assume available to all)
        if (form.groups) {
          return this._containsCommonElement(form.groups, this.user.groups);
        } else {
          return true;
        }
      });
      // also filter out inactive
      forms = forms.filter(form => {
        return form.isActive;
      });
      this.forms = forms;
      console.log("forms", this.forms);
    } catch (error) {
      console.error(error);
    }
  }

  async openForm(form: IForm) {
    const modal = await this.modalCtrl.create({
      component: "FormViewPage",
      componentProps: { form: form }
    });
    await modal.present();
  }

  // take 2 string arrays and return whether at least one element is shared between them
  _containsCommonElement(arr1: string[], arr2: string[] = []) {
    let common = false;
    console.log("checking common", arr1, arr2);
    arr1.forEach(el => {
      if (arr2.includes(el)) {
        common = true;
      }
    });
    console.log("common?", common);
    return common;
  }
}
