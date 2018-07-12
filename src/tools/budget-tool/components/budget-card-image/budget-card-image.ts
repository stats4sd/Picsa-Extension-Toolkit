import { Component, Input } from "@angular/core";

@Component({
  selector: "budget-card-image",
  templateUrl: "budget-card-image.html"
})
export class BudgetCardImageComponent {
  @Input("imageId") imageId: string;
  @Input("imageData") imageData: string;
  source: string = "svg";

  ngOnInit() {
    console.log("image", this.imageId, this.imageData);
  }

  svgError() {
    console.log("svg failed, trying png");
    this.source = "png";
  }
  pngError() {
    console.log("png failed, loading default image");
    this.source = null;
  }
}
