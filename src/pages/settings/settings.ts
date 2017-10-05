import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any = {
    permissions: {
      name: 'none'
  ***REMOVED***
***REMOVED***
  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
***REMOVED***

  ionViewDidLoad() {
    this.storagePrvdr.getUser().then(
      res => {
        if (!res['permissions']) { res['permissions'] = { name: '' } }
        this.user = res
        this.name = this.user.permissions.name
        console.log('user', this.user)
    ***REMOVED***)    
***REMOVED***
  userEdit(name) {
    let prompt = this.alertCtrl.create({
      title: 'User Name',
      message: "Enter your name",
      inputs: [
        {
          name: 'userName',
          placeholder: 'Name',
          type: 'text'
      ***REMOVED***,
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
        ***REMOVED***
      ***REMOVED***,
        {
          text: 'Save',
          handler: data => {
            this.updateUser('name', data.userName)
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***
  updateUser(key, val) {
    console.log(key,val)
    if (this.user.hasOwnProperty(key)) { this.user[key] = val }
    this.storagePrvdr.saveUser(this.user)
***REMOVED***
  login() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter organisation access code in the box below",
      inputs: [
        {
          name: 'accessCode',
          placeholder: 'Code',
          type: 'password'
      ***REMOVED***,
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
        ***REMOVED***
      ***REMOVED***,
        {
          text: 'Save',
          handler: data => {
            this.storagePrvdr.assignPermissions(data.accessCode).then((user) => {
              console.log('user', user)
              this.user = user
          ***REMOVED***
              // this.presentToast('Successfully signed in as '+user.name)
            ).catch((err) => {
              console.log('err', err)
          ***REMOVED***)
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    prompt.present();
***REMOVED***
  logout() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Do you want to sign out of ' + this.user.permissions.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
        ***REMOVED***
      ***REMOVED***,
        {
          text: 'Confirm',
          handler: () => {
            this.user.permissions = {}
            this.storagePrvdr.saveUser(this.user)
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    alert.present();

***REMOVED***

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
  ***REMOVED***);
    toast.present();
***REMOVED***
  backup() {
    this.storagePrvdr.backup(this.user)
***REMOVED***

}
