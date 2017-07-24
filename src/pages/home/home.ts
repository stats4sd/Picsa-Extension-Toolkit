import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  links: any;
  name: string;
  user: any = {
    permissions: {
      name: null
    }
  }

  constructor(
    public navCtrl: NavController,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.links=[
      // {name:' Picsa Manual', color:'picsa-manual', icon:'book',page:'PicsaManualPage', text:''},
      { name: 'Resources', color: 'picsa-manual', icon: 'book', page: 'ResourcesPage', text: '' },
      { name: 'Tools', color: 'picsa-view', icon: 'tablet-portrait', page: 'ToolsPage' },
      {name:' Discussions', color:'picsa-discussions', icon:'chatbubbles', page:'ForumPage'},
      // {name:' Videos', color:'picsa-videos', icon:'logo-youtube', page:VideosPage},
      {name:' Record Data', color:'picsa-record', icon:'create', page:'RecordDataPage'},
      { name: 'View Data', color: 'picsa-view', icon: 'stats', page: 'ViewDataPage' },
    ]
  }
  ionViewDidLoad() {
    this.storage.getUser().then(
      res => {
        if(!res['permissions']){res['permissions']={name:''}}
        this.user = res
        this.name=this.user.permissions.name
        console.log('user', this.user)
  })    
  }

  login() {
      let prompt = this.alertCtrl.create({
        title: 'Login',
        message: "Enter organisation access code in the box below",
        inputs: [
          {
            name: 'accessCode',
            placeholder: 'Code',
            type:'password'
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
              this.storage.assignPermissions(data.accessCode).then((user) => {
                console.log('user', user)
                this.user = user
              }  
                // this.presentToast('Successfully signed in as '+user.name)
              ).catch((err) =>{
                console.log('err',err)
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
      message: 'Do you want to sign out of '+this.user.permissions.name,
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
            this.storage.saveUser(this.user)
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
}
