import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { Platform } from "ionic-angular";

@Injectable()
export class NetworkProvider {
  online: boolean;

  constructor(private network: Network, private platform: Platform) {
    console.log("Hello NetworkProvider Provider");
***REMOVED***
  init() {
    this.online = this.getNetworkStatus();
    console.log("online?", this.online);
    this.subscribeToNetworkChanges();
***REMOVED***

  getNetworkStatus() {
    if (this.platform.is("cordova")) {
      return this.network.type != "none";
  ***REMOVED*** else {
      return navigator.onLine;
  ***REMOVED***
***REMOVED***

  subscribeToNetworkChanges() {
    console.log("subscribing to network changes");
    if (this.platform.is("cordova")) {
      this.network.onDisconnect().subscribe(() => {
        this.online = false;
    ***REMOVED***);
      this.network.onConnect().subscribe(() => {
        this.online = true;
    ***REMOVED***);
  ***REMOVED*** else {
      window.addEventListener("online", e => this.updateOnlineStatus(e));
      window.addEventListener("offline", e => this.updateOnlineStatus(e));
  ***REMOVED***
***REMOVED***
  updateOnlineStatus(e) {
    this.online = true;
***REMOVED***
  updateOfflineStatus(e) {
    this.online = false;
***REMOVED***

  updateReduxOnlineStatus() {}
}
