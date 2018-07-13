import { Component, Input } from "@angular/core";

@Component({
  selector: "budget-card-image",
  templateUrl: "budget-card-image.html"
})
export class BudgetCardImageComponent {
  @Input("imageId") imageId: string;
  @Input("imageData") imageData: string;
  source: string = "svg";

  svgError() {
    this.source = "png";
***REMOVED***
  pngError() {
    this.source = null;
***REMOVED***
}
