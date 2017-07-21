import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageProvider {
  user: any

  constructor(public http: Http, public storage: Storage) {
    console.log('storage provider loading, loading user data')
    storage.get('user').then((val) => {
      if (val == null) {
        console.log('creating new user')
        this.user = {}
        this.user.id = this.generatePushID()
        this.user.name = 'anonymous'
        this.user.role = 'extension'
        this.user.group = 'malawi-2017'
        console.log('user created', this.user)
        storage.set('user', this.user)
    ***REMOVED***
      //old format correction, can be removed in later version
      else if (typeof val == 'string') {
        this.user = {}
        this.user.name = 'anonymous'
        this.user.id = val
        this.user.role = 'extension'
        this.user.group='malawi-2017'
        console.log('user adapted', this.user)
        storage.set('user', this.user)
    ***REMOVED***
      //fix for old format  
      else if (val.ID) {
        this.user = val
        this.user.id = val.ID
        delete this.user.ID
        storage.set('user', this.user)
        console.log('id fixed', this.user)
    ***REMOVED***
      else {
        console.log('user loaded fine')
        this.user=val
    ***REMOVED***
  ***REMOVED***);

***REMOVED***

  save(key, val, id?) {
    return new Promise((resolve) => {
      if (!id) {
        console.log('generating id')
        id = this.generatePushID()
    ***REMOVED***
      console.log('pushing to storage', key, val)
      this.storage.get(key).then((v) => {
        let temp = JSON.parse(v) || {}
        temp[id] = val
        this.storage.set(key, JSON.stringify(temp)).then((res) => {
          resolve('success')
      ***REMOVED***)
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
