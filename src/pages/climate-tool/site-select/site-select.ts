import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as L from 'leaflet';
import 'leaflet.ajax';


@IonicPage()
@Component({
  selector: 'site-select',
  templateUrl: 'site-select.html',
})
export class SiteSelectPage {
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('leaflet',L)
***REMOVED***

  ionViewDidLoad() {
    
    this.map = L.map('siteSelect');
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 15, attribution: osmAttrib });
    // start the map in South-East England
    this.map.setView(new L.LatLng(-13.70, 33.21), 6);
    // this.map.addLayer(osm);
    var geojsonLayer = new L.geoJson.ajax("assets/geoJson/Malawi-admin-2-Blantyre.geojson", {
      onEachFeature: this.showPopup,
      middleware: function (data) {
        console.log('middleware function')
        return data
    ***REMOVED***
  ***REMOVED***)
    geojsonLayer.addTo(this.map)
    // console.log('geojson bounds',geojsonLayer.getBounds())
    this.map.fitBounds([
      [-16.01463, 34.71830], [-15.34875, 35.13236]
    ])
    
***REMOVED***

  showPopup(feature, layer) {
    layer.bindPopup(feature.properties.NAME_2)
***REMOVED***
  

}
