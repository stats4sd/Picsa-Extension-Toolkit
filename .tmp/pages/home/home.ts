import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VideosPage} from '../qanda/videos/videos';
import {ForumPage} from '../qanda/forum/forum';
import {PicsaManualPage} from "../picsa-manual/picsa-manual";
import {RecordDataPage} from "../record-data/record-data";
import {ViewDataPage} from "../view-data/view-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  buttons:any;

  constructor(public navCtrl: NavController) {
    this.buttons=[
      {name:' Picsa Manual', color:'picsa-manual', icon:'book',link:PicsaManualPage, text:''},
      {name:' Discussions', color:'picsa-discussions', icon:'chatbubbles', link:ForumPage},
      {name:' Videos', color:'picsa-videos', icon:'logo-youtube', link:VideosPage},
      {name:' Record Data', color:'picsa-record', icon:'create', link:RecordDataPage},
      {name:' View Data', color:'picsa-view', icon:'stats', link:ViewDataPage},
    ]
  }


}
