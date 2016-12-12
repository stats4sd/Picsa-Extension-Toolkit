import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
export var TabsPage = (function () {
    function TabsPage() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
  ***REMOVED***
    TabsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'tabs.html'
              ***REMOVED***,] },
    ];
    /** @nocollapse */
    TabsPage.ctorParameters = [];
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map