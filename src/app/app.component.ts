import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
declare var FCMPlugin

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'HomePage';
  constructor(platform: Platform, public events: Events, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      setTimeout(() => {
        splashScreen.hide();
    ***REMOVED***, 100);
      if (platform.is('android')) {
        FCMPlugin.getToken(
          function (token) {
            console.log('subscribing to fcm topic "chris"')
            FCMPlugin.subscribeToTopic('chris');
        ***REMOVED***,
          function (err) {
            console.log('error retrieving token: ' + err);
        ***REMOVED***
        )
    ***REMOVED***
      
  ***REMOVED***);
***REMOVED***
  
}
