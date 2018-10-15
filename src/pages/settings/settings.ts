import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { AlertController, IonicPage } from "ionic-angular";
import { Observable } from "rxjs";
import { UserActions } from "../../actions/user.actions";
import { IUser, IUserGroup } from "../../models/models";
import { StorageProvider } from "../../providers/providers";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
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
    this.user$.subscribe(user => (this.user = user));
  }

  async getLastBackup() {
    const backup: string = await this.storagePrvdr.get("_lastBackup");
    this.lastBackup = backup;
  }

  userEdit(field) {
    const prompt = this.alertCtrl.create({
      title: `Set user ${field}`,
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
    prompt.present();
  }

  // }
  updateUser(key, val) {
    console.log(key, val);
    this.user[key] = val;
    this.actions.updateUser(this.user);
  }
}
