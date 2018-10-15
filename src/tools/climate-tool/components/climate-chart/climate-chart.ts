import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import * as c3 from "c3";
import { Observable, Subscription } from "rxjs";
import { UtilsProvider } from "../../../../providers/utils";
import { AppState } from "../../../../reducers/reducers";
import { IChartMeta, IChartSummary } from "../../climate-tool.models";
import { availableCharts } from "../../data/availableCharts";

@Component({
  selector: "climate-chart",
  templateUrl: "climate-chart.html"
})
export class ClimateChartComponent {
  @select(["climate", "site", "summaries"])
  readonly chartData$: Observable<IChartSummary[]>;
  chartDataSubscription: Subscription;
  @select(["climate", "site", "lineToolValue"])
  readonly lineToolValue$: Observable<number>;
  lineToolValueSubscription: Subscription;
  @select(["climate", "chart"])
  readonly activeChart$: Observable<IChartMeta>;
  activeChartSubscription: Subscription;
  chart: any;
  lineToolValue: number;
  isFirstRender: boolean = true;
  activeChart: IChartMeta = availableCharts[0];

  constructor(
    private ngRedux: NgRedux<AppState>,
    private utils: UtilsProvider
  ) {
    this._addSubscriptions();
***REMOVED***

  _addSubscriptions() {
    console.log("adding climate chart subscriptions");
    this.chartDataSubscription = this.chartData$.subscribe(data => {
      if (data) {
        this.dataUpdated(data);
    ***REMOVED***
  ***REMOVED***);
    this.lineToolValueSubscription = this.lineToolValue$.subscribe(v => {
      if (v) {
        this.setLineToolValue(v);
    ***REMOVED***
  ***REMOVED***);
    this.activeChartSubscription = this.activeChart$.subscribe(chart => {
      if (chart) {
        this.setChart(chart);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
  // removing can sometimes cause whitescreen bug, removing until can be figured out
  // at least shouldn't add multiple subscribers due to this definition
  // _removeSubscriptions() {
  //   this.chartDataSubscription.unsubscribe();
  //   this.lineToolValueSubscription.unsubscribe();
  //   this.activeChartSubscription.unsubscribe();
  // }

  // when new data columns specified redraw any graphs
  // if no graph previously specified, default to rainfall
  dataUpdated(data: IChartSummary[]) {
    console.log("data updated", data);
    let view = "Rainfall";
    try {
      view = this.ngRedux.getState().climate.site.view;
  ***REMOVED*** catch (error) {}
    this.generateChart(data, view);
***REMOVED***

  // create chart given columns of data and a particular key to make visible
  generateChart(data: IChartSummary[], yAxis: string) {
    // generate chart keys from csv row titles
    console.log("generating chart");
    const keys = [];
    for (const key in data[0]) {
      keys.push(key);
  ***REMOVED***
    // generate chart
    this.chart = c3.generate({
      bindto: "#chart",
      size: {
        height: 320
    ***REMOVED***,
      padding: {
        right: 10
    ***REMOVED***,
      data: {
        json: data,
        hide: true,
        keys: {
          value: keys
      ***REMOVED***,
        x: "Year",
        classes: { LineTool: "LineTool" },
        color: (color, d) => {
          if (d.value >= this.lineToolValue) {
            return "#739B65";
        ***REMOVED***
          if (d.value < this.lineToolValue) {
            return "#BF7720";
        ***REMOVED***
          // default return color for series key, attached to d.id
          return seriesColors[d.id];
      ***REMOVED***
    ***REMOVED***,
      tooltip: {
        grouped: false,
        format: {
          value: function(value, ratio, id) {
            if (this.activeChart.yFormat == "value") {
              return `${parseInt(value).toString()} ${this.activeChart.units}`;
          ***REMOVED*** else {
              return `${this.formatAxis(value, this.activeChart.yFormat)} ${
                this.activeChart.units
            ***REMOVED***`;
          ***REMOVED***
        ***REMOVED***.bind(this)
      ***REMOVED***
    ***REMOVED***,
      axis: {
        x: {
          label: "Year"
      ***REMOVED***,
        y: {
          tick: {
            format: function(d) {
              return this.formatAxis(d, this.activeChart.yFormat);
          ***REMOVED***.bind(this)
        ***REMOVED***
          // label: `${this.activeChart.name} (${this.activeChart.units})`
      ***REMOVED***
    ***REMOVED***,
      legend: {
        hide: true
    ***REMOVED***,
      point: {
        r: d => {
          return 5;
      ***REMOVED***
    ***REMOVED***,
      onrendered: () => {
        this.firstRenderComplete();
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  firstRenderComplete() {
    if (this.isFirstRender) {
      console.log("first render complete");
      // set rainfall chart to initially show
      // this.actions.selectChart(this.activeChart);
      this.isFirstRender = false;
  ***REMOVED***
***REMOVED***

  resize(size) {
    console.log("resizing chart", size);
    this.chart.resize({
      height: size.height,
      width: size.width
  ***REMOVED***);
***REMOVED***

  setLineToolValue(value) {
    const data = this.ngRedux.getState().climate.site.summaries;
    this.lineToolValue = value;
    // this.lineToolValues[this.activeChart.y] = value;
    const lineArray = Array(data.length).fill(value);
    lineArray.unshift("LineTool");
    this.chart.load({
      columns: [lineArray],
      classes: { LineTool: "LineTool" }
  ***REMOVED***);
    this.chart.show("LineTool", { withLegend: true });
***REMOVED***

  async setChart(chart: IChartMeta) {
    await this.utils.presentLoader({
      content: "Loading..."
  ***REMOVED***);
    this.activeChart = chart;
    console.log("activeChart", chart);
    this.chart.hide();
    this.chart.legend.hide();
    this.chart.show(chart.y, { withLegend: true });
    this.utils.dismissLoader();
    // reload new line tool value
    if (this.lineToolValue && chart.tools.line) {
      this.setLineToolValue(this.lineToolValue);
  ***REMOVED***
***REMOVED***

  formatAxis(value, type) {
    if (type == "date-from-July") {
      //181 based on local met +182 and -1 for index starting at 0
      const dayNumber = (value + 181) % 366;
      //simply converts number to day rough date value (same method as local met office)
      //initialise year
      const d = new Date(2001, 0);
      d.setDate(dayNumber);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan"
      ];
      const string = `${d.getDate()}-${monthNames[d.getMonth()]}`;
      return string;
  ***REMOVED*** else if (type == "value") {
      return value;
  ***REMOVED*** else {
      return value;
  ***REMOVED***
***REMOVED***
}

const seriesColors = {
  Rainfall: "#377eb8",
  Start: "#e41a1c",
  End: "#984ea3",
  Length: "#4daf4a"
***REMOVED***
