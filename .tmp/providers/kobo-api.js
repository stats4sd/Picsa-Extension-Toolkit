import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export var KoboApi = (function () {
    function KoboApi(http) {
        this.http = http;
        this.apiToken = 'a78968265b8a7049f829062ad3c8759fa53f5b89';
        console.log('kobo api provider loaded');
  ***REMOVED***
    KoboApi.prototype.koboRequest = function (url) {
        var headers = new Headers();
        //use username/password auth. Useful if user inputs username/password in the app
        /*let auth = ('Basic ' + btoa('username:password'));*/
        //use token authentication
        var auth = ('Token ' + this.apiToken);
        //send request
        headers.append('Authorization', auth);
        var options = new RequestOptions({ headers: headers });
        var body = { url: url ***REMOVED***
        //if using browser preview request will need to be sent via proxy site
        return this.http.post('http://kobo-api.stats4sd.org', body, options)
            .map(function (res) {
            var result = JSON.parse(res['_body']);
            console.log(result);
            return result;
      ***REMOVED***)
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
  ***REMOVED***;
    KoboApi.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    KoboApi.ctorParameters = [
        { type: Http, },
    ];
    return KoboApi;
}());
//# sourceMappingURL=kobo-api.js.map