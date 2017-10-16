import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { Events } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../storage/storage'
// auth
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Injectable()
export class NetworkProvider {
  firebaseID: string
  online: boolean

  constructor(private network: Network, public ionicStorage: Storage, storagePrvdr: StorageProvider, private afAuth: AngularFireAuth, public events: Events) {
    console.log('Hello NetworkProvider Provider');
    this.subscribeToFirebaseChanges()
    this.subscribeToNetworkChanges()
    this.afAuth.auth.signInAnonymously().catch(err => console.log('sign in error', err))
***REMOVED***


  syncPrepare() {
    console.log('preparing sync checks')
    return new Promise((resolve, reject) => {
      if (navigator.onLine == false || this.network.type == "none") {
        reject({ code: 2, message: 'no internet connection' })
    ***REMOVED***
      if (this.firebaseID) {
        resolve(this.firebaseID)
    ***REMOVED***
      else {
        this.afAuth.auth.signInAnonymously().catch(err => console.log('sign in error', err))
        reject({ code: 1, message: 'please try again' })
    ***REMOVED***

  ***REMOVED***)
***REMOVED***

  subscribeToFirebaseChanges() {
    // firebase auth state ch
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log('user signed in', user)
        this.firebaseID = user.uid
    ***REMOVED***
      else {
        this.events.publish('firebase:signedOut', this.firebaseID)
        // User is signed out.
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
  subscribeToNetworkChanges() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.online = false
  ***REMOVED***);
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.online = true
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
      ***REMOVED***
    ***REMOVED***, 3000);
  ***REMOVED***);

***REMOVED***

}
