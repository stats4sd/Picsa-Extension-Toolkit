import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'
import { Storage } from '@ionic/storage';
// auth
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storagePrvdr: StorageProvider, private ionicStorage: Storage, private afAuth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('user signed in',user)
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        // this.ionicStorage.set('firebaseID',user.uid)
        // jDxVvEN01hVMUZswhhkoVFsDCMY2
        
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  signIn() {
    console.log('signing in')
    this.afAuth.auth
      .signInAnonymously().catch(err=>console.log('sign in error',err))
  }
  sync() {
    this.ionicStorage.get('firebaseID').then(res => {
      if (res == null) {
        // never signed in
        console.log('attempting sign in')
      }
    })
  }

  saveUserDoc( ) {
    let data = { name: 'chris' }
    let stringify = false
    let collection = 'profile'
    let id
    let merge

    this.storagePrvdr.saveUserDoc(data, stringify, collection, id, merge).then(
      res => { console.log('res', res) },
      rej => { console.log('rej', rej) }
    ).catch(err=>{console.log('err',err)})
  }

  clearCache() {
    this.ionicStorage.clear().then(_ => { console.log('cache clear') })
  }

  simulateData(version) {
    console.log('simulating data', version)
    this.ionicStorage.clear().then(() => {
      let user: any
      if (version == 1) {
        // v0.27
        // user stored as text id
        user = 'testIDv1'
      }
      if (version == 2) {
        // v0.28 and v0.29
        // user stored as (stringified?) object with ID field
        user = JSON.stringify({ ID: 'testIDv2' })
      }
      if (version == 3) {
        // v0.3.0, current standard
        user = { id: 'testIDv3' }
      }
      this.ionicStorage.set('user', user).then(() => console.log('user saved', user))
      this.ionicStorage.set('budgets', JSON.stringify(exampleBudgets)).then(() => console.log('budgets saved', exampleBudgets))
    })
  }


}

var exampleBudgets = {
  "testID1234": {
    "name": "Test Budget 1",
    "created": "2017-10-09T12:17:14.992Z",
    "user": "-Kw033ejWOgDr2TZbJXc",
    "data": [
      {
        "index": 1,
        "activities": [
          {
            "Type": "activity",
            "Name": "apply fertiliser",
            "Image": "assets/img/budget/activity/apply-fertiliser.png",
            "ID": "apply-fertiliser"
          }
        ],
        "inputs": [
          {
            "Type": "input",
            "Name": "chemicals",
            "Image": "assets/img/budget/input/chemicals.png",
            "ID": "chemicals",
            "quantity": 0,
            "cost": 0
          }
        ],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 2,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 3,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 4,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 5,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 6,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 7,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 8,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 9,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 10,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 11,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 12,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      }
    ],
    "id": "-Kw03KYkL60V1fgTgEOq",
    "archived": false
  },
  "testID5678": {
    "name": "Test Budget 2",
    "created": "2017-10-09T12:17:14.992Z",
    "user": "-Kw033ejWOgDr2TZbJXc",
    "data": [
      {
        "index": 1,
        "activities": [
          {
            "Type": "activity",
            "Name": "apply fertiliser",
            "Image": "assets/img/budget/activity/apply-fertiliser.png",
            "ID": "apply-fertiliser"
          }
        ],
        "inputs": [
          {
            "Type": "input",
            "Name": "chemicals",
            "Image": "assets/img/budget/input/chemicals.png",
            "ID": "chemicals",
            "quantity": 0,
            "cost": 0
          }
        ],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 2,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 3,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 4,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 5,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 6,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 7,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 8,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 9,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 10,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 11,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      },
      {
        "index": 12,
        "activities": [],
        "inputs": [],
        "outputs": [],
        "familyLabour": {
          "people": 0,
          "days": 0
        },
        "balance": {
          "expenses": 0,
          "income": 0,
          "net": 0
        },
        "runningTotal": {
          "expenses": 0,
          "income": 0,
          "net": 0
        }
      }
    ],
    "id": "-Kw03KYkL60V1fgTgEOq",
    "archived": false
  },

}
