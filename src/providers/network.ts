import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";

@Injectable()
export class NetworkProvider {
  online: boolean;

  constructor(private network: Network) {
    console.log("Hello NetworkProvider Provider");
    this.subscribeToNetworkChanges();
***REMOVED***

  subscribeToNetworkChanges() {
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log("network was disconnected :-(");
      this.online = false;
  ***REMOVED***);
    const connectSubscription = this.network.onConnect().subscribe(() => {
      console.log("network connected!");
      this.online = true;
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === "wifi") {
          console.log("we got a wifi connection, woohoo!");
      ***REMOVED***
    ***REMOVED***, 3000);
  ***REMOVED***);
***REMOVED***
}

// syncPrepare() {
//   console.log("preparing sync checks");
//   return new Promise((resolve, reject) => {
//     if (navigator.onLine == false || this.network.type == "none") {
//       console.log("offline");
//       reject({ code: 2, message: "no internet connection" });
//   ***REMOVED***
//     if (this.firebaseID) {
//       console.log("firebase id retrieved");
//       resolve(this.firebaseID);
//   ***REMOVED*** else {
//       console.log("signing in");
//       this.afAuth.auth
//         .signInAnonymously()
//         .catch(err => console.log("sign in error", err));
//       reject({ code: 1, message: "please try again" });
//   ***REMOVED***
// ***REMOVED***);
// }
