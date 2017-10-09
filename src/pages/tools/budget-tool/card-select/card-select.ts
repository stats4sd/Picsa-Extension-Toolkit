import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController  } from 'ionic-angular';
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
  selected: any = {};
  activeCard: any = { quantity: 0, cost: 0 };
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
    public storagePrvdr: StorageProvider,
    public toatsCtrl: ToastController,
    public alertCtrl: AlertController,
    ) {
    this.cards = this.bdg.allData[this.navParams.data.type]
  }
  ionViewDidEnter() {
    this.setSelected(this.navParams.data.selected || [])
    this.period = this.navParams.data.period
    this.type = this.navParams.data.type
    this.showFamilyLabour = (this.type == "familyLabour")
    this.showCards = (this.type != "familyLabour" && this.type != "consumed")
    this.showConsumed = (this.type == "consumed")

  }

  highlight(card) {
    //push card if doesn't exist and set values to 0
    if (!this.selected[card.ID]) {
      card.quantity = 0
      card.cost=0
      this.selected[card.ID] = card
   }
    //else remove or toggle values
    else {
      if (card.Type != "input" && card.Type != "output") {
        this.removeCard(card)
      }
    }
    //if input/output toggle values pane
    if (card.Type == "input" || card.Type == "output") {
      this.activeCard = this.selected[card.ID]
      this.showValues = true;
    }
  }

  removeCard(card) {
    delete this.selected[card.ID]
    this.showValues = false;
  }
  setSelected(array) {
    for (let item of array) {
      this.selected[item.ID] = item;
    }
  }
  updateValues(card) {
    let index = this.getIndex(this.period[this.type], card)
    let c = {}
    //assigning budget data to card set up binding which meant all same inputs would auto update same value (see v0.2.5)
    //really messy and awkward naming structure are legacy of this frustration!
    for (let key in card) {
      c[key]=card[key]
    }
    this.selected[card.ID] = c
    this.showValues = false
    this.period[this.type][index]=c

  }
  continue() {
    //populate activities from selected array (could be done on initial click to show but then would need correct remove function too)
    if (this.type == "activities") {
      this.period[this.type] = []
      for (let key in this.selected) {
        this.period[this.type].push(this.selected[key])
      }
    }
    //don't need to pass any data as binding to period kept - linked to mess above
    this.viewCtrl.dismiss()
    
  }
  getIndex(array, card) {
    let index: number = 0
    let i=0
    for (let item of array) {
      if (item.ID == card.ID) {
        index=i
      }
      i++
    }
    return index
  }
  addCard() {
    //lookup as card types not quite same as budget type names
    let types = {
      inputs: 'input',
      outputs: 'output',
      activities:'activity'
    }
    this.newCard = {
      Type: types[this.type],
      Types: this.type,
      Name: "New Card",
      Image: "",
      ID: this.storagePrvdr.generatePushID(),
      userGenerated:true
    }
    this.showNewCard = true
  }
  
  saveNewCard() {
    this.storagePrvdr.save('budgetCards', this.newCard, this.newCard.ID).then((res) => {
      let toast = this.toatsCtrl.create({
        message: 'Card Saved',
        duration: 3000
      });
      toast.present();
      this.showNewCardMeta = false
      this.cards.unshift(this.newCard);
      this.highlight(this.newCard)
    })
  }
  saveCanvasImage() {
    let img = this.canvasWhiteboard.generateCanvasDataUrl("image/png", 0.3);
    this.newCard.Image = img
    this.showNewCard = false
    this.showNewCardMeta = true
    // this.canvasWhiteboard.generateCanvasBlob((blob: any) => {
    //   console.log(blob);
    // }, "image/png");
  }
  delete(card) {
    console.log('deleting card',card)
    let confirm = this.alertCtrl.create({
      title: 'Remove Card',
      message: 'Are you sure you want to delete this card from your budget tool?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
           
          }
        },
        {
          text: 'Delete',
          handler: () => {
            card.archived = true
            this.storagePrvdr.save('budgetCards', card, card.ID).then((res) => {
              let toast = this.toatsCtrl.create({
                message: 'Card deleted',
                duration: 3000
              });
              toast.present();
              console.log('selected',this.selected)
              if (this.selected[card.ID]) {
                delete this.selected[card.ID]
              }
              console.log('selected',this.selected)
            })
          }
        }
      ]
    });
    confirm.present();
  }
  increaseFamily(variable) {
    if (this.period.familyLabour[variable] >= 0) {
      this.period.familyLabour[variable]++
    }
  }
  decreaseFamily(variable) {
    if (this.period.familyLabour[variable] >= 0) {
      this.period.familyLabour[variable]--
    }
  }
  increaseConsumed(index) {
    if (!this.period.outputs[index].consumed) { this.period.outputs[index.consumed] = 0 }
    if (this.period.outputs[index].consumed >= 0) {
      this.period.outputs[index].consumed++
    }
  }
  decreaseConsumed(index) {
    if (this.period.outputs[index].consumed >= 0) {
      this.period.outputs[index].consumed--
    }
  }
  _toArray(value) {
    return new Array(value).fill(0)
  }

}
