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
    }
  }
  lastBackup:any= {
    online: null,
    offline: null
  }
  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvdr: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.storagePrvdr.getUser().then(
      res => {
        if (!res['permissions']) { res['permissions'] = { name: '' } }
        this.user = res
        this.name = this.user.permissions.name
        console.log('user', this.user)
      })
    this.storagePrvdr.get('lastBackup').then((res) => this.lastBackup = res ? res : { online: null,offline:null})
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
    console.log(key,val)
    if (this.user.hasOwnProperty(key)) { this.user[key] = val }
    this.storagePrvdr.saveUser(this.user)
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
            this.storagePrvdr.saveUser(this.user)
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
    let time = Date.now();
    this.storagePrvdr.set('lastBackup',time)
    this.lastBackup.offline=Date.now()
    this.storagePrvdr.sync({ user: this.user }).then(res => {
      this.lastBackup = res
    })
  }

}
