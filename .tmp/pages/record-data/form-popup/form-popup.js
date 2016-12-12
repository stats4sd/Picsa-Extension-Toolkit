import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
export var FormPopup = (function () {
    function FormPopup(params, viewCtrl, sanitizer) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.form = params.data.form;
        //use sanitizer to avoid error unsafe resource url (trusted)
        this.enketoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.form.enketoLink);
        console.log(this.form);
  ***REMOVED***
    FormPopup.prototype.close = function () {
        //attempts to retrieve info from loaded iframe .... not working - need to access iframe.contents which requires same domain (check on mobile?)
        /* var iframe:any = document.getElementById('form-iframe');
         var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
         console.log(innerDoc);
         let pending=document.getElementsByClassName('offline-enabled__queue-length');
         console.log(pending);
         this.viewCtrl.dismiss(pending)
         */
        this.viewCtrl.dismiss();
  ***REMOVED***;
    FormPopup.decorators = [
        { type: Component, args: [{
                    selector: 'page-form-popup',
                    templateUrl: 'form-popup.html',
              ***REMOVED***,] },
    ];
    /** @nocollapse */
    FormPopup.ctorParameters = [
        { type: NavParams, },
        { type: ViewController, },
        { type: DomSanitizer, },
    ];
    return FormPopup;
}());
//# sourceMappingURL=form-popup.js.map