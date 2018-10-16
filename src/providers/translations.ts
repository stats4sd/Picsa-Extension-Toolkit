import { Injectable, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  Loading,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions
} from "ionic-angular";

@Injectable()
export class TranslationsProvider implements OnDestroy {
  loader: Loading;
  monthNames: string[] = MONTHS;
  constructor(
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public loadingCtrl: LoadingController
  ) {
    this.init();
  }
  // subscrib to language changes and retranslate static translations
  init() {
    this.translate.onLangChange.subscribe(lang => {
      this.prepareStaticTranslations();
    });
  }
  ngOnDestroy() {
    this.translate.onLangChange.unsubscribe();
  }

  // simple wrapper for ionic toast to allow text translation
  async presentTranslatedToast(config: ToastOptions, timeout?: number) {
    config.message = await this.translateText(config.message);
    if (timeout) {
      await _wait(timeout);
    }
    this.toastCtrl.create(config).present();
  }

  async presentTranslatedLoader(config: LoadingOptions) {
    config.content = await this.translateText(config.content);
    if (this.loader) {
      await this.loader.dismiss();
    }
    this.loader = this.loadingCtrl.create(config);
    await this.loader.present();
  }

  async dismissLoader() {
    if (this.loader) {
      await this.loader.dismiss();
    }
  }

  // use translate service to translate strings that will be displayed
  // outside of html templates (where pipe method used instead)
  async translateText(text: string) {
    const translation = await this.translate.get(text).toPromise();
    return translation;
  }

  async translateArray(arr: string[]) {
    const translatePromises = arr.map(async text => this.translateText(text));
    const translatedArr = await Promise.all(translatePromises);
    return translatedArr;
  }

  // some methods such as climate tool chart rendering require hardcoded values for callback functions
  // these are calculated when language changed
  async prepareStaticTranslations() {
    this.monthNames = await this.translateArray(MONTHS);
    console.log("month names", this.monthNames);
  }
}

// simple function to allow async function to wait a set amount of time before completing
const _wait = ms => new Promise((r, j) => setTimeout(r, ms));

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
