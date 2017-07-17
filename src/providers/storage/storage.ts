import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageProvider {
  user: string='anonymous'

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello StorageProvider Provider');
    storage.get('user').then((val) => {
      if (val) {
        this.user = val
        console.log('user loaded', this.user)
      }
      else {
        this.user = this.generatePushID()
        console.log('user created', this.user)
        storage.set('user', this.user)
      }
    });

  }

  save(key, val, id?) {
    return new Promise((resolve) => {
      if (!id) { id = this.generatePushID() }
      console.log('pushing to storage', key, val)
      this.storage.get(key).then((v) => {
        let temp = JSON.parse(v) || {}
        console.log('temp', temp)
        temp[id] = val
        this.storage.set(key, JSON.stringify(temp)).then((res) => {
          resolve('success')
        })
      })
    })
    
  }
  load(key) {
    return new Promise((resolve) => {
      this.storage.get(key).then((v) => {
        resolve(JSON.parse(v))
      })
    })
    
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

}
