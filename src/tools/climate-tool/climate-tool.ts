import { select } from "@angular-redux/store";
import { Component } from "@angular/core";
import {
  IonicPage,
  MenuController,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { Observable, Subscription } from "rxjs";
import { ClimateToolActions } from "./climate-tool.actions";
import * as DATA from "./climate-tool.data";
import { IChartMeta, ICropRequirement, ISite } from "./climate-tool.models";
import { ClimateToolProvider } from "./climate-tool.provider";

// import { CombinedProbabilityComponentModule} from './components/combined-probability/combined-probability.module'

@IonicPage({
  defaultHistory: ["HomePage", "ToolsPage"]
})
@Component({
  selector: "page-climate-tool",
  templateUrl: "climate-tool.html"
})
export class ClimateToolPage {
  @select(["climate", "site"])
  readonly site$: Observable<ISite>;
  siteSubscription: Subscription;
  @select(["climate", "chart"])
  readonly activeChart$: Observable<IChartMeta>;
  activeChartSubscription: Subscription;
  activeChart: IChartMeta;
  sites: any;
  selectedSite: ISite;
  selectedChart: string;
  availableCharts: IChartMeta[] = DATA.availableCharts;
  showTools: boolean = true;
  showDefinition: boolean = false;
  lineToolValue: number;
  probabilities: any;
  crops = DATA.cropRequirements;
  selectedCrop: ICropRequirement;
  fullScreenView: boolean = true;
  columns = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public climatePrvdr: ClimateToolProvider,
    public modalCtrl: ModalController,
    private actions: ClimateToolActions
  ) {
    this._addSubscriptions();
  }
  _addSubscriptions() {
    this.siteSubscription = this.site$.subscribe(site => {
      if (site) {
        this.siteChanged(site);
      }
    });
    this.activeChartSubscription = this.activeChart$.subscribe(chart => {
      if (chart) {
        this.activeChart = chart;
        // update selected crop to pick new line tool value
        if (this.selectedCrop) {
          this.setCrop(this.selectedCrop);
        }
      }
    });
  }
  _removeSubscriptions() {
    try {
      this.siteSubscription.unsubscribe();
      this.activeChartSubscription.unsubscribe();
    } catch (error) {}
  }
  ngOnDestroy() {
    this.actions.resetState();
    this._removeSubscriptions();
  }

  setChart(chart: IChartMeta) {
    this.actions.selectChart(chart);
  }

  async siteChanged(site: ISite) {
    this.selectedSite = site;
  }

  showAllCharts() {
    this.activeChart = null;
  }
  close() {
    this.navCtrl.pop();
  }
  selectSite() {
    this.actions.selectSite(null);
  }
  setAvailableCharts(list) {
    this.availableCharts = DATA.availableCharts;
  }
  // when manually setting line tool value unselect all crops
  setLineToolValue() {
    this.selectedCrop = null;
    this.lineToolValueChange();
  }
  lineToolValueChange() {
    this.actions.updateSite({
      lineToolValue: this.lineToolValue
    });
    // this.climatePrvdr.setLineToolValue(this.lineToolValue);
    this.probabilities = this.climatePrvdr.calculateProbabilities(
      this.lineToolValue
    );
    console.log("probabilities", this.probabilities);
  }
  setCrop(crop: ICropRequirement) {
    this.selectedCrop = crop;
    const yVar = this.activeChart.y;
    let lineToolValue;
    if (yVar == "Rainfall") {
      lineToolValue = this._calculateMean([crop.waterMin, crop.waterMax]);
    }
    if (yVar == "Length") {
      lineToolValue = this._calculateMean([crop.daysMin, crop.daysMax]);
    }
    // only update if not already set (i.e. only change once when updating crop and triggering function)
    if (lineToolValue != this.lineToolValue) {
      this.lineToolValue = lineToolValue;
      this.lineToolValueChange();
    }
  }

  _calculateMean(numbers: number[]) {
    // remove null values
    numbers = numbers.filter(n => {
      return n ? true : false;
    });
    let total = 0,
      i;
    for (i = 0; i < numbers.length; i += 1) {
      total += numbers[i];
    }
    return total / numbers.length;
  }

  // toggleFullScreen() {
  //   this.fullScreenView = !this.fullScreenView;
  //   console.log("resize?");
  //   console.log("screen", window.screen);
  //   if (!this.fullScreenView) {
  //     this.climatePrvdr.resize({
  //       height: window.screen.height - 80,
  //       width: window.screen.width - 20
  //     });
  //   } else {
  //     this.climatePrvdr.resize({
  //       height: 320,
  //       width: window.screen.width - 20
  //     });
  //   }
  // }
}
