import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {C3ChartProvider} from '../../providers/c3-chart/c3-chart'

@IonicPage()
@Component({
  selector: 'page-climate-tool',
  templateUrl: 'climate-tool.html',
})
export class ClimateToolPage {
  chart: any;
  sites:any;
  selectedSite:string;
  selectedChart:string;
  columns=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public c3Provider:C3ChartProvider) {

  }  

  ionViewDidLoad() {
    this.c3Provider.generate()
    this.sites=this.c3Provider.datasets
    console.log('sites',this.sites)
  }
  ionViewDidEnter(){
    this.menuCtrl.open();
  }
  siteChanged(){
    this.c3Provider.setDataset(this.selectedSite)
      .then(
        res=>{
          console.log('res',res);
          this.columns=res[0]
        },
        err=>{console.log('error',err)
        }
      )  
  }
  selectChart(){
    this.c3Provider.setChart(this.selectedChart)
  }

}
