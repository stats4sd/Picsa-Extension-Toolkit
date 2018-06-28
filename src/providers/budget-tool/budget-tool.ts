// import { Injectable } from "@angular/core";
// import { IBudgetData } from "../../models/budget-tool.models";
// import { StorageProvider } from "../storage/storage";
// import allData from "../../tools/budget-tool/budget-data";
// import sample from "../../tools/budget-tool/sample-budget";

// @Injectable()
// export class BudgetToolProvider {
//   allData: IBudgetData = allData;
//   budget: any;

//   constructor(public storagePrvdr: StorageProvider) {
//     console.log("Hello BudgetToolProvider Provider");
//     //load saved cards
//     this.storagePrvdr.loadUser().then(user => {
//       console.log("user loaded", user);
//       this.loadSavedCards();
//     });
//   }

//   loadSavedCards() {
//     this.storagePrvdr.getAll("budgetCards").then((cards: any) => {
//       console.log("loading saved cards", cards);
//       for (const card of cards) {
//         console.log("adding type", card.Types);
//         card.userGenerated = true;
//         this.allData[card.Types].push(card);
//       }
//       console.log("all data", this.allData);
//     });
//   }
//   loadSampleBudget() {
//     return sampleBudget;
//   }
// }

// const sampleBudget = sample;
