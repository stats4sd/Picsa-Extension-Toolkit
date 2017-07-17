import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {StorageProvider } from '../storage/storage'
import 'rxjs/add/operator/map';

@Injectable()
export class BudgetToolProvider {
  allData: any;
  budget: any

  constructor(public http: Http, public storage:StorageProvider) {
    console.log('Hello BudgetToolProvider Provider');
    this.allData = allData
    this.createNewBudget()
***REMOVED***
  createNewBudget() {
    this.budget = {
      name: 'New Budget',
      created: new Date(),
      user: this.storage.user,
      data: [],
      id: this.storage.generatePushID()
  ***REMOVED***
    for (let i = 0; i < 12; i++) {
      var p = {
        index: 0,
        activities: [],
        inputs: [],
        outputs: [],
        familyLabour: { people: 0, days: 0 },
        balance: { income: 0, expenses: 0, net: 0 },
        runningTotal: { income: 0, expenses: 0, net: 0 }
    ***REMOVED***
      p.index = i + 1
      this.budget.data.push(p)
  ***REMOVED***
***REMOVED***
  save(budget) {
    // this.storage.set('','')
    
***REMOVED***
  load() {
    
***REMOVED***
}

var sampleBudget = [
  {
    index: 1,
    activities: [
      { "Type": "activity", "Name": "apply fertiliser", "Image": "assets/img/budget/activity/apply-fertiliser.png", "ID": "apply-fertiliser" },
      { "Type": "activity", "Name": "land clearing", "Image": "assets/img/budget/activity/land-clearing.png", "ID": "land-clearing" },
    ],
    inputs: [
      { "Type": "input", "Name": "manure wheelbarrows", "Image": "assets/img/budget/input/manure-wheelbarrows.png", "ID": "manure-wheelbarrows", quantity: 5, cost: 200, consumed: 0 },
      { "Type": "input", "Name": "seeds", "Image": "assets/img/budget/input/seeds.png", "ID": "seeds", quantity: 1, cost: 500, consumed: 0 },
    ],
    outputs: [
      { "Type": "output", "Name": "crop", "Image": "assets/img/budget/output/crop.png", "ID": "crop", quantity: 6, cost: 200, consumed: 1 },
    ],
    familyLabour: {
      people: 3,
      days: 4
  ***REMOVED***,
***REMOVED***
  ,
  {
    index: 2,
    activities: [
      { "Type": "activity", "Name": "apply fertiliser", "Image": "assets/img/budget/activity/apply-fertiliser.png", "ID": "apply-fertiliser" },
    ],
    inputs: [
      { "Type": "input", "Name": "manure wheelbarrows", "Image": "assets/img/budget/input/manure-wheelbarrows.png", "ID": "manure-wheelbarrows", quantity: 5, cost: 200 },
    ],
    outputs: [
      { "Type": "output", "Name": "crop", "Image": "assets/img/budget/output/crop.png", "ID": "crop", quantity: 6, consumed: 1 },
    ],
    familyLabour: { people: 0, days: 0 },

***REMOVED***,
  {
    index: 3,
    activities: [
      { "Type": "activity", "Name": "apply fertiliser", "Image": "assets/img/budget/activity/apply-fertiliser.png", "ID": "apply-fertiliser" },
    ],
    inputs: [
      { "Type": "input", "Name": "manure wheelbarrows", "Image": "assets/img/budget/input/manure-wheelbarrows.png", "ID": "manure-wheelbarrows", quantity: 5, cost: 200 },
    ],
    outputs: [],
    familyLabour: { people: 0, days: 0 },

***REMOVED***,
  {
    index: 4,
    activities: [
      { "Type": "activity", "Name": "apply fertiliser", "Image": "assets/img/budget/activity/apply-fertiliser.png", "ID": "apply-fertiliser" },
    ],
    inputs: [
      { "Type": "input", "Name": "manure wheelbarrows", "Image": "assets/img/budget/input/manure-wheelbarrows.png", "ID": "manure-wheelbarrows", quantity: 5, cost: 200 },
    ],
    outputs: [],
    familyLabour: { people: 0, days: 0 },
***REMOVED***,
  {
    index: 5,
    activities: [
      { "Type": "activity", "Name": "apply fertiliser", "Image": "assets/img/budget/activity/apply-fertiliser.png", "ID": "apply-fertiliser" },
    ],
    inputs: [
      { "Type": "input", "Name": "manure wheelbarrows", "Image": "assets/img/budget/input/manure-wheelbarrows.png", "ID": "manure-wheelbarrows", quantity: 5, cost: 200 },
    ],
    outputs: [],
    familyLabour: { people: 0, days: 0 },
***REMOVED***,

]

var allData = {
  activities: [
    { "Type": "activity", "Name": "apply fertiliser", "Image": "assets/img/budget/activity/apply-fertiliser.png", "ID": "apply-fertiliser" },
    { "Type": "activity", "Name": "apply pesticide", "Image": "assets/img/budget/activity/apply-pesticide.png", "ID": "apply-pesticide" },
    { "Type": "activity", "Name": "bagging", "Image": "assets/img/budget/activity/bagging.png", "ID": "bagging" },
    { "Type": "activity", "Name": "compost manure making", "Image": "assets/img/budget/activity/compost-manure-making.png", "ID": "compost-manure-making" },
    { "Type": "activity", "Name": "harvesting", "Image": "assets/img/budget/activity/harvesting.png", "ID": "harvesting" },
    { "Type": "activity", "Name": "land clearing", "Image": "assets/img/budget/activity/land-clearing.png", "ID": "land-clearing" },
    { "Type": "activity", "Name": "marketing and selling", "Image": "assets/img/budget/activity/marketing-and-selling.png", "ID": "marketing-and-selling" },
    { "Type": "activity", "Name": "mulching", "Image": "assets/img/budget/activity/mulching.png", "ID": "mulching" },
    { "Type": "activity", "Name": "ploughing", "Image": "assets/img/budget/activity/ploughing.png", "ID": "ploughing" },
    { "Type": "activity", "Name": "shelling", "Image": "assets/img/budget/activity/shelling.png", "ID": "shelling" },
    { "Type": "activity", "Name": "sowing", "Image": "assets/img/budget/activity/sowing.png", "ID": "sowing" },
    { "Type": "activity", "Name": "storage", "Image": "assets/img/budget/activity/storage.png", "ID": "storage" },
    { "Type": "activity", "Name": "threshing", "Image": "assets/img/budget/activity/threshing.png", "ID": "threshing" },
    { "Type": "activity", "Name": "transport", "Image": "assets/img/budget/activity/transport.png", "ID": "transport" },
    { "Type": "activity", "Name": "watering", "Image": "assets/img/budget/activity/watering.png", "ID": "watering" },
    { "Type": "activity", "Name": "weeding", "Image": "assets/img/budget/activity/weeding.png", "ID": "weeding" },
  ],
  inputs: [
    { "Type": "input", "Name": "bags", "Image": "assets/img/budget/input/bags.png", "ID": "bags" },
    { "Type": "input", "Name": "chemicals", "Image": "assets/img/budget/input/chemicals.png", "ID": "chemicals" },
    { "Type": "input", "Name": "fertiliser", "Image": "assets/img/budget/input/fertiliser.png", "ID": "fertiliser" },
    { "Type": "input", "Name": "hire ox cart", "Image": "assets/img/budget/input/hire-ox-cart.png", "ID": "hire-ox-cart" },
    { "Type": "input", "Name": "labour - paid", "Image": "assets/img/budget/input/labour---paid.png", "ID": "labour---paid" },
    { "Type": "input", "Name": "manure sacks", "Image": "assets/img/budget/input/manure-sacks.png", "ID": "manure-sacks" },
    { "Type": "input", "Name": "manure wheelbarrows", "Image": "assets/img/budget/input/manure-wheelbarrows.png", "ID": "manure-wheelbarrows" },
    { "Type": "input", "Name": "pot for storage", "Image": "assets/img/budget/input/pot-for-storage.png", "ID": "pot-for-storage" },
    { "Type": "input", "Name": "protective equipment", "Image": "assets/img/budget/input/protective-equipment.png", "ID": "protective-equipment" },
    { "Type": "input", "Name": "seeds", "Image": "assets/img/budget/input/seeds.png", "ID": "seeds" },
    { "Type": "input", "Name": "sheller hire", "Image": "assets/img/budget/input/sheller-hire.png", "ID": "sheller-hire" },
    { "Type": "input", "Name": "tools", "Image": "assets/img/budget/input/tools.png", "ID": "tools" },
    { "Type": "input", "Name": "tractor hire", "Image": "assets/img/budget/input/tractor-hire.png", "ID": "tractor-hire" },
    { "Type": "input", "Name": "transportation hire", "Image": "assets/img/budget/input/transportation-hire.png", "ID": "transportation-hire" },
    { "Type": "input", "Name": "wood", "Image": "assets/img/budget/input/wood.png", "ID": "wood" },
  ],
  outputs: [
    { "Type": "output", "Name": "crop", "Image": "assets/img/budget/output/crop.png", "ID": "crop","consumed":0 },
    { "Type": "output", "Name": "manure for compost", "Image": "assets/img/budget/output/manure-for-compost.png", "ID": "manure-for-compost", "consumed": 0 },
    { "Type": "output", "Name": "money", "Image": "assets/img/budget/output/money.png", "ID": "money", "consumed": 0 },
    { "Type": "output", "Name": "wood", "Image": "assets/img/budget/output/wood.png", "ID": "wood", "consumed": 0 }
  ]
}
