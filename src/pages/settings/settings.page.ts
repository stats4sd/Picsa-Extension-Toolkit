import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { IUser, IUserGroup } from "src/models/models";
import { select } from "@angular-redux/store";
import { StorageProvider } from "src/providers/storage";
import { AlertController } from "@ionic/angular";
import { UserActions } from "src/actions/user.actions";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  user: IUser;
  lastBackup: string;
  name: string;
  @select("user") user$: Observable<IUser>;
  @select(["data", "groups"])
  userGroups$: Observable<IUserGroup[]>;

  constructor(
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    private actions: UserActions
  ) {
    this.getLastBackup();
    this.user$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(user => (this.user = user));
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  async getLastBackup() {
    const backup: string = await this.storagePrvdr.get("_lastBackup");
    this.lastBackup = backup;
  }

  async userEdit(field: string) {
    const prompt = await this.alertCtrl.create({
      header: `Set user ${field}`,
      inputs: [
        {
          name: "val",
          placeholder: field,
          type: "text"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {}
        },
        {
          text: "Save",
          handler: data => {
            this.updateUser(field, data.val);
          }
        }
      ]
    });
    await prompt.present();
  }

  // }
  updateUser(key: string, val: any) {
    console.log(key, val);
    this.user[key] = val;
    this.actions.updateUser(this.user);
  }
}
