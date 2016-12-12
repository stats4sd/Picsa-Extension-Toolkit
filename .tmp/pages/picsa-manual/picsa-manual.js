import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*
  Generated class for the PicsaManual page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var PicsaManualPage = (function () {
    function PicsaManualPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.isPdf = true;
        this.chapters = {};
    }
    PicsaManualPage.prototype.ionViewDidLoad = function () {
        console.log('Hello PicsaManualPage Page');
        console.log('test 2');
    };
    PicsaManualPage.prototype.openPdf = function () {
        var _this = this;
        var _self = this;
        setTimeout(function () {
            _this.pdfjsframe = document.getElementById('pdfViewer');
            if (_this.pdfjsframe != null) {
                _this.pdfjsframe.onload = function () {
                    _self.loadPdfDocument();
                };
            }
        }, 0);
    };
    PicsaManualPage.prototype.loadPdfDocument = function () {
        var pdfData = this.base64ToUint8Array(this.fileBase64);
        this.pdfjsframe.contentWindow.PDFViewerApplication.open(pdfData);
    };
    PicsaManualPage.prototype.base64ToUint8Array = function (base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    };
    PicsaManualPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-picsa-manual',
                    templateUrl: 'picsa-manual.html',
                },] },
    ];
    /** @nocollapse */
    PicsaManualPage.ctorParameters = [
        { type: NavController, },
    ];
    return PicsaManualPage;
}());
//# sourceMappingURL=picsa-manual.js.map