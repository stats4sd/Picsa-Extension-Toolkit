import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Platform} from "ionic-angular";

@Injectable()

export class KoboApi {
  data:any;
  forms:any;
  apiToken:string='a78968265b8a7049f829062ad3c8759fa53f5b89';

  constructor(private http:Http, public platform:Platform) {
    console.log('kobo api provider loaded');
    console.log(this.platform);
    console.log(this.platform.is('cordova'))
***REMOVED***

  //perform get request for mobile, or post for browser
  koboRequest(url):Observable<any> {
    var headers = new Headers();
    //use username/password auth. Useful if user inputs username/password in the app
    /*let auth = ('Basic ' + btoa('username:password'));*/
    //use token authentication
    let auth = ('Token ' + this.apiToken);
    headers.append('Authorization', auth);
    let options = new RequestOptions({headers: headers});

    //if using browser preview request will need to be sent via proxy site
    if (this.platform.is('mobile')) {
      console.log('getting direct from mobile');
      return this.http.get(url, options)
          .map(function (res) {
            let result = JSON.parse(res['_body']);
            console.log(result);
            return result
        ***REMOVED***)
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  ***REMOVED***
    else {
      console.log('getting via stats4sd kobo api post');
      let body = {url: url***REMOVED***
        return this.http.post('http://kobo-api.stats4sd.org', body, options)
          .map(function (res) {
            let result = JSON.parse(res['_body']);
            console.log(result);
            return result
        ***REMOVED***)
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  ***REMOVED***
***REMOVED***






}



