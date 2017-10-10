import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'
import { NetworkProvider } from '../../providers/network/network'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any = { name: '...Loading', permissions: {} }
  lastBackup: null
  name: string;
  syncButton= {
    text: 'Backup Now',
    disabled: false,
    color: "#8A2644"
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public networkProvider: NetworkProvider,

  ) {

  }

  ionViewDidLoad() {
    this.storagePrvdr.getUser().then(user => {
      this.storagePrvdr.getUserDoc('settings', 'profile').then((res: any) => {
        for (let key in res) {
          if (res.hasOwnProperty(key)) { this.user[key] = res[key] }
        }
      })
    })
    

  }
  ionViewDidEnter() {
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
    this.storagePrvdr.saveUserDoc(this.user, false, 'settings', 'profile')
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
    console.log('starting sync')
    this.syncButton.disabled = true
    this.syncButton.text="Starting Sync"
    this.networkProvider.syncPrepare().then(
      res => {
        // preflight request check internet and firebase status, and returns firebase id if successful
        console.log('res', res)
        // show syncing animation

        this.storagePrvdr.syncAll(res)
          .then(
          res => {
            this.syncButton.text = 'Sync Complete'
            this.syncButton.color = "#2E7D32"
            this.syncButton.disabled = false
            this.user.lastBackup = new Date(Date.now())
            this.storagePrvdr.saveUserDoc(this.user.lastBackup,false,'profile','lastBackup')
            console.log('res', res);

          },
          rej => {
            this.syncButton.text = 'Backup Now'
            this.syncButton.color = "#8A2644"
            console.log('rej', rej)
          }
          )
      }
    )
  }

}
