import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  MenuController,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { Observable } from "rxjs";
import { ClimateToolActions } from "../../actions/climate-tool.actions";
import { ISite } from "../../models/models";
import { CropRequirement } from "../climate-tool.models";
import * as DATA from "./climate-tool.data";
import { ClimateToolProvider } from "./climate-tool.provider";

// import { CombinedProbabilityComponentModule} from './components/combined-probability/combined-probability.module'

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-climate-tool",
  templateUrl: "climate-tool.html"
})
export class ClimateToolPage {
  @select(["climate", "site"])
  readonly site$: Observable<ISite>;
  chart: any;
  sites: any;
  selectedSite: ISite;
  selectedChart: string;
  availableCharts: any;
  showTools: boolean = true;
  showDefinition: boolean = false;
  lineToolValue: number;
  probabilities: any;
  activeChart: any = { name: null ***REMOVED***
  crops = DATA.cropRequirements;
  selectedCrop: any = {***REMOVED***
  fullScreenView: boolean = true;
  columns = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public climatePrvdr: ClimateToolProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private actions: ClimateToolActions
  ) {
    this.site$.subscribe(site => {
      this.selectedSite = site;
      if (site) {
        this.siteChanged(site);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  toggleFullScreen() {
    this.fullScreenView = !this.fullScreenView;
    console.log("resize?");
    console.log("screen", window.screen);
    if (!this.fullScreenView) {
      this.climatePrvdr.resize({
        height: window.screen.height - 80,
        width: window.screen.width - 20
    ***REMOVED***);
  ***REMOVED*** else {
      this.climatePrvdr.resize({
        height: 320,
        width: window.screen.width - 20
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

  siteChanged(site) {
    this.climatePrvdr.setDataset(site).then(
      res => {
        this.columns = res[0];
        this.setAvailableCharts(this.columns);
    ***REMOVED***,
      err => {
        console.log("error", err);
    ***REMOVED***
    );
***REMOVED***
  setChart(chart) {
    if (chart.name != this.activeChart.name) {
      const loader = this.loadingCtrl.create({
        content: "Loading..."
        // duration: 3000
    ***REMOVED***);
      loader.present().then(() => {
        this.activeChart = {***REMOVED***
        this.activeChart = chart;
        console.log("activeChart", chart);
        this.climatePrvdr.setChart(chart);
        this.showTools = true;
        this.lineToolValue = null;
        this.selectedCrop = {***REMOVED***
        loader.dismiss();
    ***REMOVED***);
  ***REMOVED*** else {
      this.showTools = true;
  ***REMOVED***
***REMOVED***
  showAllCharts() {
    this.showTools = false;
***REMOVED***
  close() {
    this.navCtrl.pop();
***REMOVED***
  selectSite() {
    this.actions.selectSite(null);
***REMOVED***
  setAvailableCharts(list) {
    this.availableCharts = DATA.availableCharts;
***REMOVED***
  lineToolValueChange(e?) {
    //if manually input triggers event so deselect crop
    if (e != undefined) {
      this.selectedCrop = {***REMOVED***
  ***REMOVED***
    this.climatePrvdr.setLineToolValue(this.lineToolValue);
    this.probabilities = this.climatePrvdr.calculateProbabilities(
      this.lineToolValue
    );
    console.log("probabilities", this.probabilities);
***REMOVED***
  setCrop(crop: CropRequirement) {
    console.log("chart", this.chart);
    this.lineToolValue = this._calculateMean([crop.daysMin, crop.daysMax]);
    this.lineToolValue = this._calculateMean([crop.waterMin, crop.waterMax]);
    this.lineToolValueChange();
***REMOVED***

  _calculateMean(numbers: number[]) {
    // remove null values
    numbers = numbers.filter(n => {
      return n ? true : false;
  ***REMOVED***);
    let total = 0,
      i;
    for (i = 0; i < numbers.length; i += 1) {
      total += numbers[i];
  ***REMOVED***
    return total / numbers.length;
***REMOVED***
}
