import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  online: boolean = false
  firebaseID:string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvdr: StorageProvider,
    private ionicStorage: Storage,
    
    private network: Network
  ) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  testConnection() {
    console.log('type?', this.network.type)
    console.log('browser connection', navigator.onLine)
  }


  saveUserDoc() {
    let data = { name: 'chris' }
    let stringify = false
    let collection = 'profile'
    let id
    let merge

    this.storagePrvdr.saveUserDoc(data, stringify, collection, id, merge).then(
      res => { console.log('res', res) },
      rej => { console.log('rej', rej) }
    ).catch(err => { console.log('err', err) })
  }

  clearCache() {
    this.ionicStorage.clear().then(_ => { console.log('cache clear') })
  }
  setBudgetCards() {
    this.ionicStorage.set('budgetCards', exampleBudgetCards)
  }
  removeUserDoc() {
    this.storagePrvdr.removeUserDoc('budgetCards', 'id1')
  }
  

  simulateData(version) {
    console.log('simulating data', version)
    this.ionicStorage.clear().then(() => {
      let user: any
      if (version == 1) {
        // v0.27
        // user stored as text id
        user = 'testIDv1'
        this.ionicStorage.set('user', user).then(() => console.log('user saved', user))
        this.ionicStorage.set('budgets', JSON.stringify(exampleBudgets)).then(() => console.log('budgets saved', exampleBudgets))
      }
      if (version == 2) {
        // v0.28 and v0.29
        // user stored as (stringified?) object with ID field
        user = JSON.stringify({ ID: 'testIDv2' })
        this.ionicStorage.set('user', user).then(() => console.log('user saved', user))
        this.ionicStorage.set('budgets', JSON.stringify(exampleBudgets)).then(() => console.log('budgets saved', exampleBudgets))
      }
      if (version == 3) {
        // v0.3.0, current standard
        user = { id: 'testIDv3' }
        this.ionicStorage.set('user', user).then(() => console.log('user saved', user))
        this.ionicStorage.set('budgets', JSON.stringify(exampleBudgets)).then(() => console.log('budgets saved', exampleBudgets))
      }
      if (version == 4) {
        this.ionicStorage.clear().then(_ => {
          this.ionicStorage.set('budgets', exampleBudgets)
          this.ionicStorage.set('budgetCards', exampleBudgetCards)
          this.ionicStorage.set('settings', exampleSettings)
        })

      }
    })
  }


}
var exampleSettings = {
  profile: {
    group: "test",
    id: "my device id",
    name: "db testing",
    role: "testing role"
  }
}

var exampleBudgetCards = {
  id1: {
    json: {
      "Type": "activity", "Types": "activities", "Name": "My card", "Image": "data:image/png;base64,iVBORw0KGgoAA"
    },
  },
  id2: {
    json: {
      "Type": "activity", "Types": "activities", "Name": "My card 2", "Image": "data:image/png;base64,iVBORw0KGgoAAA"
    },
  }


}

var exampleBudgets = {
  "testID1234": {
    "name": "Test Budget 1",
    "created": "2017-10-09T12:17:14.992Z",
    "user": "-Kw033ejWOgDr2TZbJXc",
    "data": [],
    "id": "-Kw03KYkL60V1fgTgEOq",
    "archived": false
  },
  "testID5678": {
    "name": "Test Budget 2",
    "created": "2017-10-09T12:17:14.992Z",
    "user": "-Kw033ejWOgDr2TZbJXc",
    "data": [],
    "id": "-Kw03KYkL60V1fgTgEOq",
    "archived": false
  },

}
