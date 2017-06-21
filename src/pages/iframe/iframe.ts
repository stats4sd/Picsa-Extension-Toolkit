import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Generated class for the IframePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-iframe',
  templateUrl: 'iframe.html',
})
export class IframePage {
  iframe:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    var params: any = navParams.data
    var src = this.sanitizer.bypassSecurityTrustResourceUrl(params.url)
    this.iframe = {
      src: src,
      title: params.title || 'Page not Found',
      icon: params.icon || 'error'
      
    }
  }

  ionViewDidLoad() {
  }
  close() {
    console.log('closing');
    this.navCtrl.pop();
  }

}
