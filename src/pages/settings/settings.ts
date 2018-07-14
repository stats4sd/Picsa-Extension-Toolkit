import { Component } from "@angular/core";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { NetworkProvider, StorageProvider } from "../../providers/providers";

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  user: any = { name: "...Loading", permissions: {} ***REMOVED***
  lastBackup: null;
  name: string;
  syncButton = {
    text: "Backup Now",
    disabled: false,
    color: "#8A2644"
***REMOVED***;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public networkProvider: NetworkProvider
  ) {}

  // userEdit(name) {
  //   const prompt = this.alertCtrl.create({
  //     title: "User Name",
  //     message: "Enter your name",
  //     inputs: [
  //       {
  //         name: "userName",
  //         placeholder: "Name",
  //         type: "text"
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
  //           this.updateUser("name", data.userName);
  //       ***REMOVED***
  //     ***REMOVED***
  //     ]
  // ***REMOVED***);
  //   prompt.present();
  // }
  // updateUser(key, val) {
  //   console.log(key, val);
  //   if (this.user.hasOwnProperty(key)) {
  //     this.user[key] = val;
  // ***REMOVED***
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
  //   let alert = this.alertCtrl.create({
  //     title: "Sign Out",
  //     message: "Do you want to sign out of " + this.user.permissions.name,
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //         handler: () => {}
  //     ***REMOVED***,
  //       {
  //         text: "Confirm",
  //         handler: () => {
  //           this.user.permissions = {***REMOVED***
  //           this.storagePrvdr.saveUserDoc(this.user, false);
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
  //     ***REMOVED***);
  //   ***REMOVED***)
  //     .catch(err => {
  //       console.log("err", err);
  //       this.syncButton.text = err.message;
  //       this.syncButton.color = "#8A2644";
  //       this.syncButton.disabled = false;
  //   ***REMOVED***);
  // }
}
