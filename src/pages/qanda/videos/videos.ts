import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from 'ionic-native';
import {Platform} from "ionic-angular";
declare let cordova: any;


@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
  videos:any;
  fs:string;

  constructor(public navCtrl: NavController, public platform:Platform) {
    this.videos=[
      {name:'vid 1',link:''}
    ]
    if (this.platform.is('mobile')) {
      this.fs= cordova.file.dataDirectory;
      File.checkDir(this.fs, 'mydir').then(_ => console.log('yay')).catch(err => console.log('boooh'));
  ***REMOVED***
    else{console.log('working in browser?')}

***REMOVED***

  ionViewDidLoad() {
    console.log('Hello VideosPage Page');
***REMOVED***

}
