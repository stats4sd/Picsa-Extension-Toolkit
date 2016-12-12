import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { PicsaManualPage } from "../picsa-manual/picsa-manual";
export var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.buttons = [
            { name: ' Picsa Manual', color: 'primary', icon: 'book', link: PicsaManualPage },
            { name: ' Q&A', color: 'secondary', icon: 'chatbubbles', link: AboutPage },
            { name: ' Record Data', color: 'danger', icon: 'create', link: AboutPage },
            { name: ' View Data', color: 'dark', icon: 'stats', link: AboutPage },
        ];
    }
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map