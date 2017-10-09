import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any = { name:'...Loading',permissions: {} }
  lastBackup: null
  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.storagePrvdr.getUser().then(user => {
      console.log('user received to settings.ts', user)
      this.storagePrvdr.getUserDoc('settings', 'profile').then((res:any) => {
        for(let key in res){
          if(res.hasOwnProperty(key)){this.user[key]=res[key]}
        }
        console.log('profile retrieved', res, JSON.stringify(res))
      })
    })

  }
  ionViewDidEnter() {
    console.log('profile', this.storagePrvdr.user)
    // this.profile=this.storagePrvdr.user.profile

  }
  userEdit(name) {
    let prompt = this.alertCtrl.create({
      title: 'User Name',
      message: "Enter your name",
      inputs: [
        {
          name: 'userName',
          placeholder: 'Name',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.updateUser('name', data.userName)
          }
        }
      ]
    });
    prompt.present();
  }
  updateUser(key, val) {
    console.log(key, val)
    if (this.user.hasOwnProperty(key)) { this.user[key] = val }
    this.storagePrvdr.saveUserDoc(this.user, false)
  }
  login() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter organisation access code in the box below",
      inputs: [
        {
          name: 'accessCode',
          placeholder: 'Code',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.storagePrvdr.assignPermissions(data.accessCode).then((user) => {
              console.log('user', user)
              this.user = user
            }
              // this.presentToast('Successfully signed in as '+user.name)
            ).catch((err) => {
              console.log('err', err)
            })
          }
        }
      ]
    });
    prompt.present();
  }
  logout() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Do you want to sign out of ' + this.user.permissions.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.user.permissions = {}
            this.storagePrvdr.saveUserDoc(this.user, false)
          }
        }
      ]
    });
    alert.present();

  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  sync() {
    // data should automatically sync when online, so this measure simply indicates a time recently data received
    // probably better way to find out last sync
    // this.lastBackup.offline = new Date(Date.now())
    // this.storagePrvdr.saveUserDoc(this.lastBackup,false,'settings','lastBackup').then(res => {
    //   this.lastBackup.online = new Date(Date.now())
    //   this.storagePrvdr.saveUserDoc(this.lastBackup,false,'settings','lastBackup')
    // })
  }

}
