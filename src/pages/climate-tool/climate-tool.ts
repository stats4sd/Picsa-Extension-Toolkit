import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { C3ChartProvider } from '../../providers/c3-chart/c3-chart';
import { CombinedRiskComponent} from './components/combined-risk/combined-risk'

@IonicPage()
@Component({
  selector: 'page-climate-tool',
  templateUrl: 'climate-tool.html',
})
export class ClimateToolPage{

  chart: any;
  sites:any;
  selectedSite: any = { SiteName: 'Select A Site' }
  selectedChart:string;
  availableCharts:any;
  showTools:boolean=false;
  lineToolValue:number;
  probabilities:any;
  activeChart: any = { name:null};
  crops:any;
  selectedCrop:any={};
  columns=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public c3Provider:C3ChartProvider, public modalCtrl:ModalController) {
    
  }

  ionViewDidLoad() {
    // this.c3Provider.generate()
    this.sites=this.c3Provider.datasets
    console.log('sites', this.sites)
    this.selectedSite 
    this.crops = this.c3Provider.crops  
  }
  ionViewDidEnter(){
    // this.menuCtrl.open();
    this.selectSite();
  }
  siteChanged(){
    this.c3Provider.setDataset(this.selectedSite)
      .then(
        res=>{
          this.columns=res[0]
          this.setAvailableCharts(this.columns)
        },
        err=>{console.log('error',err)
        }
      )  
  }
  setChart(chart) {
    this.activeChart = {};
    this.activeChart = chart;
    console.log('activeChart',chart)
    this.c3Provider.setChart(chart)
    this.showTools=true;
    this.lineToolValue=null;
    this.selectedCrop={};    
  }
  showAllCharts(){
    this.showTools=false
  }
  close() {
    this.navCtrl.pop();
  }
  selectSite() {
    let profileModal = this.modalCtrl.create('SiteSelectPage', { });
    profileModal.onDidDismiss(data => {
     this.selectedSite=this.sites[0]
     this.siteChanged()
   });
    profileModal.present();
  }
  setAvailableCharts(list){
    this.availableCharts=[
      {name:"Seasonal Rainfall",image:"assets/img/charts/season-rainfall.png",x:"Total Rainfall SeasonA",yFormat:"value",tools:{line:true}},
      {name:"Start of Season",image:"assets/img/charts/season-start.png",x:"StartSeason_A",yFormat:"date",tools:{line:true}},
      {name:"End of Season",image:"assets/img/charts/season-end.png",x:"EndSeason_A",yFormat:"date",tools:{line:true}},
      { name: "Length of Season", image: "assets/img/charts/season-length.png", x: "Length_of_Season_A", yFormat: "value", tools: { line: true } },
      { name: "Combined Risk", image: "assets/img/charts/combined-risk.png", page:"CombinedRiskPage" },
    ]
  }
  lineToolValueChange(e?){
    //if manually input triggers event so deselect crop
    if(e!=undefined){this.selectedCrop={}}
    console.log('e',e)
    this.c3Provider.setLineToolValue(this.lineToolValue)
    this.probabilities = this.c3Provider.calculateProbabilities(this.lineToolValue)
  }
  setCrop(crop){
    this.selectedCrop={}
    this.selectedCrop[crop.name]=true
    this.lineToolValue=crop.waterAvg;
    this.lineToolValueChange();
   
  }
}
