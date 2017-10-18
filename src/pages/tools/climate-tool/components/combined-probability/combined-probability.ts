import { Component } from '@angular/core';
import { C3ChartProvider } from '../../../../../providers/c3-chart/c3-chart';

@Component({
  selector: 'combined-probability',
  templateUrl: 'combined-probability.html'
})
export class CombinedProbabilityComponent {

  plantDate: any;
  labels: any;
  crops: any;
  startProbability: any = { reversePercentage: null ***REMOVED***
  lengthProbability: any = { reversePercentage: null ***REMOVED***
  selectedCrop: any = {***REMOVED***
  dayValue: number;
  test: string = 'red';

  constructor(public c3Provider:C3ChartProvider) {
    this.plantDate = {min: 1, max: 8, value:3, step:1}
    this.labels = {
      1: 'Week 1, November',
      2: 'Week 2, November',
      3: 'Week 3, November',
      4: 'Week 4, November',
      5: 'Week 1, December',
      6: 'Week 2, December',
      7: 'Week 3, December',
      8: 'Week 4, December',
  ***REMOVED***
    this.crops = this.c3Provider.crops
    for (let crop of this.crops) {
      this.crops[crop.index].lengthProbability = {reversePercentage:null***REMOVED***
      this.crops[crop.index].rainfallProbability = {reversePercentage:null***REMOVED***
  ***REMOVED***
***REMOVED***
  plantDateChange(e) {
    //manually set 1 October as day 274 and multiple by 7.6 (rough number of days in 1/4 month)
    this.dayValue = 305+(365/48)*this.plantDate.value
    this.startProbability = this.c3Provider.calculateProbability([{key:'Start',value:this.dayValue,operator:'<='}])
    this.calculateCropProbabilities();
    console.log('start probability', this.startProbability)
    console.log('day value',this.dayValue)
***REMOVED***
  calculateCropProbabilities() {
    for (let crop of this.crops) {
      this.crops[crop.index].lengthProbability = this.c3Provider.calculateProbability(
        [
          { key: 'End', value: (this.dayValue+crop.lengthAvg)%366, operator: ">=" }
        ]
      )
      this.crops[crop.index].rainfallProbability = this.c3Provider.calculateProbability([
        { key:'Rainfall', value:crop.waterAvg*(1+this.plantDate.value/16), operator:">=" }
      ]
      )
  ***REMOVED***
    console.log('this.crops',this.crops)
***REMOVED***


}
