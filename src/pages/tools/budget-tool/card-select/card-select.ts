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
***REMOVED***
  ionViewDidEnter() {
    this.setSelected(this.navParams.data.selected || [])
    this.period = this.navParams.data.period
    this.type = this.navParams.data.type
    this.showFamilyLabour = (this.type == "familyLabour")
    this.showCards = (this.type != "familyLabour" && this.type != "consumed")
    this.showConsumed = (this.type == "consumed")

***REMOVED***

  highlight(card) {
    //push card if doesn't exist and set values to 0
    if (!this.selected[card.ID]) {
      card.quantity = 0
      card.cost=0
      this.selected[card.ID] = card
 ***REMOVED***
    //else remove or toggle values
    else {
      if (card.Type != "input" && card.Type != "output") {
        this.removeCard(card)
    ***REMOVED***
  ***REMOVED***
    //if input/output toggle values pane
    if (card.Type == "input" || card.Type == "output") {
      this.activeCard = this.selected[card.ID]
      this.showValues = true;
  ***REMOVED***
***REMOVED***

  removeCard(card) {
    delete this.selected[card.ID]
    this.showValues = false;
***REMOVED***
  setSelected(array) {
    for (let item of array) {
      this.selected[item.ID] = item;
  ***REMOVED***
***REMOVED***
  updateValues(card) {
    let index = this.getIndex(this.period[this.type], card)
    let c = {}
    //assigning budget data to card set up binding which meant all same inputs would auto update same value (see v0.2.5)
    //really messy and awkward naming structure are legacy of this frustration!
    for (let key in card) {
      c[key]=card[key]
  ***REMOVED***
    this.selected[card.ID] = c
    this.showValues = false
    this.period[this.type][index]=c

***REMOVED***
  continue() {
    //populate activities from selected array (could be done on initial click to show but then would need correct remove function too)
    if (this.type == "activities") {
      this.period[this.type] = []
      for (let key in this.selected) {
        this.period[this.type].push(this.selected[key])
    ***REMOVED***
  ***REMOVED***
    //don't need to pass any data as binding to period kept - linked to mess above
    this.viewCtrl.dismiss()
    
***REMOVED***
  getIndex(array, card) {
    let index: number = 0
    let i=0
    for (let item of array) {
      if (item.ID == card.ID) {
        index=i
    ***REMOVED***
      i++
  ***REMOVED***
    return index
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
  
  saveNewCard() {
    this.storage.save('budgetCards', this.newCard, this.newCard.ID).then((res) => {
      let toast = this.toatsCtrl.create({
        message: 'Card Saved',
        duration: 3000
    ***REMOVED***);
      toast.present();
      this.showNewCardMeta = false
      this.cards.unshift(this.newCard);
      this.highlight(this.newCard)
  ***REMOVED***)
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

}
