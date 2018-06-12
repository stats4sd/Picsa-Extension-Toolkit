import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  MenuController,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { C3ChartProvider } from "../../../providers/c3-chart/c3-chart";
import { MalawiDataProvider } from "../../../providers/c3-chart/malawi-data";
// import { CombinedProbabilityComponentModule} from './components/combined-probability/combined-probability.module'

@IonicPage()
@Component({
  selector: "page-climate-tool",
  templateUrl: "climate-tool.html"
})
export class ClimateToolPage {
  chart: any;
  sites: any;
  selectedSite: any = { SiteName: "Select A Site" };
  selectedChart: string;
  availableCharts: any;
  showTools: boolean = false;
  showDefinition: boolean = true;
  lineToolValue: number;
  probabilities: any;
  activeChart: any = { name: null };
  crops: any;
  selectedCrop: any = {};
  fullScreenView: boolean = true;
  columns = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public c3Provider: C3ChartProvider,
    public modalCtrl: ModalController,
    public malawiData: MalawiDataProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    // this.c3Provider.generate()
    this.sites = this.c3Provider.datasets;
    console.log("sites", this.sites);
    this.selectedSite;
    this.crops = this.c3Provider.crops;
  }
  ionViewDidEnter() {
    // this.menuCtrl.open();
    this.selectSite();
  }
  toggleFullScreen() {
    this.fullScreenView = !this.fullScreenView;
    console.log("resize?");
    console.log("screen", window.screen);
    if (!this.fullScreenView) {
      this.c3Provider.resize({
        height: window.screen.height - 80,
        width: window.screen.width - 20
      });
    } else {
      this.c3Provider.resize({
        height: 320,
        width: window.screen.width - 20
      });
    }
  }

  siteChanged() {
    this.c3Provider.setDataset(this.selectedSite).then(
      res => {
        this.columns = res[0];
        this.setAvailableCharts(this.columns);
      },
      err => {
        console.log("error", err);
      }
    );
  }
  setChart(chart) {
    if (chart.name != this.activeChart.name) {
      const loader = this.loadingCtrl.create({
        content: "Loading...",
        duration: 3000
      });
      loader.present().then(() => {
        this.activeChart = {};
        this.activeChart = chart;
        console.log("activeChart", chart);
        this.c3Provider.setChart(chart);
        this.showTools = true;
        this.lineToolValue = null;
        this.selectedCrop = {};
      });
    } else {
      this.showTools = true;
    }
  }
  showAllCharts() {
    this.showTools = false;
  }
  close() {
    this.navCtrl.pop();
  }
  selectSite() {
    const profileModal = this.modalCtrl.create(
      "SiteSelectPage",
      {},
      { enableBackdropDismiss: false }
    );
    profileModal.onDidDismiss(site => {
      console.log("site", site);
      this.selectedSite = site;
      this.siteChanged();
    });
    profileModal.present();
  }
  setAvailableCharts(list) {
    this.availableCharts = [
      {
        name: "Seasonal Rainfall",
        image: "assets/img/charts/season-rainfall.png",
        cropTableValue: "water",
        x: "Rainfall",
        yFormat: "value",
        tools: { line: true },
        units: "mm",
        definition:
          "Seasonal rainfall is defined as the total rain recorded from the start of the season until the end of the season"
      },
      {
        name: "Start of Season",
        image: "assets/img/charts/season-start.png",
        x: "Start",
        yFormat: "date-from-July",
        tools: { line: false },
        units: "",
        definition:
          "Start of season is defined as the first occasion (from 1st October) with more than 25mm in a 3 day period and no dry spell of 10 days or more within the following 30 days"
      },
      {
        name: "End of Season",
        image: "assets/img/charts/season-end.png",
        x: "End",
        yFormat: "date-from-July",
        tools: { line: false },
        units: "",
        definition:
          "End of season is defined as the last day in the season (1st October - 30th April) with more than 10mm of rainfall."
      },
      {
        name: "Length of Season",
        image: "assets/img/charts/season-length.png",
        cropTableValue: "length",
        x: "Length",
        yFormat: "value",
        tools: { line: true },
        units: "days",
        definition:
          "Length of season is defined as the total days from the start of the season until the end of the season as defined"
      }
      // {name: "Combined Probability", image: "assets/img/charts/combined-probability.png", page: "CombinedProbabilityPage", tools: { line: false }},
    ];
  }
  lineToolValueChange(e?) {
    //if manually input triggers event so deselect crop
    if (e != undefined) {
      this.selectedCrop = {};
    }
    this.c3Provider.setLineToolValue(this.lineToolValue);
    this.probabilities = this.c3Provider.calculateProbabilities(
      this.lineToolValue
    );
    console.log("probabilities", this.probabilities);
  }
  setCrop(crop) {
    this.selectedCrop = {};
    this.selectedCrop[crop.name] = true;
    this.lineToolValue = crop[this.activeChart.cropTableValue + "Avg"];
    this.lineToolValueChange();
  }
}
