import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {VideosPage} from '../qanda/videos/videos';
import {ForumPage} from '../qanda/forum/forum';
import {PicsaManualPage} from "../picsa-manual/picsa-manual";
import {RecordDataPage} from "../record-data/record-data";
import {ViewDataPage} from "../view-data/view-data";
import { ClimateToolPage } from "../climate-tool/climate-tool";
import { ToolsPage } from "../tools/tools";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  links:any;

  constructor(public navCtrl: NavController) {
    this.links=[
      {name:' Picsa Manual', color:'picsa-manual', icon:'book',page:'PicsaManualPage', text:''},
      { name: 'Tools', color: 'picsa-view', icon: 'tablet-portrait', page: 'ToolsPage' },
      {name:' Discussions', color:'picsa-discussions', icon:'chatbubbles', page:'ForumPage'},
      // {name:' Videos', color:'picsa-videos', icon:'logo-youtube', page:VideosPage},
      {name:' Record Data', color:'picsa-record', icon:'create', page:'RecordDataPage'},
      { name: 'View Data', color: 'picsa-view', icon: 'stats', page: 'ViewDataPage' },
      
    ]
  }


}
