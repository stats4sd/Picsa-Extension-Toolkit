import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { C3ChartProvider } from '../../../providers/c3-chart/c3-chart';
import { MalawiDataProvider } from '../../../providers/c3-chart/malawi-data';
import { CombinedRiskComponentModule} from './components/combined-risk/combined-risk.module'

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public c3Provider: C3ChartProvider,
    public modalCtrl: ModalController,
    public malawiData: MalawiDataProvider) {
    
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
    profileModal.onDidDismiss(site => {
      console.log('site',site)
     this.selectedSite=site
     this.siteChanged()
   });
    profileModal.present();
  }
  setAvailableCharts(list){
    this.availableCharts=[
      {name:"Seasonal Rainfall",image:"assets/img/charts/season-rainfall.png",x:"Rainfall",yFormat:"value",tools:{line:true}},
      {name:"Start of Season",image:"assets/img/charts/season-start.png",x:"Start",yFormat:"date",tools:{line:true}},
      {name:"End of Season",image:"assets/img/charts/season-end.png",x:"End",yFormat:"date",tools:{line:true}},
      { name: "Length of Season", image: "assets/img/charts/season-length.png", x: "Length", yFormat: "value", tools: { line: true } },
      { name: "Combined Risk", image: "assets/img/charts/combined-risk.png", page:"CombinedRiskPage" },
    ]
  }
  lineToolValueChange(e?){
    //if manually input triggers event so deselect crop
    if(e!=undefined){this.selectedCrop={}}
    this.c3Provider.setLineToolValue(this.lineToolValue)
    this.probabilities = this.c3Provider.calculateProbabilities(this.lineToolValue)
    console.log('probabilities',this.probabilities)
  }
  setCrop(crop){
    this.selectedCrop={}
    this.selectedCrop[crop.name]=true
    this.lineToolValue=crop.waterAvg;
    this.lineToolValueChange();
   
  }
}
