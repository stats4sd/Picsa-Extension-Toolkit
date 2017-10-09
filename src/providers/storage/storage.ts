import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular'
import { Platform } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageProvider {
  user: any = {}
  firebaseRef
  // lots of constructor code can be cleaned up after migration to newer version
  constructor(
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,
    public fileOpener: FileOpener,
    public platform: Platform,
    private file: File,
    private afs: AngularFirestore,

  ) {

    console.log('storage provider loading, loading user data')
    console.log('checking db')
    //see if database is of latest format (due to legacy migration)
    this._checkDB().then((upgraded) => {
      console.log('db upgraded', upgraded)
      if (upgraded) {
        // database up to date and user exists
        console.log('database upgraded,getting user')
        this.getUser()
      }
      else {
        console.log('database not upgraded')
        this._migrateData().then(() => {
          this.getUser()
        })
      }
    })


    // this.checkFileDirectory('picsa')
  }

  createUser(id?) {
    if (!id) { id = this.generatePushID() }
    this.user = {}
    this.user.id = id
    this.user.name = 'anonymous'
    this.user.role = 'extension'
    this.user.group = 'malawi-2017'
    console.log('user created', this.user)
    // save id to local storage and sync to firebase db (offline and online)
    this.storage.set('userID', this.user.id)
    this.save({ profile: this.user }, false).then(() => console.log('user saved'))
  }

  getUser() {
    // checks for user existance within local storage.
    //returns corresponding firestore user doc if exists, or creates new if not
    return new Promise((resolve, reject) => {
      this.storage.get('userID').then(id => {
        if (id) {
          console.log('user id exists, retrieving data', id)
          this.user.id = id
          this._get(id).then(data => {
            console.log('data retrieved', data)
            this.user = data['profile']
            console.log('this.user', this.user)
          })
        }
        else {
          console.log('no user,creating')
          this.createUser()
        }
      })
    })
  }

  save(data: any, stringify: boolean, collection?: string, id?: string) {
    // saves data attached to user profile
    // accepts data, whether to stringify (avoid nested arrays), optional colletion and document id
    console.log('saving', data, stringify, collection, id)
    console.log('user id', this.user.id)
    if (stringify == true) { data = JSON.stringify(data) }

    if (collection) {
      // create new doc within collection
      console.log('creating new doc in collection by id', collection, id)
      return this.afs.collection('users').doc(this.user.id).collection(collection).doc(id).set({ json: data })
    }
    else {
      // otherwise update any existing fields, uses set command with merge option to prevent total overwrite
      console.log('updating data on user doc')
      return this.afs.firestore.collection('users').doc(this.user.id).set(data, { merge: true })
    }
  }

  _checkDB() {
    return this.storage.get('dbUpgraded')
  }

  _migrateData() {
    // messy promise chains used to upgrade old format local storage objects to new db
    // will be removed for future deployments
    return new Promise((resolve, reject) => {
      this.storage.keys().then(keys => {
        console.log('keys', keys)
        if (keys.length == 0) {
          // new user
          console.log('new user')
          this.storage.set('dbUpgraded', true)
          resolve()
        }
        else {
          if (keys.indexOf('user') > -1) {
            // existing user in need of migrating
            console.log('upgrading user')
            this.storage.get('user').then(user => {
              console.log('user', user)
              try {
                user = JSON.parse(user);
              } catch (err) {
                // user parsed, return format either object or string depending on version. Now to upgrade
                if (typeof user == 'string') {
                  // 0.27 format where user saved as single string object
                  console.log('string format')
                  this.storage.clear().then(() => {
                    this.createUser(user)
                    this.storage.set('dbUpgraded', true)
                    this.save({ profile: this.user }, false).then(() => resolve())
                  })

                }
                //else console.error(err);
              }
              console.log('parsed user', user)
              if (user.hasOwnProperty('ID')) {
                // 0.28 format with user ID field
                user.id = user.ID
                delete user.ID
              }
              else {
                // 0.29 correct format, only needs syncing as done for both below
              }
              this.user = user
              this.storage.clear().then(() => {
                this.storage.set('userID', this.user.id)
                this.storage.set('dbUpgraded', true)
                this.save({ profile: this.user }, false).then(() => resolve())
              })
            })
          }
        }
      })
    })

    // list db objects, then map
  }

  _get(userID?) {
    // ***need another function to return from local db
    // ***could also add queries
    if (!userID) { userID = this.user.id }
    return new Promise((resolve, reject) => {
      this.afs.firestore.collection("users").doc(userID).get()
        .then(res => resolve(res.data()))
        .catch(err => console.log('err', err))
    })
  }



  assignPermissions(code) {
    console.log('assigning permissions')
    return new Promise((resolve, reject) => {
      this.loadFile('assets/admin/userPermissions.json').then(res => {
        if (res[code]) {
          console.log('profile loaded successfuly succsefully')
          this.user.permissions = res[code]
          console.log('user', this.user)
          this.storage.set('user', this.user).then(_ => resolve(this.user))
        }
        else {
          console.log('no code found', code)
          reject('Invalid code, please try again')
        }
      })
    })
  }
  removePermissions() {
    return new Promise((resolve, reject) => {
      this.user.permissions = {}
      this.save('user', this.user, this.user.id).then(_ => resolve(this.user))
    })
  }

  loadFile(url) {
    var options = {}
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  presentToast(message) {
    console.log('creating toast', message)
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  generatePushID() {
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    var lastPushTime = 0;
    var lastRandChars = [];
    var now = new Date().getTime();
    var duplicateTime = (now === lastPushTime);
    lastPushTime = now;
    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');
    var id = timeStampChars.join('');
    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length != 20) throw new Error('Length should be 20.');
    return id;
  }

  sync(data, collection?) {
    //sync user data to firebase. supports optional collection
    console.log('syncing data', data)
    // attempts to sync local and live, returns timestamp of successful live sync
    return new Promise((resolve, reject) => {
      //***offline - create file backup? currently writes to local collection first I think...

      // console.log('creating offline user backup')
      // this.checkFileDirectory('backups')

      //online
      this.getUser().then(() => {
        console.log('user id', this.user.id)
        this.user.updated = Date.now();
        // prevent nested arrays
        //** will need to rembmer to convert back if restore db functionality built */
        console.log('data key', Object.keys(data))
        if (Object.keys(data)) {
          let key = Object.keys(data)[0]
          if (key == "budgets") {
            let temp = {}
            temp[key] = JSON.stringify(data[key])
            data = temp
          }
        }
        console.log('data', data)

        this.afs.collection('users').doc(this.user.id).set(data)

          .then(_ => console.log('document successfully written'))
          .catch(err => console.log('err', err))
      })

      // this.firebaseList=this.afoDatabase.list('/users')
      // this.firebaseObject=this.afoDatabase.object('/users')

      // let db = this.afoDatabase.list('/users/' + this.user.id)
      // console.log('db',db)


      // promise.offline.then(() => console.log('offline data saved to device storage!'));

      // promise.then(() => {
      //   console.log('data saved to Firebase!')
      //   let temp = { offline: Date.now(), online: Date.now() }
      //   // save lastbackup data to db
      //   console.log('temp',temp)
      //   this.set('lastBackup',temp)
      //   resolve(temp)
      // }).catch(err => console.log('err', err));

    })
  }
  //can merge code from resources page to single provider (either storage or file)
  //checks for a single directory (assumes picsa directory will already exist)...not adapted for root eg. /picsa/backups/profile/...
  checkFileDirectory(dir?) {
    console.log('checking dir', dir)
    console.log('cordova?', this.platform.is('cordova'))
    if (!this.platform.is('cordova')) { return }
    return new Promise((resolve, reject) => {
      //assumes directory child of picsa, check picsa exists 
      this.file.checkDir(this.file.externalApplicationStorageDirectory + 'picsa/', dir)
        .then(_ => {
          console.log('directory exists', this.file.externalApplicationStorageDirectory + 'picsa/' + dir)
          resolve('directory exists')
        })
        .catch(err => {
          this.file.createDir(this.file.externalApplicationStorageDirectory + 'picsa/', dir, false).then(() => {
            console.log('picsa/' + dir + ' directory created')
            resolve('directory created')
          }).catch(err => { reject(err) })
        })
    })
  }

}