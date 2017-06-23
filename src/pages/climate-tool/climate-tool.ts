import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { C3ChartProvider } from '../../providers/c3-chart/c3-chart';

@IonicPage()
@Component({
  selector: 'page-climate-tool',
  templateUrl: 'climate-tool.html',
})
export class ClimateToolPage {
  chart: any;
  sites:any;
  selectedSite:any;
  selectedChart:string;
  availableCharts:any;
  columns=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public c3Provider:C3ChartProvider, public modalCtrl:ModalController) {
    this.selectedSite={SiteName:'Select A Site'}
  }  

  ionViewDidLoad() {
    this.c3Provider.generate()
    this.sites=this.c3Provider.datasets
    console.log('sites',this.sites)
  }
  ionViewDidEnter(){
    // this.menuCtrl.open();
    this.selectSite();
  }
  siteChanged(){
    this.c3Provider.setDataset(this.selectedSite)
      .then(
        res=>{
          console.log('res',res);
          this.columns=res[0]
          this.setAvailableCharts(this.columns)
        },
        err=>{console.log('error',err)
        }
      )  
  }
  selectChart(){
    this.c3Provider.setChart(this.selectedChart)
  }
  close() {
    this.navCtrl.pop();
  }
  selectSite() {
    console.log('selecting site')
    let profileModal = this.modalCtrl.create('SiteSelectPage', { });
    profileModal.onDidDismiss(data => {
     console.log(data);
     this.selectedSite=this.sites[0]
     console.log('this.site',this.selectedSite)
     this.siteChanged()
   });
    profileModal.present();
  }
  setAvailableCharts(list){
    this.availableCharts=[
      {name:"Seasonal Rainfail",image:"season-rainfall.png",column:"Total Rainfall SeasonA"},
      {name:"Start of Season",image:"season-start.png",column:"StartSeason_A"},
      {name:"End of Season",image:"season-end.png",column:"EndSeason_A"},
      {name:"Length of Season",image:"season-length.png",column:"Length_of_Season_A"},
    ]
    }
}
