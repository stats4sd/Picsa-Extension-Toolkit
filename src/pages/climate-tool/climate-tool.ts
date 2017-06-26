import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { C3ChartProvider } from '../../providers/c3-chart/c3-chart';


@IonicPage()
@Component({
  selector: 'page-climate-tool',
  templateUrl: 'climate-tool.html',
})
export class ClimateToolPage{

  chart: any;
  sites:any;
  selectedSite:any;
  selectedChart:string;
  availableCharts:any;
  showTools:boolean=false;
  lineToolValue:number;
  probabilities:any;
  activeChart:any;
  crops:any;
  selectedCrop:any={};
  columns=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public c3Provider:C3ChartProvider, public modalCtrl:ModalController) {
    this.selectedSite={SiteName:'Select A Site'}
    this.crops=[
      {name:'Maize', waterMin:500, waterMax:800, waterAvg:650, image: "assets/img/crops/maize.jpg"},
      {name:'Groundnuts', waterMin:500, waterMax:700, waterAvg:600,image: "assets/img/crops/groundnuts.jpg"},
      {name:'Sorghum', waterMin:450, waterMax:650, waterAvg:550,image: "assets/img/crops/sorghum.jpg"},
    ]
  }

    ionViewDidLoad() {
    // this.c3Provider.generate()
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
          this.columns=res[0]
          this.setAvailableCharts(this.columns)
        },
        err=>{console.log('error',err)
        }
      )  
  }
  setChart(chart){
    this.activeChart=chart
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
     console.log(data);
     this.selectedSite=this.sites[0]
     console.log('this.site',this.selectedSite)
     this.siteChanged()
   });
    profileModal.present();
  }
  setAvailableCharts(list){
    this.availableCharts=[
      {name:"Seasonal Rainfall",image:"assets/img/charts/season-rainfall.png",x:"Total Rainfall SeasonA",yFormat:"value",tools:{line:true}},
      {name:"Start of Season",image:"assets/img/charts/season-start.png",x:"StartSeason_A",yFormat:"date",tools:{line:true}},
      {name:"End of Season",image:"assets/img/charts/season-end.png",x:"EndSeason_A",yFormat:"date",tools:{line:true}},
      {name:"Length of Season",image:"assets/img/charts/season-length.png",x:"Length_of_Season_A",yFormat:"value",tools:{line:true}},
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
