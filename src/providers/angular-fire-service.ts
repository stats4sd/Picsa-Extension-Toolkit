import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AngularFireService {

  constructor(public http: Http, public af: AngularFireDatabase) {
    console.log('Hello AngularFireService Provider');
  }


  bindData(url:string){
    return this.af.list(url)
  }

}
