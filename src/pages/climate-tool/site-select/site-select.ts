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
  }

  ionViewDidLoad() {
    
    this.map = L.map('siteSelect');
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 15, attribution: osmAttrib });
    // start the map in South-East England
    this.map.setView(new L.LatLng(-13.70, 33.21), 6);
    this.map.addLayer(osm);
    L.geoJson.ajax("assets/geoJson/Malawi-admin-1.geojson", {
      middleware: function (data) {
        console.log('middleware function')
        return data
      }
    }).addTo(this.map)
  }

}
