import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
export var MyApp = (function () {
    function MyApp(platform) {
        this.rootPage = HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
      ***REMOVED***);
  ***REMOVED***
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html'
              ***REMOVED***,] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
    ];
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map