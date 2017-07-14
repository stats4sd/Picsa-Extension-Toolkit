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
  activeChart: any = { name:null***REMOVED***
  crops:any;
  selectedCrop:any={***REMOVED***
  columns=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public c3Provider: C3ChartProvider,
    public modalCtrl: ModalController,
    public malawiData: MalawiDataProvider) {
    
***REMOVED***

  ionViewDidLoad() {
    // this.c3Provider.generate()
    this.sites=this.c3Provider.datasets
    console.log('sites', this.sites)
    this.selectedSite 
    this.crops = this.c3Provider.crops  
***REMOVED***
  ionViewDidEnter(){
    // this.menuCtrl.open();
    this.selectSite();
***REMOVED***
  siteChanged(){
    this.c3Provider.setDataset(this.selectedSite)
      .then(
        res=>{
          this.columns=res[0]
          this.setAvailableCharts(this.columns)
      ***REMOVED***,
        err=>{console.log('error',err)
      ***REMOVED***
      )  
***REMOVED***
  setChart(chart) {
    this.activeChart = {***REMOVED***
    this.activeChart = chart;
    console.log('activeChart',chart)
    this.c3Provider.setChart(chart)
    this.showTools=true;
    this.lineToolValue=null;
    this.selectedCrop={***REMOVED***    
***REMOVED***
  showAllCharts(){
    this.showTools=false
***REMOVED***
  close() {
    this.navCtrl.pop();
***REMOVED***
  selectSite() {
    let profileModal = this.modalCtrl.create('SiteSelectPage', { });
    profileModal.onDidDismiss(site => {
      console.log('site',site)
     this.selectedSite=site
     this.siteChanged()
 ***REMOVED***);
    profileModal.present();
***REMOVED***
  setAvailableCharts(list){
    this.availableCharts=[
      {name:"Seasonal Rainfall",image:"assets/img/charts/season-rainfall.png",x:"Rainfall",yFormat:"value",tools:{line:true}},
      {name:"Start of Season",image:"assets/img/charts/season-start.png",x:"Start",yFormat:"date-from-July",tools:{line:true}},
      {name:"End of Season",image:"assets/img/charts/season-end.png",x:"End",yFormat:"date-from-July",tools:{line:true}},
      { name: "Length of Season", image: "assets/img/charts/season-length.png", x: "Length", yFormat: "value", tools: { line: true } },
      { name: "Combined Risk", image: "assets/img/charts/combined-risk.png", page:"CombinedRiskPage" },
    ]
***REMOVED***
  lineToolValueChange(e?){
    //if manually input triggers event so deselect crop
    if(e!=undefined){this.selectedCrop={}}
    this.c3Provider.setLineToolValue(this.lineToolValue)
    this.probabilities = this.c3Provider.calculateProbabilities(this.lineToolValue)
    console.log('probabilities',this.probabilities)
***REMOVED***
  setCrop(crop){
    this.selectedCrop={}
    this.selectedCrop[crop.name]=true
    this.lineToolValue=crop.waterAvg;
    this.lineToolValueChange();
   
***REMOVED***
}
