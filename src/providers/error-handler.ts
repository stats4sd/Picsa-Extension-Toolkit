import { NgRedux } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";
import Raven from "raven-js";
import { AppState } from "../reducers/reducers";

// https://docs.sentry.io/clients/cordova/ionic/
// localhost errors ignored automatically from console
// https://sentry.io/settings/statistics-for-sustainable-dev/picsa-app

// use raven to intercept non-ionic javascript error throws
Raven.config("https://68f91fcd849a436193d615bc943c0259@sentry.io/1249964", {
  autoBreadcrumbs: {
    console: false
  }
}).install();

@Injectable()
export class SentryErrorHandler extends IonicErrorHandler {
  constructor(private ngRedux: NgRedux<AppState>) {
    super();
  }
  handleError(error: any) {
    if (window.location.hostname == "localhost") {
      console.log("error", error);
      // super.handleError(error);
    } else {
      try {
        Raven.setExtraContext({
          appState: this.ngRedux.getState()
        });
        Raven.captureException(error.originalError || error);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
