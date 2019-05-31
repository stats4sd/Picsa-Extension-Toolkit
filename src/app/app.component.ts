import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";
import { ServiceWorkerService } from "src/providers/ngsw.service";
import { ENVIRONMENT } from "src/environments/environment";
import { UserProvider } from "src/providers/user";
import { StorageProvider } from "src/providers/storage";
import { FileService } from "src/providers/file-service";
import { NetworkProvider } from "src/providers/network";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private sw: ServiceWorkerService,
    private userPrvdr: UserProvider,
    private storagePrvdr: StorageProvider,
    private filePrvdr: FileService,
    private networkPrvdr: NetworkProvider
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    if (ENVIRONMENT.usesCordova) {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
    this.translate.setDefaultLang("en");
    this.sw.init();
    this.userPrvdr.init();
    this.storagePrvdr.dataInit();
    this.filePrvdr.init();
  }

  async initDeferred() {
    setTimeout(() => {
      this.networkPrvdr.init();
    }, 5000);
  }
}
