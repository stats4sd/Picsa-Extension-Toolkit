import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import * as pdfjsLib from 'pdfjs-dist';

@IonicPage()
@Component({
  selector: 'page-picsa-manual',
  templateUrl: 'picsa-manual.html',

})
export class PicsaManualPage {
  chapters: any;
  pdfjsframe: any;
  fileBase64: any;
  isPdf: boolean = true;
  canvas: any;

  constructor(public navCtrl: NavController) {
    // pdfjsLib.PDFJS.workerSrc = 'assets/pdf.worker.js';

***REMOVED***

  ionViewDidLoad() {
    console.log('Hello PicsaManualPage Page');
   
    // var data = new Uint8Array(fs.readFileSync('helloworld.pdf'));
  //   PDFJS.getDocument('assets/picsa-field-manual.pdf').then(function (pdfDocument) {
  //     console.log('Number of pages: ' + pdfDocument.numPages);
  //     return pdfDocument.getPage(1).then(function (pdfPage) {
  //       // Display page on the existing canvas with 100% scale.
  //       var viewport = pdfPage.getViewport(1.0);
  //       this.canvas = document.getElementById('pdfCanvas');
  //       this.canvas.width = viewport.width;
  //       this.canvas.height = viewport.height;
  //       var ctx = this.canvas.getContext('2d');
  //       var renderTask = pdfPage.render({
  //         canvasContext: ctx,
  //         viewport: viewport
  //     ***REMOVED***);
  //       return renderTask.promise;
  //   ***REMOVED***);
  // ***REMOVED***).catch(function (reason) {
  //     console.error('Error: ' + reason);
  // ***REMOVED***);
  // });

}

openPdf(): void {
  var _self = this;
  setTimeout(() => {
  this.pdfjsframe = document.getElementById('pdfViewer');
  if (this.pdfjsframe != null) {
    this.pdfjsframe.onload = function () {
      _self.loadPdfDocument();
  ***REMOVED***;
***REMOVED***
}, 0);
***REMOVED***

loadPdfDocument() {
  var pdfData = this.base64ToUint8Array(this.fileBase64);
  this.pdfjsframe.contentWindow.PDFViewerApplication.open(pdfData);
}

base64ToUint8Array(base64) {
  var raw = atob(base64);
  var uint8Array = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
***REMOVED***
  return uint8Array;
}

}