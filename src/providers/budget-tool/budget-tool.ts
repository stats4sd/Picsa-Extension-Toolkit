import { Injectable } from "@angular/core";
import { StorageProvider } from "../storage/storage";

@Injectable()
export class BudgetToolProvider {
  allData: any;
  budget: any;

  constructor(public storagePrvdr: StorageProvider) {
    console.log("Hello BudgetToolProvider Provider");
    this.allData = allData;
    //load saved cards
    this.storagePrvdr.loadUser().then(user => {
      console.log("user loaded", user);
      this.loadSavedCards();
  ***REMOVED***);
***REMOVED***

  loadSavedCards() {
    this.storagePrvdr.getAll("budgetCards").then((cards: any) => {
      console.log("loading saved cards", cards);
      for (let card of cards) {
        console.log("adding type", card.Types);
        card.userGenerated = true;
        this.allData[card.Types].push(card);
    ***REMOVED***
      console.log("all data", this.allData);
  ***REMOVED***);
***REMOVED***
  loadSampleBudget() {
    return sampleBudget;
***REMOVED***
}

var sampleBudget = {
  title: "My First Budget",
  archived: false,
  periods: {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    starting: "Mon",
    scale: "days",
    total: "6"
***REMOVED***,
  description: "description here",
  enterprise: "livestock",
  scale: "small",
  created: "2017-10-18T09:37:03.311Z",
  id: "-KwipyhEIqwRLbyU3sjF",
  data: [
    {
      label: "Mon",
      index: 0,
      activities: [],
      inputs: [],
      outputs: [],
      familyLabour: {
        people: 0,
        days: 0
    ***REMOVED***,
      balance: {
        inputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        outputs: [
          {
            ID: "crop",
            Image: "assets/img/budget/output/crop.png",
            Name: "crop",
            Type: "output",
            consumed: 0,
            cost: "50",
            quantity: "5"
        ***REMOVED***
        ],
        consumed: {
          total: 0,
          dots: []
      ***REMOVED***,
        monthly: {
          total: 0,
          dots: []
      ***REMOVED***,
        running: {
          total: 0,
          dots: []
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    {
      label: "Tue",
      index: 1,
      activities: [],
      inputs: [],
      outputs: [],
      familyLabour: {
        people: 0,
        days: 0
    ***REMOVED***,
      balance: {
        inputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        outputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        consumed: {
          total: 0,
          dots: []
      ***REMOVED***,
        monthly: {
          total: 0,
          dots: []
      ***REMOVED***,
        running: {
          total: 0,
          dots: []
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    {
      label: "Wed",
      index: 2,
      activities: [],
      inputs: [],
      outputs: [],
      familyLabour: {
        people: 0,
        days: 0
    ***REMOVED***,
      balance: {
        inputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        outputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        consumed: {
          total: 0,
          dots: []
      ***REMOVED***,
        monthly: {
          total: 0,
          dots: []
      ***REMOVED***,
        running: {
          total: 0,
          dots: []
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    {
      label: "Thur",
      index: 3,
      activities: [],
      inputs: [],
      outputs: [],
      familyLabour: {
        people: 0,
        days: 0
    ***REMOVED***,
      balance: {
        inputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        outputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        consumed: {
          total: 0,
          dots: []
      ***REMOVED***,
        monthly: {
          total: 0,
          dots: []
      ***REMOVED***,
        running: {
          total: 0,
          dots: []
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    {
      label: "Fri",
      index: 4,
      activities: [],
      inputs: [],
      outputs: [],
      familyLabour: {
        people: 0,
        days: 0
    ***REMOVED***,
      balance: {
        inputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        outputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        consumed: {
          total: 0,
          dots: []
      ***REMOVED***,
        monthly: {
          total: 0,
          dots: []
      ***REMOVED***,
        running: {
          total: 0,
          dots: []
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    {
      label: "Sat",
      index: 5,
      activities: [],
      inputs: [],
      outputs: [],
      familyLabour: {
        people: 0,
        days: 0
    ***REMOVED***,
      balance: {
        inputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        outputs: {
          total: 0,
          dots: []
      ***REMOVED***,
        consumed: {
          total: 0,
          dots: []
      ***REMOVED***,
        monthly: {
          total: 0,
          dots: []
      ***REMOVED***,
        running: {
          total: 0,
          dots: []
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  ]
***REMOVED***

var allData = {
  activities: [
    {
      Type: "activity",
      Name: "apply fertiliser",
      Image: "assets/img/budget/activity/apply-fertiliser.png",
      ID: "apply-fertiliser"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "apply pesticide",
      Image: "assets/img/budget/activity/apply-pesticide.png",
      ID: "apply-pesticide"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "bagging",
      Image: "assets/img/budget/activity/bagging.png",
      ID: "bagging"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "compost manure making",
      Image: "assets/img/budget/activity/compost-manure-making.png",
      ID: "compost-manure-making"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "harvesting",
      Image: "assets/img/budget/activity/harvesting.png",
      ID: "harvesting"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "land clearing",
      Image: "assets/img/budget/activity/land-clearing.png",
      ID: "land-clearing"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "marketing and selling",
      Image: "assets/img/budget/activity/marketing-and-selling.png",
      ID: "marketing-and-selling"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "mulching",
      Image: "assets/img/budget/activity/mulching.png",
      ID: "mulching"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "ploughing",
      Image: "assets/img/budget/activity/ploughing.png",
      ID: "ploughing"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "shelling",
      Image: "assets/img/budget/activity/shelling.png",
      ID: "shelling"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "sowing",
      Image: "assets/img/budget/activity/sowing.png",
      ID: "sowing"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "storagePrvdr",
      Image: "assets/img/budget/activity/storage.png",
      ID: "storagePrvdr"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "threshing",
      Image: "assets/img/budget/activity/threshing.png",
      ID: "threshing"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "transport",
      Image: "assets/img/budget/activity/transport.png",
      ID: "transport"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "watering",
      Image: "assets/img/budget/activity/watering.png",
      ID: "watering"
  ***REMOVED***,
    {
      Type: "activity",
      Name: "weeding",
      Image: "assets/img/budget/activity/weeding.png",
      ID: "weeding"
  ***REMOVED***
  ],
  inputs: [
    {
      Type: "input",
      Name: "bags",
      Image: "assets/img/budget/input/bags.png",
      ID: "bags"
  ***REMOVED***,
    {
      Type: "input",
      Name: "chemicals",
      Image: "assets/img/budget/input/chemicals.png",
      ID: "chemicals"
  ***REMOVED***,
    {
      Type: "input",
      Name: "fertiliser",
      Image: "assets/img/budget/input/fertiliser.png",
      ID: "fertiliser"
  ***REMOVED***,
    {
      Type: "input",
      Name: "hire ox cart",
      Image: "assets/img/budget/input/hire-ox-cart.png",
      ID: "hire-ox-cart"
  ***REMOVED***,
    {
      Type: "input",
      Name: "labour - paid",
      Image: "assets/img/budget/input/labour---paid.png",
      ID: "labour---paid"
  ***REMOVED***,
    {
      Type: "input",
      Name: "manure sacks",
      Image: "assets/img/budget/input/manure-sacks.png",
      ID: "manure-sacks"
  ***REMOVED***,
    {
      Type: "input",
      Name: "manure wheelbarrows",
      Image: "assets/img/budget/input/manure-wheelbarrows.png",
      ID: "manure-wheelbarrows"
  ***REMOVED***,
    {
      Type: "input",
      Name: "pot for storagePrvdr",
      Image: "assets/img/budget/input/pot-for-storage.png",
      ID: "pot-for-storagePrvdr"
  ***REMOVED***,
    {
      Type: "input",
      Name: "protective equipment",
      Image: "assets/img/budget/input/protective-equipment.png",
      ID: "protective-equipment"
  ***REMOVED***,
    {
      Type: "input",
      Name: "seeds",
      Image: "assets/img/budget/input/seeds.png",
      ID: "seeds"
  ***REMOVED***,
    {
      Type: "input",
      Name: "sheller hire",
      Image: "assets/img/budget/input/sheller-hire.png",
      ID: "sheller-hire"
  ***REMOVED***,
    {
      Type: "input",
      Name: "tools",
      Image: "assets/img/budget/input/tools.png",
      ID: "tools"
  ***REMOVED***,
    {
      Type: "input",
      Name: "tractor hire",
      Image: "assets/img/budget/input/tractor-hire.png",
      ID: "tractor-hire"
  ***REMOVED***,
    {
      Type: "input",
      Name: "transportation hire",
      Image: "assets/img/budget/input/transportation-hire.png",
      ID: "transportation-hire"
  ***REMOVED***,
    {
      Type: "input",
      Name: "wood",
      Image: "assets/img/budget/input/wood.png",
      ID: "wood"
  ***REMOVED***
  ],
  outputs: [
    {
      Type: "output",
      Name: "crop",
      Image: "assets/img/budget/output/crop.png",
      ID: "crop",
      consumed: 0
  ***REMOVED***,
    {
      Type: "output",
      Name: "manure for compost",
      Image: "assets/img/budget/output/manure-for-compost.png",
      ID: "manure-for-compost",
      consumed: 0
  ***REMOVED***,
    {
      Type: "output",
      Name: "money",
      Image: "assets/img/budget/output/money.png",
      ID: "money",
      consumed: 0
  ***REMOVED***,
    {
      Type: "output",
      Name: "wood",
      Image: "assets/img/budget/output/wood.png",
      ID: "wood",
      consumed: 0
  ***REMOVED***
  ]
***REMOVED***
