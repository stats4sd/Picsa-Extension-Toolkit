import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { BudgetToolProvider } from '../../../../providers/budget-tool/budget-tool';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { StorageProvider } from '../../../../providers/storage/storage'

@IonicPage()
@Component({
  selector: 'page-card-select',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: 'card-select.html',

})

export class CardSelectPage {
  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;

  cards: any;
  allCards: any;
  selected: any = {***REMOVED***
  activeCard: any = { quantity: 0, cost: 0 ***REMOVED***
  showCards = false
  showValues = false;
  showFamilyLabour = false;
  showConsumed = false;
  showNewCard = false;
  showNewCardMeta = false;
  type: string
  period: any;
  newCard: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bdg: BudgetToolProvider,
    public viewCtrl: ViewController,
    public storage: StorageProvider,
    public toatsCtrl: ToastController) {
    this.cards = this.bdg.allData[this.navParams.data.type]
    this.period = this.navParams.data.period
***REMOVED***
  ionViewDidEnter() {
    this.setSelected(this.navParams.data.selected || [])
    console.log('period', this.navParams.data.period)
    this.type = this.navParams.data.type
    this.showFamilyLabour = (this.type == "familyLabour")
    this.showCards = (this.type != "familyLabour" && this.type != "consumed")
    this.showConsumed = (this.type == "consumed")

***REMOVED***

  highlight(card) {
    //push card if doesn't exist
    if (!this.selected[card.ID]) {
      console.log('adding card', card)
      this.selected[card.ID] = card
      if (!this.period[this.type]) { this.period[this.type] = [] }
      this.period[this.type].push(card)
      console.log('period', this.period)
  ***REMOVED***
    //else remove or toggle values
    else {
      if (card.Type != "input" && card.Type != "output") {
        console.log('removing card', card)
        this.removeCard(card)
    ***REMOVED***
  ***REMOVED***
    //if input/output toggle values pane
    if (card.Type == "input" || card.Type == "output") {
      if (!card.quantity) { card.quantity = 0 }
      if (!card.cost) { card.cost = 0 }
      this.activeCard = this.selected[card.ID] || card
      this.showValues = true;
  ***REMOVED***
***REMOVED***

  removeCard(card) {
    delete this.selected[card.ID]
    this.period[this.type] = this.period[this.type].filter(function (element) {
      return element.ID != card.ID
  ***REMOVED***)
    this.showValues = false;
***REMOVED***
  increaseFamily(variable) {
    if (this.period.familyLabour[variable] >= 0) {
      this.period.familyLabour[variable]++
  ***REMOVED***
***REMOVED***
  decreaseFamily(variable) {
    if (this.period.familyLabour[variable] >= 0) {
      this.period.familyLabour[variable]--
  ***REMOVED***
***REMOVED***
  increaseConsumed(index) {
    if (!this.period.outputs[index].consumed) { this.period.outputs[index.consumed] = 0 }
    console.log('increasing', this.period.outputs[index])
    if (this.period.outputs[index].consumed >= 0) {
      this.period.outputs[index].consumed++
  ***REMOVED***
***REMOVED***
  decreaseConsumed(index) {
    if (this.period.outputs[index].consumed >= 0) {
      this.period.outputs[index].consumed--
  ***REMOVED***
***REMOVED***
  _toArray(value) {
    return new Array(value).fill(0)
***REMOVED***

  setSelected(array) {
    console.log('setting selected')
    for (let item of array) {
      this.selected[item.ID] = item;
  ***REMOVED***
    console.log('selected', this.selected)
***REMOVED***
  updateValues(card) {
    console.log('updating values', card)
    this.selected[card.ID] = card
    this.showValues = false
***REMOVED***
  close() {
    //repopulate 
    this.viewCtrl.dismiss(this.period)

***REMOVED***
  addCard() {
    //lookup as card types not quite same as budget type names
    let types = {
      inputs: 'input',
      outputs: 'output',
      activities:'activity'
  ***REMOVED***
    this.newCard = {
      Type: types[this.type],
      Types: this.type,
      Name: "New Card",
      Image: "",
      ID: this.storage.generatePushID()
  ***REMOVED***
    this.showNewCard = true
***REMOVED***
  saveCanvasImage() {
    let img = this.canvasWhiteboard.generateCanvasDataUrl("image/png", 0.3);
    this.newCard.Image = img
    this.showNewCard = false
    this.showNewCardMeta = true
    // this.canvasWhiteboard.generateCanvasBlob((blob: any) => {
    //   console.log(blob);
    // }, "image/png");
***REMOVED***
  saveNewCard() {
    this.storage.save('budgetCards', this.newCard, this.newCard.ID).then((res) => {
      console.log('card saved?', res)
      let toast = this.toatsCtrl.create({
        message: 'Card Saved',
        duration: 3000
    ***REMOVED***);
      toast.present();
      this.showNewCardMeta = false
      this.cards.unshift(this.newCard);
      this.highlight(this.newCard)
  ***REMOVED***)
}

}
