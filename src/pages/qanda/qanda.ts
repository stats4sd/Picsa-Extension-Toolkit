import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {ForumPage} from './forum/forum';
import {VideosPage} from './videos/videos';


@Component({
  selector: 'page-qanda',
  templateUrl: 'qanda.html'
})
export class QandAPage {
  buttons:any;
  constructor(public navCtrl: NavController) {
    this.buttons=[
      {name:'Forum', color:'picsa-manual', icon:'list',link:ForumPage, text:''},
      {name:'Videos', color:'picsa-manual', icon:'video',link:VideosPage, text:''},
    ]
***REMOVED***

}
