import { Component } from '@angular/core';
import { C3ChartProvider } from '../../../../providers/c3-chart/c3-chart';

@Component({
  selector: 'combined-risk',
  templateUrl: 'combined-risk.html'
})
export class CombinedRiskComponent {

  plantDate: any;
  labels: any;
  crops: any;
  startProbability: any = { reversePercentage: null ***REMOVED***
  lengthProbability: any = { reversePercentage: null ***REMOVED***
  selectedCrop: any = {***REMOVED***
  dayValue: number;
  test: string = 'red';

  constructor(public c3Provider:C3ChartProvider) {
    this.plantDate = {min: 1, max: 16, value:5, step:1}
    this.labels = {
      1: 'Week 1, March',
      2: 'Week 2, March',
      3: 'Week 3, March',
      4: 'Week 4, March',
      5: 'Week 1, April',
      6: 'Week 2, April',
      7: 'Week 3, April',
      8: 'Week 4, April',
      9: 'Week 1, May',
      10: 'Week 2, May',
      11: 'Week 3, May',
      12: 'Week 4, May',
      13: 'Week 1, June',
      14: 'Week 2, June',
      15: 'Week 3, June',
      16: 'Week 4, June',
  ***REMOVED***
    this.crops = this.c3Provider.crops
    for (let crop of this.crops) {
      this.crops[crop.index].lengthProbability = {reversePercentage:null***REMOVED***
      this.crops[crop.index].rainfallProbability = {reversePercentage:null***REMOVED***
  ***REMOVED***
***REMOVED***
  plantDateChange(e) {
    //manually set 1 march as day 60 and multiple by 7.6 (rough number of days in 1/4 month)
    this.dayValue = 60+(365/48)*this.plantDate.value
    this.startProbability = this.c3Provider.calculateProbability([{key:'StartSeason_A',value:this.dayValue,operator:'<='}])
    this.calculateCropProbabilities();
***REMOVED***
  calculateCropProbabilities() {
    for (let crop of this.crops) {
      this.crops[crop.index].lengthProbability = this.c3Provider.calculateProbability(
        [
          { key: 'EndSeason_A', value: this.dayValue+crop.lengthAvg, operator: ">=" }
        ]
      )
      this.crops[crop.index].rainfallProbability = this.c3Provider.calculateProbability([
        { key:'Total Rainfall SeasonA', value:crop.waterAvg*(1+this.plantDate.value/16), operator:">=" }
      ]
      )
  ***REMOVED***
***REMOVED***
  setCrop(crop) {
    console.log('setting crop', crop)
***REMOVED***

}
