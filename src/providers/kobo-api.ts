import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class KoboApi {
  data:any;
  forms:any;
  apiToken:string='a78968265b8a7049f829062ad3c8759fa53f5b89';

  constructor(private http:Http) {
    console.log('kobo api provider loaded')
***REMOVED***

  koboRequest(url):Observable<any> {
    var headers = new Headers();
    //use username/password auth. Useful if user inputs username/password in the app
    /*let auth = ('Basic ' + btoa('username:password'));*/

    //use token authentication
    let auth = ('Token ' + this.apiToken);

    //send request
    headers.append('Authorization', auth);
    let options = new RequestOptions({headers: headers});
    let body = {url: url***REMOVED***
    //if using browser preview request will need to be sent via proxy site
    return this.http.post('http://kobo-api.stats4sd.org', body, options)
        .map(function(res){
          let result = JSON.parse(res['_body']);
          console.log(result);
          return result
      ***REMOVED***)
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
***REMOVED***

}



