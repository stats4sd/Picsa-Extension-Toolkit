import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular'
import { Platform } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { AngularFireOfflineDatabase, AfoListObservable, AfoObjectObservable } from 'angularfire2-offline/database';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageProvider {
  user: any
// lots of constructor code can be cleaned up after migration to newer version
  constructor(
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,
    public fileOpener: FileOpener,
    public platform: Platform,
    private file: File,
    public afoDatabase: AngularFireOfflineDatabase) {
    
    console.log('storage provider loading, loading user data')
    //check picsa directory exists, create if not
    this.checkFileDirectory('picsa')
***REMOVED***
  getUser() {
    console.log('getting user')
    return new Promise((resolve, reject) => {
      if (this.user) { console.log('user already loaded'); resolve(this.user) }
      else {
        console.log('loading user from database')
        this.storage.get('user').then((val) => {
          console.log('user loaded from database',val)
          if (val == null) {
            this.user = {}
            this.user.id = this.generatePushID()
            this.user.name = 'anonymous'
            this.user.role = 'extension'
            this.user.group = 'malawi-2017'
            console.log('user created', this.user)
            this.storage.set('user', this.user)
        ***REMOVED***
          //old format correction, can be removed in later version
          //added complication as all data saved stringified, so need to distinguish proper user saved as string and 
          else if (typeof val == 'string') {
            console.log('upgrading user from legacy')
            let temp = JSON.parse(val)
            if (typeof temp == 'string') {
              this.user = {}
              this.user.name = 'anonymous'
              this.user.id = val
              this.user.role = 'extension'
              this.user.group = 'malawi-2017'
              console.log('user adapted', this.user)
              this.storage.set('user', this.user)
          ***REMOVED***
            else {
              this.user = temp
          ***REMOVED***
        ***REMOVED***
          //fix for old format  
          else if (val.ID) {
            this.user = val
            this.user.id = val.ID
            delete this.user.ID
            this.storage.set('user', this.user)
            console.log('id fixed', this.user)
        ***REMOVED***
          else {
            console.log('user loaded successfully', val)
            this.user = val
        ***REMOVED***
          resolve(this.user)
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***)    
***REMOVED***

  saveUser(user) {
    this.storage.set('user',user)
***REMOVED***

  get(key) {
    // parse and stringify not strictly required but was used in old version so need to maintain compatibility
    return new Promise((resolve) => {
      this.storage.get(key).then(res=>resolve(JSON.parse(res)))
  ***REMOVED***)
***REMOVED***
  set(key, val) {
    console.log('setting',key,val)
    return this.storage.set(key,JSON.stringify(val))
***REMOVED***

  save(key, val, id?) {
    // saves local data to db, creating unique id key
    console.log('saving',key,val,id)
    return new Promise((resolve) => {
      if (!id) {
        console.log('generating id')
        id = this.generatePushID()
    ***REMOVED***
      console.log('pushing to storage', key, val)
      this.storage.get(key).then((v) => {
        console.log('storage retrieved', v, typeof v)
        if (!v) { v = {}}
        let temp = {}
        //extra code as sometimes user set as object instead of usual string
        if (typeof v == 'object') { temp = v }
        else { temp = JSON.parse(v) || {} }
        temp[id] = val
        console.log('about to set temp',temp)
        this.storage.set(key, JSON.stringify(temp)).then((res) => {
          // attemp to sync to live
          let liveData = {}
          liveData[key]=temp
          this.sync(liveData)
          resolve('success')
      ***REMOVED***).catch(err=>console.log('err',err))
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

  
  assignPermissions(code) {
    console.log('assigning permissions')
    return new Promise((resolve,reject) => {
      this.loadFile('assets/admin/userPermissions.json').then(res => {
          if(res[code]){
            console.log('profile loaded successfuly succsefully')
            this.user.permissions = res[code]
            console.log('user', this.user)
            this.storage.set('user', this.user).then(_=> resolve(this.user))
      ***REMOVED***
          else {
            console.log('no code found',code)
            reject('Invalid code, please try again')
      ***REMOVED***
      ***REMOVED***)
  ***REMOVED***)
***REMOVED***
  removePermissions() {
    return new Promise((resolve, reject) => {
      this.user.permissions = {}
      this.save('user', this.user, this.user.id).then(_ => resolve(this.user))
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
    console.log('creating toast',message)
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

  sync(data) {
    console.log('syncing data',data)
    // attempts to sync local and live, returns timestamp of successful live sync
    return new Promise((resolve, reject) => {
      //offline - create file backup?
      console.log('creating offline user backup')
      this.checkFileDirectory('backups')
    
      //online
      this.getUser().then(() => {
        console.log('user id', this.user.id)
        this.user.updated = Date.now();
        // sync data in format {key:value}, allows for multiple values
        const promise = this.afoDatabase.object('/users/' + this.user.id).update(data);
        // promise.offline.then(() => console.log('offline data saved to device storage!'));
        promise.then(() => {
          console.log('data saved to Firebase!')
          let temp = { offline: Date.now(), online: Date.now() }
          // save lastbackup data to db
          console.log('temp',temp)
          this.set('lastBackup',temp)
          resolve(temp)
      ***REMOVED***).catch(err => console.log('err', err));
      
    ***REMOVED***)

  ***REMOVED***)  
***REMOVED***
  //can merge code from resources page to single provider (either storage or file)
  //checks for a single directory (assumes picsa directory will already exist)...not adapted for root eg. /picsa/backups/profile/...
  checkFileDirectory(dir?) {
    console.log('checking dir', dir)
    console.log('cordova?',this.platform.is('cordova'))
    if (!this.platform.is('cordova')) { return }
    return new Promise((resolve, reject) => {
        //assumes directory child of picsa, check picsa exists 
        this.file.checkDir(this.file.externalApplicationStorageDirectory+'picsa/', dir)
          .then(_ => {
            console.log('directory exists', this.file.externalApplicationStorageDirectory + 'picsa/'+dir)
            resolve('directory exists')
        ***REMOVED***)
          .catch(err => {
            this.file.createDir(this.file.externalApplicationStorageDirectory+'picsa/', dir, false).then(() => {
              console.log('picsa/'+dir+' directory created')
              resolve('directory created')
          ***REMOVED***).catch(err => { reject(err) })
        ***REMOVED***)
    ***REMOVED***)    
  ***REMOVED*** 

}
