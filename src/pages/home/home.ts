import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  links: any;
  name: string;

  constructor(public navCtrl: NavController, public storagePrvdr:StorageProvider) 
  
  {
    this.links=[
      // {name:' Picsa Manual', color:'picsa-manual', icon:'book',page:'PicsaManualPage', text:''},
      { name: 'Resources', color: 'picsa-manual', icon: 'book', page: 'ResourcesPage', text: '' },
      { name: 'Tools', color: 'picsa-view', icon: 'tablet-portrait', page: 'ToolsPage' },
      {name:' Discussions', color:'picsa-discussions', icon:'chatbubbles', page:'ForumPage'},
      // {name:' Videos', color:'picsa-videos', icon:'logo-youtube', page:VideosPage},
      {name:' Record Data', color:'picsa-record', icon:'create', page:'RecordDataPage'},
      { name: 'View Data', color: 'picsa-view', icon: 'stats', page: 'ViewDataPage' },
    ]
***REMOVED***
  ionViewDidLoad() {
    
***REMOVED***
  ionViewDidEnter(){
    console.log('loading db')
    this.storagePrvdr.storageInit()
***REMOVED***
  openSettings() {
  this.navCtrl.push('SettingsPage')
}  

  
}
