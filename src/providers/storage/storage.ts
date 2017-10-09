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
  userID: string
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
    ***REMOVED***
      else {
        console.log('database not upgraded')
        this._migrateData().then(() => {

      ***REMOVED***)
    ***REMOVED***
  ***REMOVED***)


    // this.checkFileDirectory('picsa')
***REMOVED***

  createUser(id?) {
    return new Promise((resolve, reject) => {
      if (!id) { id = this.generatePushID() }
      this.user = {}
      this.userID = id
      this.user.name = 'anonymous'
      this.user.role = 'extension'
      this.user.group = 'malawi-2017'
      this.userID = this.userID
      console.log('this.userID', this.userID)
      console.log('user created', this.user)
      // save id to local storage and sync to firebase db (offline and online)
      this.storage.set('userID', this.userID).then(() => {
        this.save({ profile: this.user }, false).then(() => console.log('user saved')).then(() => resolve(this.user))
    ***REMOVED***)
  ***REMOVED***)

***REMOVED***

  getUser() {
    // checks for user existance within local storage.
    //returns corresponding firestore user doc if exists, or creates new if not
    return new Promise((resolve, reject) => {
      this.storage.get('userID').then(id => {
        if (id) {
          console.log('user id exists, retrieving data', id)
          this.userID = id
          this.get(id).then(data => {
            console.log('data retrieved', data)
            this.user = data['profile']
            console.log('this.user', this.user)
        ***REMOVED***)
      ***REMOVED***
        else {
          console.log('no user,creating')
          this.createUser().then(user => {
            this.user = user
            resolve(this.user)
        ***REMOVED***)
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

  save(data: any, stringify: boolean, collection?: string, id?: string, merge?: boolean) {
    // saves data attached to user profile
    // accepts data, whether to stringify (avoid nested arrays), optional colletion and document id
    console.log('saving', data, stringify, collection, id)
    console.log('this.userID', this.userID)
    if (stringify == true) { data = JSON.stringify(data) }
    if (!merge) { merge = false }

    if (collection) {
      // create new doc within collection, overrides any previous document
      console.log('creating new doc in collection by id', collection, id)
      if (id) { return this.afs.firestore.collection('users').doc(this.userID).collection(collection).doc(id).set({ json: data }, { merge: merge }) }
      else { return this.afs.firestore.collection('users').doc(this.userID).collection(collection).doc().set({ json: data }, { merge: merge }) }
  ***REMOVED***
    else {
      // otherwise update any existing fields, uses set command with merge option to prevent total overwrite
      console.log('updating data on user doc')
      return this.afs.firestore.collection('users').doc(this.userID).set(data, { merge: merge })
  ***REMOVED***
***REMOVED***
  saveBatch(data: any, stringify: boolean, collection: string, idAsKey?: boolean) {
    console.log('saving batch', data)
    console.log('this.userID', this.userID)
    // save multiple docs to a sub collection on user doc. overwrites any existing doc
    // allows idAsKey if data format {id:data}, which will maintain same doc ref
    let batch = this.afs.firestore.batch();
    for (let key in data) {
      // create key:value pair doc
      let doc = data[key]
      if (stringify) {
        doc = { json: JSON.stringify(doc) }
    ***REMOVED***
      let ref: any
      if (idAsKey) {
        ref = this.afs.firestore.collection('users').doc(this.userID).collection(collection).doc(key)
    ***REMOVED***
      else {
        ref = this.afs.firestore.collection('users').doc(this.userID).collection(collection).doc()
    ***REMOVED***
      batch.set(ref, { json: doc })
  ***REMOVED***
    return batch.commit()
***REMOVED***

  _checkDB() {
    return this.storage.get('dbUpgraded')
***REMOVED***

  _migrateData() {
    // messy promise chains used to upgrade old format local storage objects to new db
    // will be removed for future deployments
    return new Promise((resolve, reject) => {
      this.storage.keys().then(keys => {
        console.log('keys', keys)
        if (keys.length == 0) {
          // new user
          console.log('new user')
          this.createUser().then((user) => {
            this.storage.set('dbUpgraded', true)
            resolve(user)
        ***REMOVED***)

      ***REMOVED***
        else {
          // first upgrade user, then budgets
          if (keys.indexOf('user') > -1) {
            this._upgradeUser().then((userID) => {
              console.log('user id', userID)
              if (keys.indexOf('budgets') > -1) {
                console.log('upgrading budgets')
                this._upgradeBudgets(userID).then(() => {
                  resolve()
              ***REMOVED***)
            ***REMOVED***
              else { resolve() }
          ***REMOVED***)
        ***REMOVED***
          else resolve()
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
    // 


    // list db objects, then map
***REMOVED***
  _upgradeBudgets(userID) {
    console.log('user id', userID)
    return new Promise((resolve, reject) => {
      this.storage.get('budgets').then(res => {
        let budgets = JSON.parse(res)
        console.log('parsed budgets', budgets)
        this.saveBatch(budgets, true, 'budgets', true).then(() => {
          console.log('budgets saved');
          resolve()
      ***REMOVED***)
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***
  _upgradeUser() {
    console.log('upgrading user')
    return new Promise((resolve, reject) => {
      // existing user in need of migrating
      let id: string
      this.storage.get('user').then(user => {
        console.log('user', user)
        try {
          user = JSON.parse(user);
      ***REMOVED*** catch (err) {
          // user parsed, return format either object or string depending on version. Now to upgrade
          if (typeof user == 'string') {
            // 0.27 format where user saved as single string object
            console.log('string format')
            id = user
            console.log('user id', user)
        ***REMOVED***
          //else console.error(err);
      ***REMOVED***
        console.log('parsed user', user)
        if (user.hasOwnProperty('ID')) {
          // 0.28 format with user ID field
          id = user.ID
      ***REMOVED***
        if (user.hasOwnProperty('id')) {
          // 0.29 correct format, only needs syncing as done for both below
          id = user.id
      ***REMOVED***
        console.log('id', id)
        this.storage.set('userID', this.userID)
        this.storage.set('dbUpgraded', true)
        this.createUser(id).then(user => {
          console.log('this.userID', this.userID)
          this.storage.set('dbUpgraded', true).then(() => {
            resolve(id)
        ***REMOVED***)
      ***REMOVED***)
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

  get(userID?,collection?) {
    // ***need another function to return from local db
    // ***could also add queries
    if (!userID) { userID = this.userID }
    return new Promise((resolve, reject) => {
      this.afs.firestore.collection("users").doc(userID).get()
        .then(res => resolve(res.data()))
        .catch(err => console.log('err', err))
  ***REMOVED***)
***REMOVED***



  assignPermissions(code) {
    console.log('assigning permissions')
    return new Promise((resolve, reject) => {
      this.loadFile('assets/admin/userPermissions.json').then(res => {
        if (res[code]) {
          console.log('profile loaded successfuly succsefully')
          this.user.permissions = res[code]
          console.log('user', this.user)
          this.storage.set('user', this.user).then(_ => resolve(this.user))
      ***REMOVED***
        else {
          console.log('no code found', code)
          reject('Invalid code, please try again')
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***
  removePermissions() {
    return new Promise((resolve, reject) => {
      this.user.permissions = {}
      this.save('user', this.user, this.userID).then(_ => resolve(this.user))
  ***REMOVED***)
***REMOVED***

  loadFile(url) {
    var options = {}
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
      ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  presentToast(message) {
    console.log('creating toast', message)
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
  ***REMOVED***);
    toast.present();
***REMOVED***


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
  ***REMOVED***
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');
    var id = timeStampChars.join('');
    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
    ***REMOVED***
  ***REMOVED*** else {
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
    ***REMOVED***
      lastRandChars[i]++;
  ***REMOVED***
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
  ***REMOVED***
    if (id.length != 20) throw new Error('Length should be 20.');
    return id;
***REMOVED***

  // sync(data, collection?) {
  //   //sync user data to firebase. supports optional collection
  //   console.log('syncing data', data)
  //   // attempts to sync local and live, returns timestamp of successful live sync
  //   return new Promise((resolve, reject) => {
  //     //***offline - create file backup? currently writes to local collection first I think...

  //     // console.log('creating offline user backup')
  //     // this.checkFileDirectory('backups')

  //     //online
  //     this.getUser().then(() => {
  //       console.log('user id', this.userID)
  //       this.user.updated = Date.now();
  //       // prevent nested arrays
  //       //** will need to rembmer to convert back if restore db functionality built */
  //       console.log('data key', Object.keys(data))
  //       if (Object.keys(data)) {
  //         let key = Object.keys(data)[0]
  //         if (key == "budgets") {
  //           let temp = {}
  //           temp[key] = JSON.stringify(data[key])
  //           data = temp
  //       ***REMOVED***
  //     ***REMOVED***
  //       console.log('data', data)

  //       this.afs.collection('users').doc(this.userID).set(data)

  //         .then(_ => console.log('document successfully written'))
  //         .catch(err => console.log('err', err))
  //   ***REMOVED***)

  //     // this.firebaseList=this.afoDatabase.list('/users')
  //     // this.firebaseObject=this.afoDatabase.object('/users')

  //     // let db = this.afoDatabase.list('/users/' + this.userID)
  //     // console.log('db',db)


  //     // promise.offline.then(() => console.log('offline data saved to device storage!'));

  //     // promise.then(() => {
  //     //   console.log('data saved to Firebase!')
  //     //   let temp = { offline: Date.now(), online: Date.now() }
  //     //   // save lastbackup data to db
  //     //   console.log('temp',temp)
  //     //   this.set('lastBackup',temp)
  //     //   resolve(temp)
  //     // }).catch(err => console.log('err', err));

  // ***REMOVED***)
  // }

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
      ***REMOVED***)
        .catch(err => {
          this.file.createDir(this.file.externalApplicationStorageDirectory + 'picsa/', dir, false).then(() => {
            console.log('picsa/' + dir + ' directory created')
            resolve('directory created')
        ***REMOVED***).catch(err => { reject(err) })
      ***REMOVED***)
  ***REMOVED***)
***REMOVED***

}