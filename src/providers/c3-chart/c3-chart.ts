import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import * as c3 from 'c3';
import * as Papa from 'papaparse';
import { Platform } from 'ionic-angular';

declare let d3;

@Injectable()
export class C3ChartProvider {
  public datasets: any;
  public columns: any;
  public chart: any;
  public activeChart: any = {};
  public lineToolValues: any = {};
  public lineToolActive: boolean = false;
  site: any;
  columnsObserver: any;
  initialRender: boolean = true;
  crops: any;
  constructor(public http: Http, private file: File, private platform: Platform) {
    this.activeChart.x = "Rainfall"
    this.loadData()
    this.crops = [
      { index:0,name: 'Maize', waterMin: 500, waterMax: 800, waterAvg: 720, lengthAvg: 60, image: "assets/img/crops/maize.jpg" },
      { index:1,name: 'Groundnuts', waterMin: 500, waterMax: 700, waterAvg: 600, lengthAvg: 90, image: "assets/img/crops/groundnuts.jpg" },
      { index:2,name: 'Sorghum', waterMin: 450, waterMax: 650, waterAvg: 550, lengthAvg: 120, image: "assets/img/crops/sorghum.jpg" },
    ]
  }
  loadData() {
    if (this.platform.is('core')) {
      //use file api
      console.log('loading demo data')
      
    }
    if (this.platform.is('mobile')) {
      //use cordova
      this.file.checkDir(this.file.dataDirectory, 'mydir')
        .then(_ => console.log('Directory exists'))
        .catch(err => console.log('Directory doesnt exist'));
    }
  }

  generate(x) {
    console.log('active chart',this.activeChart)
    var s = this.site
    var keys = []
    for (let key in s.summaries[0]) { keys.push(key) }
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        json: s.summaries,
        hide: true,
        keys: {
          value: keys
        },
        x:'Year',
        classes: { LineTool: 'LineTool' },
        color: function (color, d) {
          if (d.value >= this.lineToolValues[this.activeChart.x]) {
            return '#739B65'
          }
          if (d.value < this.lineToolValues[this.activeChart.x]) {
            return '#BF7720'
          }
          return seriesColors[this.activeChart.x]
        }.bind(this)
      },
      axis: {
        y: {
          tick: {
            format: function (d) {

              return this.formatAxis(d, this.activeChart.yFormat)
            }.bind(this)
          }
        }
      },
      legend: {
        hide:true
      },
      point: {
        r: function (d) {
          // if(d.value>this.lineToolValue){
          //   return 8
          // }
          return 5
        }.bind(this)
      },
      onrendered: function () {
        this.firstRender()
      }.bind(this)
    })
    //this.chart.show("SeasonA")
    // this.chart.show("Year")

  }

  firstRender() {
    if (this.initialRender) {
      // this.setChart({ x: 'Total Rainfall SeasonA' })
      this.initialRender = false
    }
  }
  setDataset(site) {
    this.site = site
    console.log('loading file', site.filePath)
    //try to load cache first
    //load from csv
    return new Promise((resolve, reject) => {
      Papa.parse(site.filePath, {
        download: true,
        dynamicTyping: true,
        header: true,
        complete: function (res, file) {
          this.site.summaries = res.data
          //process data
          console.log('site', this.site)
          //create first dummy set
          this.generate('Rainfall')
          resolve(this.site)
        }.bind(this),
        error: function (err) { reject(err) }
      }, )
    })
  }

  setChart(chart) {
    if (this.chart) {
      console.log('setting chart', chart.x)
      this.activeChart = chart
      this.chart.hide();
      this.chart.legend.hide();
      this.chart.show(chart.x, {withLegend: true});
    }
  }
  setLineToolValue(value) {
    this.lineToolValues[this.activeChart.x] = value
    var lineArray = Array(this.site.summaries.length).fill(value)
    lineArray.unshift('LineTool')
    this.chart.load({
      columns: [lineArray],
      classes: { LineTool: 'LineTool' }
    });
    this.chart.show('LineTool', { withLegend: true });
  }
  calculateProbabilities(value) {
    let points = this.chart.data.values(this.activeChart.x)
    let above = 0, below = 0, ratio = [0, 0]
    for (let point of points) {
      if (point != null) {
        if (point >= value) { above++ }
        else { below++ }
      }
    }
    var percentage = (above / (above + below));
    var reversePercentage = 1-percentage;
    var i = Math.round((below + above) / (above))
    var j = Math.round((below + above) / (below))
    if (above != 0 && above <= below) { ratio = [1, i - 1] }
    if (below != 0 && below <= above) { ratio = [j - 1, 1] }
    var tens = {
      above: Array(Math.round(percentage * 10)).fill(1),
      below: Array(Math.round(reversePercentage * 10)).fill(-1),
      value: Math.round(percentage*10)*10
    }
    return {
      above: above,
      below: below,
      percentage: percentage,
      reversePercentage: reversePercentage,
      ratio: ratio,
      tens: tens
    }
  }
  calculateProbability(conditions) {
    //conditions are defined in format {key1:valueToTest1, key2:valueToTest2...}
    var data = this.site.summaries
    console.log('data',data)
    //remove values where conditions aren't known - current assumes null values non-numerical (e.g. string or null, may want to change later)
    for (let condition of conditions) {
      console.log('testing condition',condition)
      var key = condition.key;
      var value = condition.value
      data = data.filter(element => {
        return typeof(element[key]) == 'number'
      });
    }
    //filter based on coditions
    var length = data.length
    for (let condition of conditions) {
      var key = condition.key;
      var value = condition.value
      if (condition.operator == '>=') {
        data = data.filter(element => {
          return element[key] >= value
        });
      }
      if (condition.operator == '<=') {
        data = data.filter(element => {
          return element[key] <= value
        });
      }
    }
    var percentage = data.length / length
    var colors = {
      0: '#BF7720',
      10: '#B77A26',
      20: '#AF7E2D',
      30: '#A88134',
      40: '#A0853B',
      50: '#998942',
      60: '#918C49',
      70: '#899050',
      80: '#829357',
      90: '#7A975E',
      100: '#739B65'
    }
    var color = colors[Math.round(percentage*10)*10]
    return {
      results:data,
      percentage: percentage,
      reversePercentage: 1 - percentage,
      color : color
    }

  }
  formatAxis(value, type) {
    if (type == 'date-from-July') {
      //181 based on local met +182 and -1 for index starting at 0
      let dayNumber = (value + 181) % 366
      //simply converts number to day rough date value (same method as local met office)
      //initialise year
      let d = new Date(2001, 0)
      d.setDate(dayNumber)
      var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec","Jan"];
      var string = d.getDate()+'-'+monthNames[d.getMonth()]
      return string
    }
    else if (type == 'value') { return value }
    else return value
  }
}

var seriesColors = {
  "Rainfall": '#377eb8',
  "Start": '#e41a1c',
  "End": '#984ea3',
  "Length": '#4daf4a',
}

