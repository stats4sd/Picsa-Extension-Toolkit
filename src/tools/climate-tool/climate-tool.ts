import { select } from "@angular-redux/store";
import { Component, OnDestroy } from "@angular/core";
import {
  IonicPage,
  MenuController,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { Observable, Subject } from "rxjs";
import { ClimateToolActions } from "./climate-tool.actions";
import * as DATA from "./climate-tool.data";
import { IChartMeta, ICropRequirement, ISite } from "./climate-tool.models";
import { ClimateToolProvider } from "./climate-tool.provider";

// import { CombinedProbabilityComponentModule} from './components/combined-probability/combined-probability.module'

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-climate-tool",
  templateUrl: "climate-tool.html"
})
export class ClimateToolPage implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  @select(["climate", "site"])
  readonly site$: Observable<ISite>;
  @select(["climate", "chart"])
  readonly activeChart$: Observable<IChartMeta>;
  activeChart: IChartMeta;
  sites: any;
  selectedSite: ISite;
  selectedChart: string;
  availableCharts: IChartMeta[] = DATA.availableCharts;
  showTools: boolean = true;
  showDefinition: boolean = false;
  lineToolValue: number;
  probabilities: any;
  crops = DATA.cropRequirements;
  selectedCrop: ICropRequirement;
  fullScreenView: boolean = true;
  columns = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public climatePrvdr: ClimateToolProvider,
    public modalCtrl: ModalController,
    private actions: ClimateToolActions
  ) {
    this._addSubscriptions();
***REMOVED***
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    this.actions.resetState();
***REMOVED***
  _addSubscriptions() {
    this.site$.takeUntil(this.componentDestroyed).subscribe(site => {
      if (site) {
        this.siteChanged(site);
    ***REMOVED***
  ***REMOVED***);
    this.activeChart$.takeUntil(this.componentDestroyed).subscribe(chart => {
      if (chart) {
        this.activeChart = chart;
        // update selected crop to pick new line tool value
        if (this.selectedCrop) {
          this.setCrop(this.selectedCrop);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  setChart(chart: IChartMeta) {
    this.actions.selectChart(chart);
***REMOVED***

  async siteChanged(site: ISite) {
    this.selectedSite = site;
***REMOVED***

  showAllCharts() {
    this.activeChart = null;
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
  // when manually setting line tool value unselect all crops
  setLineToolValue() {
    this.selectedCrop = null;
    this.lineToolValueChange();
***REMOVED***
  lineToolValueChange() {
    this.actions.updateSite({
      lineToolValue: this.lineToolValue
  ***REMOVED***);
    // this.climatePrvdr.setLineToolValue(this.lineToolValue);
    this.probabilities = this.climatePrvdr.calculateProbabilities(
      this.lineToolValue
    );
    console.log("probabilities", this.probabilities);
***REMOVED***
  setCrop(crop: ICropRequirement) {
    this.selectedCrop = crop;
    const yVar = this.activeChart.y;
    let lineToolValue;
    if (yVar == "Rainfall") {
      lineToolValue = this._calculateMean([crop.waterMin, crop.waterMax]);
  ***REMOVED***
    if (yVar == "Length") {
      lineToolValue = this._calculateMean([crop.daysMin, crop.daysMax]);
  ***REMOVED***
    // only update if not already set (i.e. only change once when updating crop and triggering function)
    if (lineToolValue != this.lineToolValue) {
      this.lineToolValue = lineToolValue;
      this.lineToolValueChange();
  ***REMOVED***
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

  // toggleFullScreen() {
  //   this.fullScreenView = !this.fullScreenView;
  //   console.log("resize?");
  //   console.log("screen", window.screen);
  //   if (!this.fullScreenView) {
  //     this.climatePrvdr.resize({
  //       height: window.screen.height - 80,
  //       width: window.screen.width - 20
  //   ***REMOVED***);
  // ***REMOVED*** else {
  //     this.climatePrvdr.resize({
  //       height: 320,
  //       width: window.screen.width - 20
  //   ***REMOVED***);
  // ***REMOVED***
  // }
}
