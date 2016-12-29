import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AngularFireService {

  constructor(public http: Http, public af:AngularFire) {
    console.log('Hello AngularFireService Provider');
  }

//return all records matching db structure, e.g. /discussions
//returns observable that should be bound in template, e.g. 

/*import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Component({
  selector: 'my-page',
  templateUrl: 'myPage.html'
})
export class MyPage {
data: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, afService:AngularFireService, public alertCtrl:AlertController, public actionSheetCtrl: ActionSheetController) {
    this.data=afService.getData('/');
  }*/

  bindData(url:string){
    return this.af.database.list(url)
  }

}
