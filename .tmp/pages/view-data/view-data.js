import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*
  Generated class for the ViewData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var ViewDataPage = (function () {
    function ViewDataPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ViewDataPage.prototype.ionViewDidLoad = function () {
        console.log('Hello ViewDataPage Page');
    };
    ViewDataPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-view-data',
                    templateUrl: 'view-data.html'
                },] },
    ];
    /** @nocollapse */
    ViewDataPage.ctorParameters = [
        { type: NavController, },
    ];
    return ViewDataPage;
}());
//# sourceMappingURL=view-data.js.map