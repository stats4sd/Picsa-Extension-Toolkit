import { select } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import * as Papa from "papaparse";
import { Observable, Subscription } from "rxjs";
import { ClimateToolActions } from "./climate-tool.actions";
import { IChartMeta, ISite } from "./climate-tool.models";

@Injectable()
export class ClimateToolProvider {
  @select(["climate", "site"])
  readonly site$: Observable<ISite>;
  siteSubscription: Subscription;
  @select(["climate", "chart"])
  readonly activeChart$: Observable<IChartMeta>;
  activeChartSubscription: Subscription;
  public activeSite: ISite;
  public activeChart: IChartMeta;
  public yValues: number[];
  site: any;
  constructor(private actions: ClimateToolActions) {
    this._addSubscriptions();
***REMOVED***

  ngOnDestroy() {
    this._removeSubscriptions();
***REMOVED***

  // when site changed load the relevant summaries and push to redux
  async _siteChanged(site: ISite) {
    if (!site.summaries) {
      const filePath = `assets/climate/summaries/${site.fileName}.csv`;
      site.summaries = await this.loadCSV(filePath);
      this.actions.selectSite(site);
  ***REMOVED***
***REMOVED***
  // when chart selected create list of chart-specific values from main site
  // summary data to use when quickly calculating probabilities
  _chartChanged(chart: IChartMeta) {
    const selectedAxis = chart.y;
    const yValues = this.activeSite.summaries.map(v => {
      return v[selectedAxis];
  ***REMOVED***);
    this.yValues = yValues;
***REMOVED***

  async loadCSV(filePath) {
    console.log("loading csv", filePath);
    return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        dynamicTyping: true,
        header: true,
        complete: function(res, file) {
          // resolve(this.site);
          resolve(res.data);
      ***REMOVED***.bind(this),
        error: function(err) {
          console.error("err", err);
          reject(err);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  // given a line tool value lookup the existing values and return probability information
  // based on how many points are above and below the given value
  // various outputs used to assist rendering graphics (e.g. number arrays and reverse %)
  calculateProbabilities(value) {
    console.log("calculating provbabilities", value);
    console.log("yValues", this.yValues);
    const points = this.yValues;
    let above = 0,
      below = 0,
      ratio = [0, 0];
    for (const point of points) {
      if (point != null) {
        if (point >= value) {
          above++;
      ***REMOVED*** else {
          below++;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
    const percentage = above / (above + below);
    const reversePercentage = 1 - percentage;
    const i = Math.round((below + above) / above);
    const j = Math.round((below + above) / below);
    if (above != 0 && above <= below) {
      ratio = [1, i - 1];
  ***REMOVED***
    if (below != 0 && below <= above) {
      ratio = [j - 1, 1];
  ***REMOVED***
    const tens = {
      above: Array(Math.round(percentage * 10)).fill(1),
      below: Array(Math.round(reversePercentage * 10)).fill(-1),
      value: Math.round(percentage * 10) * 10
  ***REMOVED***;
    return {
      above: above,
      below: below,
      percentage: percentage,
      reversePercentage: reversePercentage,
      ratio: ratio,
      tens: tens
  ***REMOVED***;
***REMOVED***

  // used by combined probabilty component (not currently in use)
  calculateCombinedProbability(conditions) {
    //conditions are defined in format {key1:valueToTest1, key2:valueToTest2...}
    let data = this.site.summaries;
    console.log("data", data);
    //remove values where conditions aren't known - current assumes null values non-numerical (e.g. string or null, may want to change later)
    for (const condition of conditions) {
      console.log("testing condition", condition);
      const key = condition.key;
      const value = condition.value;
      data = data.filter(element => {
        return typeof element[key] == "number";
    ***REMOVED***);
  ***REMOVED***
    //filter based on coditions
    const length = data.length;
    for (const condition of conditions) {
      const key = condition.key;
      const value = condition.value;
      if (condition.operator == ">=") {
        data = data.filter(element => {
          return element[key] >= value;
      ***REMOVED***);
    ***REMOVED***
      if (condition.operator == "<=") {
        data = data.filter(element => {
          return element[key] <= value;
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
    const percentage = data.length / length;
    const colors = {
      0: "#BF7720",
      10: "#B77A26",
      20: "#AF7E2D",
      30: "#A88134",
      40: "#A0853B",
      50: "#998942",
      60: "#918C49",
      70: "#899050",
      80: "#829357",
      90: "#7A975E",
      100: "#739B65"
  ***REMOVED***;
    const color = colors[Math.round(percentage * 10) * 10];
    return {
      results: data,
      percentage: percentage,
      reversePercentage: 1 - percentage,
      color: color
  ***REMOVED***;
***REMOVED***

  _addSubscriptions() {
    this.activeChartSubscription = this.activeChart$.subscribe(chart => {
      if (chart) {
        this.activeChart = chart;
        this._chartChanged(chart);
    ***REMOVED***
  ***REMOVED***);
    this.siteSubscription = this.site$.subscribe(site => {
      if (site) {
        this.activeSite = site;
        this._siteChanged(site);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
  _removeSubscriptions() {
    console.log("removing chart provider subscriptions");
    this.activeChartSubscription.unsubscribe();
    this.siteSubscription.unsubscribe();
***REMOVED***
}
