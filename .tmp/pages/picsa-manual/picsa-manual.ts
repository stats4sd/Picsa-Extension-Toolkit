import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PicsaManual page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-picsa-manual',
  templateUrl: 'picsa-manual.html',

})
export class PicsaManualPage {
  chapters:any;
  pdfjsframe:any;
  fileBase64:any;
  isPdf:boolean=true;

  constructor(public navCtrl: NavController) {
    this.chapters={
      
    }
  }

  ionViewDidLoad() {
    console.log('Hello PicsaManualPage Page');
    console.log('test 2')
  }

  openPdf(): void {
    var _self = this;
    setTimeout(() => {
      this.pdfjsframe = document.getElementById('pdfViewer');
      if (this.pdfjsframe != null) {
        this.pdfjsframe.onload = function () {
          _self.loadPdfDocument();
        };
      }
    }, 0);
  }

  loadPdfDocument() {
    var pdfData = this.base64ToUint8Array(this.fileBase64);
    this.pdfjsframe.contentWindow.PDFViewerApplication.open(pdfData);
  }

  base64ToUint8Array(base64) {
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
  }

}
