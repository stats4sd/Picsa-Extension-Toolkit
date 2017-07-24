import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController} from 'ionic-angular'
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageProvider {
  user: any=null
// lots of constructor code can be cleaned up after migration to newer version
  constructor(public http: Http, public storage: Storage, public toastCtrl:ToastController) {
    console.log('storage provider loading, loading user data')
***REMOVED***
  getUser() {
    return new Promise((resolve, reject) => {
      if (this.user) { resolve(this.user) }
      else {
        this.storage.get('user').then((val) => {
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

  save(key, val, id?) {
    return new Promise((resolve) => {
      if (!id) {
        console.log('generating id')
        id = this.generatePushID()
    ***REMOVED***
      console.log('pushing to storage', key, val)
      this.storage.get(key).then((v) => {
        console.log('storage retrieved', v, typeof v)
        let temp = {}
        //extra code as sometimes user set as object instead of usual string
        if (typeof v == 'object') { temp = v }
        else { temp = JSON.parse(v) || {} }
        temp[id] = val
        console.log('about to set temp',temp)
        this.storage.set(key, JSON.stringify(temp)).then((res) => {
          resolve('success')
      ***REMOVED***).catch(err=>console.log('err',err))
    ***REMOVED***)
  ***REMOVED***)

***REMOVED***
  load(key) {
    return new Promise((resolve) => {
      this.storage.get(key).then((v) => {
        resolve(JSON.parse(v))
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

}
