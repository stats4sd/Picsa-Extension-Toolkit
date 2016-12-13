import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'leaflet'
declare let L;

@Component({
  selector: 'page-view-data',
  templateUrl: 'view-data.html'
})
export class ViewDataPage {
  map:any;

  constructor(public navCtrl: NavController) {

***REMOVED***

  ionViewDidLoad() {
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});
    // start the map in South-East England
    this.map.setView(new L.LatLng(51.3, 0.7),9);
    this.map.addLayer(osm);
***REMOVED***

}
