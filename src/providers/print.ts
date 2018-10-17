import { Injectable } from "@angular/core";
import { saveAs } from "file-saver";
import * as html2canvas from "html2canvas";

@Injectable()
export class PrintProvider {
  constructor() {}

  async print(domSelector: string, filename: string) {
    const domEl: HTMLElement = document.querySelector(domSelector);
    // add padding to the top so that title can be shown
    const width = domEl.offsetWidth;
    // const height = domEl.offsetHeight;
    const canvasElm = await html2canvas(domEl);
    // add title
    const ctx = canvasElm.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "start";
    ctx.fillText(filename, width / 2, 43);
    // download
    canvasElm.toBlob(blob => {
      // on error null blob created
      if (blob) {
        saveAs(blob, `${filename}.png`);
      } else {
        throw new Error("could not create download");
      }
    });
  }
}
