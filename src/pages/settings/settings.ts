import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { AlertController, IonicPage, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { IUser } from "../../models/models";
import { StorageProvider } from "../../providers/providers";

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  user: IUser;
  lastBackup: string;
  name: string;
  @select("user") user$: Observable<IUser>;

  constructor(
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.getLastBackup();
    this.user$.subscribe(user => (this.user = user));
  }

  async getLastBackup() {
    const backup: string = await this.storagePrvdr.get("_lastBackup");
    this.lastBackup = backup;
  }

  // userEdit(name) {
  //   const prompt = this.alertCtrl.create({
  //     title: "User Name",
  //     message: "Enter your name",
  //     inputs: [
  //       {
  //         name: "userName",
  //         placeholder: "Name",
  //         type: "text"
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
  //           this.updateUser("name", data.userName);
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
  // updateUser(key, val) {
  //   console.log(key, val);
  //   if (this.user.hasOwnProperty(key)) {
  //     this.user[key] = val;
  //   }
  //   this.storagePrvdr.saveUserDoc(this.user, false, "settings", "profile");
  // }
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
  logout() {
    const alert = this.alertCtrl.create({
      title: "Sign Out",
      message:
        "Note, if you log out all personal data on this device will be removed. Do you want to proceed?",
      buttons: [
        {
          text: "Go back",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Logout and clear data",
          handler: () => {
            // this.user.permissions = {};
            // this.storagePrvdr.saveUserDoc(this.user, false);
          }
        }
      ]
    });
    alert.present();
  }

  // presentToast(message) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  // sync() {
  //   console.log("starting sync");
  //   this.syncButton.disabled = true;
  //   this.syncButton.text = "Starting Sync";
  //   this.networkProvider
  //     .syncPrepare()
  //     .then(res => {
  //       // preflight request check internet and firebase status, and returns firebase id if successful
  //       console.log("res", res);
  //       this.user.firebaseID = res;
  //       this.storagePrvdr.saveUserDoc(
  //         this.user,
  //         false,
  //         "settings",
  //         "profile",
  //         true
  //       );
  //       // show syncing animation

  //       this.storagePrvdr.syncAll(res).then(res => {
  //         this.syncButton.text = "Sync Complete";
  //         this.syncButton.color = "#2E7D32";
  //         this.syncButton.disabled = false;
  //         this.user.lastBackup = new Date(Date.now());
  //         this.storagePrvdr.saveUserDoc(
  //           this.user,
  //           false,
  //           "settings",
  //           "profile",
  //           true
  //         );
  //         console.log("res", res);
  //       });
  //     })
  //     .catch(err => {
  //       console.log("err", err);
  //       this.syncButton.text = err.message;
  //       this.syncButton.color = "#8A2644";
  //       this.syncButton.disabled = false;
  //     });
  // }
}
