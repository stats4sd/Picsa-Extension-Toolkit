import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { AlertController, IonicPage, ToastController } from "ionic-angular";
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
    public toastCtrl: ToastController,
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
  // login() {
  //   let prompt = this.alertCtrl.create({
  //     title: "Login",
  //     message: "Enter organisation access code in the box below",
  //     inputs: [
  //       {
  //         name: "accessCode",
  //         placeholder: "Code",
  //         type: "password"
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         handler: data => {}
  //       },
  //       {
  //         text: "Save",
  //         handler: data => {
  //           this.storagePrvdr
  //             .assignPermissions(data.accessCode)
  //             .then(
  //               user => {
  //                 console.log("user", user);
  //                 this.user = user;
  //               }
  //               // this.presentToast('Successfully signed in as '+user.name)
  //             )
  //             .catch(err => {
  //               console.log("err", err);
  //             });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
  // logout() {
  //   const alert = this.alertCtrl.create({
  //     title: "Sign Out",
  //     message:
  //       "Note, if you log out all personal data on this device will be removed. Do you want to proceed?",
  //     buttons: [
  //       {
  //         text: "Go back",
  //         role: "cancel",
  //         handler: () => {}
  //       },
  //       {
  //         text: "Logout and clear data",
  //         handler: () => {
  //           // this.user.permissions = {};
  //           // this.storagePrvdr.saveUserDoc(this.user, false);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // presentToast(message) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     duration: 3000
  //   });
  //   toast.present();
  // }
}
