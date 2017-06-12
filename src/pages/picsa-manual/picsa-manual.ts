import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-picsa-manual',
  templateUrl: 'picsa-manual.html',

})

export class PicsaManualPage {
  chapters: any;
  pdfjsframe: any;
  fileBase64: any;
  isPdf: boolean = true;
  pdfSrc: string;
  page: number;
  loader: any;
  pdfIsLoaded: boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

***REMOVED***
  ionViewDidEnter() {
    console.log('ion page entered')
    if (!this.pdfIsLoaded) {
      console.log('loading pdf')
      this.pdfSrc = "assets/picsa-field-manual.pdf"
      this.page = 1
      this.loader = this.loadingCtrl.create({
        content: "Loading...",
        spinner: "dots"
    ***REMOVED***);
      this.loader.present();
      console.log('loader presented')
  ***REMOVED***
    console.log('pdf already loaded')

***REMOVED***


  ionViewDidLoad() {
    console.log('ion view loaded')
***REMOVED***
  pinchZoom(e){
    console.log('pinch zoomed',e)
***REMOVED***
  pdfLoaded() {
    console.log('pdf loaded')
    this.loader.dismiss()
***REMOVED***





}
