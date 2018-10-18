import { Injectable } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing";
import { saveAs } from "file-saver";
import * as html2canvas from "html2canvas";
import { Platform } from "ionic-angular";
import { FileService } from "./providers";

@Injectable()
export class PrintProvider {
  constructor(
    private filePrvdr: FileService,
    private platform: Platform,
    private socialSharing: SocialSharing
  ) {}

  // convert a dom selector to canvas and share as image using social sharing
  async socialShare(domSelector: string, filename: string) {
    const domEl: HTMLElement = document.querySelector(domSelector);
    const canvasElm = await html2canvas(domEl);
    this.shareCanvasImage(canvasElm);
  }

  // similar method to above but add filename title to top of canvas
  async socialShareBudget(domSelector: string, title: string) {
    const domEl: HTMLElement = document.querySelector(domSelector);
    const width = domEl.offsetWidth;
    const canvasElm = await html2canvas(domEl);
    // add title
    const ctx = canvasElm.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "start";
    ctx.fillText(title, width / 2, 43);
    this.shareCanvasImage(canvasElm);
  }

  async shareCanvasImage(canvasElm: HTMLCanvasElement) {
    const base64 = canvasElm.toDataURL();
    this.socialSharing
      .share("test message", "test title", base64)
      .then(res => console.log(res), err => console.error(err));
  }

  async downloadCanvasImage(canvasElm: HTMLCanvasElement, filename: string) {
    if (this.platform.is("cordova")) {
      // *** not working, blob seems correct but writes empty json
      // similarly 'saveAs' function says downloading but no file generated
      canvasElm.toBlob(async blob => {
        console.log("blob created", blob);
        const filePath = await this.filePrvdr.createFile(
          `budget-${filename}.png`,
          blob,
          true,
          true
        );
        console.log("file created", filePath);
        this.filePrvdr.openFileCordova(filePath);
      });
    } else {
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
}
