import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QandAPage } from '../qanda/qanda';
import { PicsaManualPage } from "../picsa-manual/picsa-manual";
import { RecordDataPage } from "../record-data/record-data";
import { ViewDataPage } from "../view-data/view-data";
export var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.buttons = [
            { name: ' Picsa Manual', color: 'primary', icon: 'book', link: PicsaManualPage },
            { name: ' Q&A', color: 'secondary', icon: 'chatbubbles', link: QandAPage },
            { name: ' Record Data', color: 'danger', icon: 'create', link: RecordDataPage },
            { name: ' View Data', color: 'dark', icon: 'stats', link: ViewDataPage },
        ];
  ***REMOVED***
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
              ***REMOVED***,] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map