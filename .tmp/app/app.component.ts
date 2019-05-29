import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
declare var FCMPlugin

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if(platform.is('android')){
          FCMPlugin.getToken(
          function(token){
            console.log('subscribing to fcm topic "chris"')
            FCMPlugin.subscribeToTopic('chris');
          },
          function(err){
            console.log('error retrieving token: ' + err);
          }
      )    
      }
    

    });
  }
}
