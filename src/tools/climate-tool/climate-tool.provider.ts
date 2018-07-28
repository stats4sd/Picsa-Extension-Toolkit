import { Injectable } from "@angular/core";
import * as c3 from "c3";
import * as Papa from "papaparse";
import { ISite } from "../../models/models";

declare const d3;

@Injectable()
export class ClimateToolProvider {
  public datasets: any;
  public columns: any;
  public chart: c3.ChartAPI;
  public activeChart: any = {
    x: "Rainfall"
***REMOVED***;
  public lineToolValues: any = {***REMOVED***
  public lineToolActive: boolean = false;

  site: any;
  columnsObserver: any;
  initialRender: boolean = true;
  metaData: any;
  constructor() {}

  generate(xAxis: string) {
    console.log("active chart", this.activeChart);
    const s = this.site;
    const keys = [];
    for (const key in s.summaries[0]) {
      keys.push(key);
  ***REMOVED***
    this.chart = c3.generate({
      bindto: "#chart",
      size: {
        height: 320
    ***REMOVED***,
      data: {
        json: s.summaries,
        hide: true,
        keys: {
          value: keys
      ***REMOVED***,
        x: "Year",
        classes: { LineTool: "LineTool" },
        color: function(color, d) {
          if (d.value >= this.lineToolValues[this.activeChart.x]) {
            return "#739B65";
        ***REMOVED***
          if (d.value < this.lineToolValues[this.activeChart.x]) {
            return "#BF7720";
        ***REMOVED***
          return seriesColors[this.activeChart.x];
      ***REMOVED***.bind(this)
    ***REMOVED***,
      tooltip: {
        grouped: false,
        format: {
          // title: function (d) { return 'Data ' + d; },
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
        y: {
          tick: {
            format: function(d) {
              return this.formatAxis(d, this.activeChart.yFormat);
          ***REMOVED***.bind(this)
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***,
      legend: {
        hide: true
    ***REMOVED***,
      point: {
        r: function(d) {
          // if(d.value>this.lineToolValue){
          //   return 8
          // }
          return 5;
      ***REMOVED***.bind(this)
    ***REMOVED***,

      onrendered: function() {
        this.firstRender();
    ***REMOVED***.bind(this)
  ***REMOVED***);
    //this.chart.show("SeasonA")
    // this.chart.show("Year")
***REMOVED***

  firstRender() {
    if (this.initialRender) {
      this.initialRender = false;
  ***REMOVED***
***REMOVED***

  setDataset(site: ISite) {
    this.site = site;
    console.log("loading file", site.filePath);
    //try to load cache first
    //load from csv
    return new Promise((resolve, reject) => {
      Papa.parse(site.filePath, {
        download: true,
        dynamicTyping: true,
        header: true,
        complete: function(res, file) {
          this.site.summaries = res.data;
          //process data
          console.log("site", this.site);
          //create first dummy set
          this.generate("Rainfall");
          resolve(this.site);
      ***REMOVED***.bind(this),
        error: function(err) {
          reject(err);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  setChart(chart) {
    if (this.chart) {
      console.log("setting chart", chart.x);
      this.activeChart = chart;
      this.chart.hide();
      this.chart.legend.hide();
      this.chart.show(chart.x, { withLegend: true });
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
    this.lineToolValues[this.activeChart.x] = value;
    const lineArray = Array(this.site.summaries.length).fill(value);
    lineArray.unshift("LineTool");
    this.chart.load({
      columns: [lineArray],
      classes: { LineTool: "LineTool" }
  ***REMOVED***);
    this.chart.show("LineTool", { withLegend: true });
***REMOVED***
  calculateProbabilities(value) {
    const points = this.chart.data.values(this.activeChart.x);
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
  calculateProbability(conditions) {
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
  getMetaData() {
    alert("no get meta data function");
    // return new Promise(resolve => {
    //   if (this.metaData) {
    //     resolve(this.metaData);
    // ***REMOVED*** else {
    //     this.loadFile("assets/datasets/metadata.json").then(res => {
    //       this.metaData = res;
    //       resolve(this.metaData);
    //   ***REMOVED***);
    // ***REMOVED***
    // });
***REMOVED***

  loadFile(url) {
    alert("no load file function");
    //   if (!this.metaData) {
    //     return new Promise(resolve => {
    //       this.http.get(url).subscribe(data => {
    //         resolve(data);
    //     ***REMOVED***);
    //   ***REMOVED***);
    // ***REMOVED***
***REMOVED***
}

const seriesColors = {
  Rainfall: "#377eb8",
  Start: "#e41a1c",
  End: "#984ea3",
  Length: "#4daf4a"
***REMOVED***
