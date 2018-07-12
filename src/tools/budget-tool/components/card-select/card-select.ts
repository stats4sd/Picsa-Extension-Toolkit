import { Component, ViewChild } from "@angular/core";
import { AlertController, Events, ToastController } from "ionic-angular";
import { CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";
import { StorageProvider } from "../../../../providers/storage/storage";

@Component({
  selector: "card-select",
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: "card-select.html"
})
export class CardSelectComponent {
  @ViewChild("canvasWhiteboard") canvasWhiteboard: CanvasWhiteboardComponent;

  cards: any;
  budget: any;
  allCards: any;
  selected: any = {***REMOVED***
  activeCard: any = { quantity: 0, cost: 0 ***REMOVED***
  showCards = false;
  showValues = false;
  showFamilyLabour = false;
  showConsumed = false;
  showNewCard = false;
  showNewCardMeta = false;
  type: string;
  period: any;
  newCard: any;
  constructor(
    public storagePrvdr: StorageProvider,
    public toatsCtrl: ToastController,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    // this.cards = this.bdg.allData[this.navParams.data.type];
***REMOVED***
  ionViewDidEnter() {
    // this.setSelected(this.navParams.data.selected || []);
    // this.period = this.navParams.data.period;
    // this.type = this.navParams.data.type;
    this.showFamilyLabour = this.type == "familyLabour";
    this.showCards = this.type != "familyLabour" && this.type != "consumed";
    this.showConsumed = this.type == "consumed";
***REMOVED***

  highlight(card) {
    //push card if doesn't exist and set values to 0
    if (!this.selected[card.ID]) {
      card.quantity = 0;
      card.cost = 0;
      this.selected[card.ID] = card;
  ***REMOVED***
    //else remove or toggle values
    else {
      if (card.Type != "input" && card.Type != "output") {
        this.removeCard(card);
    ***REMOVED***
  ***REMOVED***
    //if input/output toggle values pane
    if (card.Type == "input" || card.Type == "output") {
      this.activeCard = this.selected[card.ID];
      this.showValues = true;
  ***REMOVED***
***REMOVED***

  removeCard(card) {
    // delete this.selected[card.ID]
    console.log("selected", this.selected);
    console.log("card", this.activeCard);
    const deleteCardId = this.activeCard.ID;
    delete this.selected[deleteCardId];
    console.log("selected", this.selected);
    this.showValues = false;
    this.events.publish("card:update", {
      periodIndex: this.period.index,
      type: this.type,
      value: this.selected
  ***REMOVED***);
***REMOVED***
  setSelected(array) {
    for (const item of array) {
      this.selected[item.ID] = item;
  ***REMOVED***
***REMOVED***
  updateValues(card) {
    console.log("updating values", card);
    console.log("selected", this.selected);
    this.events.publish("card:update", {
      periodIndex: this.period.index,
      type: this.type,
      value: this.selected
  ***REMOVED***);
    this.showValues = false;
***REMOVED***
  continue() {
    //populate activities from selected array (could be done on initial click to show but then would need correct remove function too)
    if (this.type == "activities") {
      this.period[this.type] = [];
      for (const key in this.selected) {
        this.period[this.type].push(this.selected[key]);
    ***REMOVED***
  ***REMOVED***
    //don't need to pass any data as binding to period kept - linked to mess above
    // this.viewCtrl.dismiss();
***REMOVED***
  getIndex(array, card) {
    let index: number = 0;
    let i = 0;
    for (const item of array) {
      if (item.ID == card.ID) {
        index = i;
    ***REMOVED***
      i++;
  ***REMOVED***
    return index;
***REMOVED***
  addCard() {
    //lookup as card types not quite same as budget type names
    const types = {
      inputs: "input",
      outputs: "output",
      activities: "activity"
  ***REMOVED***;
    this.newCard = {
      Type: types[this.type],
      Types: this.type,
      Name: "New Card",
      Image: "",
      ID: this.storagePrvdr.generatePushID(),
      userGenerated: true
  ***REMOVED***;
    this.showNewCard = true;
***REMOVED***

  // saveNewCard() {
  //   this.storagePrvdr
  //     .saveUserDoc(this.newCard, true, "budgetCards", this.newCard.ID)
  //     .then(res => {
  //       const toast = this.toatsCtrl.create({
  //         message: "Card Saved",
  //         duration: 3000
  //     ***REMOVED***);
  //       toast.present();
  //       this.showNewCardMeta = false;
  //       this.cards.unshift(this.newCard);
  //       this.highlight(this.newCard);
  //   ***REMOVED***);
  // }
  // saveCanvasImage() {
  //   const img = this.canvasWhiteboard.generateCanvasDataUrl("image/png", 0.3);
  //   this.newCard.Image = img;
  //   this.showNewCard = false;
  //   this.showNewCardMeta = true;
  //   // this.canvasWhiteboard.generateCanvasBlob((blob: any) => {
  //   //   console.log(blob);
  //   // }, "image/png");
  // }
  delete(card) {
    console.log("deleting card", card);
    const confirm = this.alertCtrl.create({
      title: "Remove Card",
      message:
        "Are you sure you want to delete this card from your budget tool?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {}
      ***REMOVED***,
        {
          text: "Delete",
          handler: () => {
            card.archived = true;
            this.storagePrvdr
              .removeUserDoc("budgetCards", card.ID)
              .then(res => {
                const toast = this.toatsCtrl.create({
                  message: "Card deleted",
                  duration: 3000
              ***REMOVED***);
                toast.present();
                console.log("selected", this.selected);
                if (this.selected[card.ID]) {
                  delete this.selected[card.ID];
              ***REMOVED***
                console.log("selected", this.selected);
            ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
      ]
  ***REMOVED***);
    confirm.present();
***REMOVED***
  increaseFamily(variable) {
    if (this.period.familyLabour[variable] >= 0) {
      this.period.familyLabour[variable]++;
  ***REMOVED***
***REMOVED***
  decreaseFamily(variable) {
    if (this.period.familyLabour[variable] >= 0) {
      this.period.familyLabour[variable]--;
  ***REMOVED***
***REMOVED***
  increaseConsumed(index) {
    if (!this.period.outputs[index].consumed) {
      this.period.outputs[index.consumed] = 0;
  ***REMOVED***
    if (this.period.outputs[index].consumed >= 0) {
      this.period.outputs[index].consumed++;
  ***REMOVED***
    this.period.outputs[index].arrayCounterConsumed = new Array(
      parseInt(this.period.outputs[index].consumed)
    );
***REMOVED***
  decreaseConsumed(index) {
    if (this.period.outputs[index].consumed >= 0) {
      this.period.outputs[index].consumed--;
  ***REMOVED***
    this.period.outputs[index].arrayCounterConsumed = new Array(
      parseInt(this.period.outputs[index].consumed)
    );
***REMOVED***
  _toArray(value) {
    return new Array(value).fill(0);
***REMOVED***
}