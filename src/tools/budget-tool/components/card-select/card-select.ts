import { Component } from "@angular/core";
import { CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";
import REGIONAL_SETTINGS from "src/environments/region";

@Component({
  selector: "card-select",
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: "card-select.html"
})
export class CardSelectComponent {
  currency = REGIONAL_SETTINGS.currency;
  constructor() {
    console.log("currency", this.currency);
  }
}
