import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storagePrvdr:StorageProvider, private ionicStorage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  simulateData(version){
    console.log('simulating data',version)
    this.ionicStorage.clear().then(()=>{
      let user:any
      if(version==1){
        // v0.27
        // user stored as text id
        // budgets
        user='testIDv1'
      }
      if(version==2){
        // v0.28 and v0.29
        // user stored as (stringified?) object with ID field
        // budgets
        user=JSON.stringify({ID:'testIDv2'})
      }
      if(version==3){
        // v0.3.0, current standard
        user={id:'testIDv3'}
      }
      this.ionicStorage.set('user',user).then(()=>console.log('user saved',user))
    })
    
    

  }  


}
