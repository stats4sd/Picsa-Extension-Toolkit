import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from 'ionic-native';
import {Platform} from "ionic-angular";
import {FileService} from "../../../providers/file-service"
declare let cordova: any;


@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
  providers:[FileService]
})
export class VideosPage {
  videos:any;
  fs:string;

  constructor(public navCtrl: NavController, public platform:Platform, fileService:FileService) {
    this.videos=[
      {
        name:'034 Women in extension - ENGLISH.mp4',
        size:66.49,
        downloadURL:'https://firebasestorage.googleapis.com/v0/b/extension-toolkit.appspot.com/o/Videos%2F034%20Women%20in%20extension%20-%20ENGLISH.mp4?alt=media&token=9a539872-b55e-42c5-890b-d918e72959c8',
        youtubeURL:'https://youtu.be/M_s9PGklENo',
    ***REMOVED***
    ]
    if (this.platform.is('mobile')) {
      let dataObj = new Blob(['some file data'], { type: 'text/plain' });
      console.log(dataObj);
      Promise.all([
        fileService.createDirectory('PICSA-videos'),
        fileService.listDirectory('PICSA-videos'),
        fileService.createFile('PICSA-videos','testdoc.txt','sample text',false)
      ]).then(
        values=>console.log(values)).catch(
          err=>console.log(err))
  ***REMOVED***
    else{console.log('working in browser?')}

***REMOVED***

  ionViewDidLoad() {
    console.log('Hello VideosPage Page');
***REMOVED***

  testFileFunction(){
    console.log('running test file function)')
    console.log(cordova.file);
    File.listDir(this.fs,'videos').then(res=>
    console.log(res));
    File.createFile(this.fs+'/videos','test.txt',true).then(res =>
    this.fileCheck(res))

***REMOVED***
  errorFunction(err){
      console.log('error:');
      console.log(err);
    if(err.code==12){
      //directory exists so no really an error, can proceed
      this.testFileFunction()
  ***REMOVED***
    else{
      
  ***REMOVED***
***REMOVED***
  fileCheck(res){
    console.log('running file check');
    console.log(res)
    File.listDir(this.fs,'videos')
***REMOVED***

}
