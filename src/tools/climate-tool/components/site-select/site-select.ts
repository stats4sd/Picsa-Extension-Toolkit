import { Component } from "@angular/core";
import * as L from "leaflet";
import "leaflet-ajax";
import { ClimateToolActions } from "../../../../actions/climate-tool.actions";
import malawiGeo1 from "../../../../assets/geoJson/Malawi-admin-1";
// import malawiGeo2 from "../../../../assets/geoJson/Malawi-admin-2-Blantyre";
import { ISite } from "../../../../models/models";
import { MalawiDataProvider } from "../../../../providers/c3-chart/malawi-data";

@Component({
  selector: "site-select",
  templateUrl: "site-select.html"
})
export class SiteSelectComponent {
  map: any;

  constructor(
    private malawiData: MalawiDataProvider,
    private actions: ClimateToolActions
  ) {}

  ngOnInit() {
    this.mapInit();
***REMOVED***
  mapInit() {
    this.map = L.map("siteSelect", {
      attributionControl: false
  ***REMOVED***);
    const osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const osmAttrib =
      'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 1,
      maxZoom: 15,
      attribution: osmAttrib
  ***REMOVED***);
    // start the map in South-East England
    this.map.setView(new L.LatLng(-13.7, 33.21), 6);
    // this.map.addLayer(osm);
    //cast L to any as typings sometimes not working

    const geojsonLayer = L.geoJSON(malawiGeo1, {
      onEachFeature: this.setFeature.bind(this),
      middleware: function(data) {
        return data;
    ***REMOVED***,
      // filter:filterFunction
      style: this._getStyle()
  ***REMOVED***);
    geojsonLayer.addTo(this.map);
    // console.log('geojson bounds',geojsonLayer.getBounds())
    this.map.fitBounds([[-16.01463, 34.7183], [-15.34875, 35.13236]]);
    // this.map.on('click',function(e){
    //   console.log('clicked')
    // })
    this.malawiData.getMetaData().then(res => {
      const sites = res["sites"];
      for (const site of sites) {
        console.log("site", site);
        const marker = L.marker([site.latitude, site.longitude], {
          icon: weatherIcon
      ***REMOVED***);

        const container = L.DomUtil.create("div");
        const btn = L.DomUtil.create("button", "", container);
        btn.setAttribute("type", "button");
        btn.innerHTML = `<div class="site-select-button">${site.name} 🡺</div>`;
        const popup = L.popup().setContent(btn);
        L.DomEvent.on(btn, "click", btn => {
          this.selectSite(site);
      ***REMOVED***);
        marker.bindPopup(popup);
        marker.addTo(this.map);
        marker.on({
          click: function(e) {
            console.log("marker clicked", e);
        ***REMOVED***.bind(this)
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
  markerClick() {
    console.log("marker clicked");
***REMOVED***

  setFeature(feature, layer) {
    const exceptions = {
      "TA Kapeni": [-15.60583, 35.00381],
      "TA Machinjili": [-15.67858, 35.07111]
  ***REMOVED***;
    layer.on({
      // mouseover: function () {
      //     this.setStyle({
      //         'fillColor': '#b45501',
      //   ***REMOVED***);
      // },
      // mouseout: function () {
      //     this.setStyle({
      //         'fillColor': '#f0d1b1',
      //   ***REMOVED***);
      // },
      click: function(e) {
        // console.log('feature',feature)
        console.log("e", e);
        // e.target.setStyle({
        //     'fillColor': '#80FF9F',
        //     'fillOpacity':1
        // });
        // this.selectSite(e)

        //possible add code to recolour previous points
        //e.g. https://stackoverflow.com/questions/25773389/changing-the-style-of-each-feature-in-a-leaflet-geojson-layer
    ***REMOVED***.bind(this)
  ***REMOVED***);

    //automatically bind tooltips to centre of feature, unless want to manually specify from exceptions
    if (!exceptions[feature.properties.NAME_1]) {
      layer.bindTooltip(feature.properties.NAME_1, {
        permanent: true,
        direction: "center",
        className: "countryLabel"
    ***REMOVED***);
  ***REMOVED*** else {
      const latLon = exceptions[feature.properties.NAME_1];
      const label = L.marker(latLon, {
        icon: L.divIcon({
          html: "",
          iconSize: [0, 0]
      ***REMOVED***)
    ***REMOVED***).addTo(this.map);
      label.bindTooltip(feature.properties.NAME_1, {
        permanent: true,
        direction: "center",
        className: "countryLabel"
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

  _getStyle() {
    return {
      fillColor: "#f0d1b1",
      fillOpacity: 1,
      color: "#000000",
      opacity: 1,
      weight: 2
  ***REMOVED***;
***REMOVED***
  selectSite(site: ISite) {
    // let data = e.target.feature.properties
    this.actions.selectSite(site);
***REMOVED***
}

const weatherIcon = L.icon({
  iconUrl: "assets/img/station.png",
  shadowUrl: "leaf-shadow.png",

  iconSize: [38, 38], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
