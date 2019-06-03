import { NgRedux } from "@angular-redux/store";
import { ErrorHandler, Injectable } from "@angular/core";
import * as Sentry from "@sentry/browser";
import { AppState } from "src/app/store/store.model";
import { PlatformActions } from "src/actions/platform.actions";
import ENVIRONMENT from "src/environments/environment";

// https://docs.sentry.io/clients/cordova/ionic/
// localhost errors ignored automatically from console
// https://sentry.io/settings/statistics-for-sustainable-dev/picsa-app

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  errorDisplayOpen: boolean;
  constructor(
    private ngRedux: NgRedux<AppState>,
    private platformActions: PlatformActions
  ) {
    if (ENVIRONMENT.production) {
      Sentry.init({
        dsn: "https://68f91fcd849a436193d615bc943c0259@sentry.io/1249964"
      });
    }
  }
  handleError(error: any) {
    this.dispatchError(error);
    if (!ENVIRONMENT.production) {
      console.log("throw local error");
      throw error;
    } else {
      console.log("throw sentry error");
      console.error(error);
      try {
        Sentry.configureScope(scope => {
          scope.setExtra("appState", this.ngRedux.getState);
        });
        Sentry.captureException(error.originalError || error);
      } catch (e) {}
    }
  }
  // dispatch error to be picked up by reducer
  async dispatchError(error: Error) {
    console.log("dispatching eroor");
    this.platformActions.throwError(error);
  }
}
