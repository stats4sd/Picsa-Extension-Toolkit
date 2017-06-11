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
  site: any;
  columnsObserver: any;
  constructor(public http: Http, private file: File, private platform: Platform) {
    console.log('platforms', this.platform.platforms())


    this.loadData()
  }
  loadData() {
    if (this.platform.is('core')) {
      //use file api
      console.log('loading demo data')
      this.datasets = sampleDatasets
    }
    if (this.platform.is('mobile')) {
      //use cordova
      this.file.checkDir(this.file.dataDirectory, 'mydir')
        .then(_ => console.log('Directory exists'))
        .catch(err => console.log('Directory doesnt exist'));
    }

  }

  generate() {
    console.log('generating site', this.site)
    var s = this.site
    if (s) {
      this.chart = c3.generate({
        bindto: '#chart',
        data: {
          url: s.FilePath,
          x: 'Year'
        }
      });
    }

  }
  setDataset(site) {
    this.site = site
    //this.generate()
     return new Promise((resolve, reject) => {
      Papa.parse(site.FilePath, {
        download: true,
        dynamicTyping: true,
        complete: function (res, file) {
          this.siteData = res.data
          this.generate()
          resolve(this.siteData)
        }.bind(this),
        error:function(err){reject(err) }
      }, )
    })
  }
  setChart(chartType) {
    console.log('chart type', chartType)
  }
}

var seriesColors={
  SeasonRainfall: '#377eb8',
  LengthOfSeason: '#e41a1c',
  SeasonStart: '#984ea3',
  SeasonEnd: '#4daf4a',
}

let sampleDatasets = [
  {
    "SiteName": "Babile", "Latitude": 10.519819, "Longitude": -2.835273, "FilePath": "assets/datasets/Babile.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Bole", "Latitude": 9.0333, "Longitude": -2.4833, "FilePath": "assets/datasets/Bole.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Damango", "Latitude": 9.0833, "Longitude": -1.8167, "FilePath": "assets/datasets/Damango.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Navrongo", "Latitude": 10.894025, "Longitude": -1.092147, "FilePath": "assets/datasets/Navrongo.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Salaga", "Latitude": 8.552529, "Longitude": -0.518694, "FilePath": "assets/datasets/Salaga.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Vea", "Latitude": 10.866667, "Longitude": -0.85, "FilePath": "assets/datasets/Vea.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Wa", "Latitude": 10.060074, "Longitude": -2.509891, "FilePath": "assets/datasets/Wa.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Walewale", "Latitude": 10.35, "Longitude": -0.8, "FilePath": "assets/datasets/Walewale.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Yendi", "Latitude": 9.4450, "Longitude": -0.0093, "FilePath": "assets/datasets/Yendi.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
  {
    "SiteName": "Zuarungu", "Latitude": 10.7961, "Longitude": -0.8080, "FilePath": "assets/datasets/Zuarungu.csv"
    , "AvailableData": ["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]
  },
]
