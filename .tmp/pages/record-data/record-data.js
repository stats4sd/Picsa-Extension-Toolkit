import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KoboApi } from "../../providers/kobo-api";
import { ModalController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { FormPopup } from "./form-popup/form-popup";
export var RecordDataPage = (function () {
    function RecordDataPage(koboApi, nav, modal, storage) {
        var _this = this;
        this.koboApi = koboApi;
        this.nav = nav;
        this.modal = modal;
        this.storage = storage;
        this.results = [];
        this.finished = true;
        this.storage.get('forms').then(function (forms) {
            if (forms) {
                _this.forms = (JSON.parse(forms));
            }
            else {
                _this.finished = false;
                _this.getResults();
            }
            console.log(_this.forms);
        });
    }
    RecordDataPage.prototype.getResults = function () {
        var _this = this;
        this.anyErrors = false;
        this.koboApi.koboRequest('https://kc.kobotoolbox.org/api/v1/forms').subscribe(function (result) { return _this.forms = result; }, function (error) {
            console.log(error);
            _this.anyErrors = true;
            _this.finished = true;
        }, function () {
            _this.finished = true;
            var i = 0;
            _this.storage.set('forms', JSON.stringify(_this.forms));
            for (var _i = 0, _a = _this.forms; _i < _a.length; _i++) {
                var form = _a[_i];
                _this.getLinks(form, i);
                i++;
            }
        });
    };
    RecordDataPage.prototype.getLinks = function (form, index) {
        var _this = this;
        this.koboApi.koboRequest(form.url + '/enketo').subscribe(
        //**need to also save link to cache
        function (result) {
            _this.forms[index].enketoLink = result['enketo_url'].replace('https://', 'http://');
        }, function (error) { console.log(error); }, function () {
            _this.storage.set('forms', JSON.stringify(_this.forms));
        });
    };
    RecordDataPage.prototype.openForm = function (form) {
        var modal = this.modal.create(FormPopup, { form: form }, {
            showBackdrop: false,
            enableBackdropDismiss: false
        });
        modal.onDidDismiss(function (data) {
            console.log(data);
        });
        modal.present();
    };
    RecordDataPage.prototype.refresh = function () {
        console.log('refreshing');
        this.finished = false;
        this.getResults();
    };
    RecordDataPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-record-data',
                    templateUrl: 'record-data.html',
                    providers: [KoboApi, Storage]
                },] },
    ];
    /** @nocollapse */
    RecordDataPage.ctorParameters = [
        { type: KoboApi, },
        { type: NavController, },
        { type: ModalController, },
        { type: Storage, },
    ];
    return RecordDataPage;
}());
//# sourceMappingURL=record-data.js.map