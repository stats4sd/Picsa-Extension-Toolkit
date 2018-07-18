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
***REMOVED***

  async getLastBackup() {
    const backup: string = await this.storagePrvdr.get("_lastBackup");
    this.lastBackup = backup;
***REMOVED***

  userEdit(field) {
    const prompt = this.alertCtrl.create({
      title: `Set user ${field}`,
      inputs: [
        {
          name: "val",
          placeholder: field,
          type: "text"
      ***REMOVED***
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {}
      ***REMOVED***,
        {
          text: "Save",
          handler: data => {
            this.updateUser(field, data.val);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***

  // }
  updateUser(key, val) {
    console.log(key, val);
    this.user[key] = val;
    this.actions.updateUser(this.user);
***REMOVED***
  // login() {
  //   let prompt = this.alertCtrl.create({
  //     title: "Login",
  //     message: "Enter organisation access code in the box below",
  //     inputs: [
  //       {
  //         name: "accessCode",
  //         placeholder: "Code",
  //         type: "password"
  //     ***REMOVED***
  //     ],
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         handler: data => {}
  //     ***REMOVED***,
  //       {
  //         text: "Save",
  //         handler: data => {
  //           this.storagePrvdr
  //             .assignPermissions(data.accessCode)
  //             .then(
  //               user => {
  //                 console.log("user", user);
  //                 this.user = user;
  //             ***REMOVED***
  //               // this.presentToast('Successfully signed in as '+user.name)
  //             )
  //             .catch(err => {
  //               console.log("err", err);
  //           ***REMOVED***);
  //       ***REMOVED***
  //     ***REMOVED***
  //     ]
  // ***REMOVED***);
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
  //     ***REMOVED***,
  //       {
  //         text: "Logout and clear data",
  //         handler: () => {
  //           // this.user.permissions = {***REMOVED***
  //           // this.storagePrvdr.saveUserDoc(this.user, false);
  //       ***REMOVED***
  //     ***REMOVED***
  //     ]
  // ***REMOVED***);
  //   alert.present();
  // }

  // presentToast(message) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     duration: 3000
  // ***REMOVED***);
  //   toast.present();
  // }
}
