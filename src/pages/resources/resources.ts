import { select } from "@angular-redux/store";
import { Component, OnDestroy, ViewChild } from "@angular/core";
import { File } from "@ionic-native/file";
import {
  Content,
  IonicPage,
  NavController,
  NavParams,
  Platform
} from "ionic-angular";
import { Observable, Subject } from "rxjs";
import { IResource, IResourceGroup } from "../../models/models";
import { FileService } from "../../providers/providers";
import { TranslationsProvider } from "../../providers/translations";
import mimetypes from "./mimetypes";
import { REGIONAL_SETTINGS } from "../../environments/region";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-resources",
  templateUrl: "resources.html"
})
export class ResourcesPage implements OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  @select(["data", "resources"])
  resources$: Observable<IResource[]>;
  @ViewChild(Content) content: Content;
  resourceGroups: IResourceGroup[];
  activeResource: IResource;
  playerWidth: number;
  externalDir: string;
  platformIsWeb = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    public platform: Platform,
    private filePrvdr: FileService,
    private translations: TranslationsProvider
  ) {
    console.log("resources constructor");
  }
  ngOnInit() {
    if (this.platform.is("mobile")) {
      this.initMobileStorageDirectory();
    } else {
      this.platformIsWeb = true;
    }
    this._addSubscribers();
  }
  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
  ngAfterViewInit() {
    this._setVideoPlayerWidth();
  }

  _addSubscribers() {
    this.resources$.takeUntil(this.componentDestroyed).subscribe(resources => {
      if (resources) {
        this.updateResources(resources);
      }
    });
  }

  // on load copy resources from app to external directory, checking directory exists first
  async initMobileStorageDirectory() {
    await this.translations.presentTranslatedLoader({
      content: "Preparing Resources",
      dismissOnPageChange: false,
      enableBackdropDismiss: false
    });
    this.externalDir = await this.filePrvdr
      .checkFileDirectoryExists()
      .catch(err => {
        throw new Error(
          `check file directory exists error: ${JSON.stringify(err)}`
        );
      });
    const appDir = this.filePrvdr.appDir;
    const hardResources = await this._listHardResources().catch(err => {
      throw new Error(`list hard resources error: ${JSON.stringify(err)}`);
    });
    const savedResources = await this.filePrvdr
      .listDirectory(this.externalDir, "picsa")
      .catch(err => {
        throw new Error(`list directory error: ${JSON.stringify(err)}`);
      });
    // copy hard resources
    if (hardResources.length != savedResources.length) {
      for (const resource of hardResources) {
        {
          try {
            console.log("copying file", resource);
            await this.file
              .copyFile(
                `${appDir}www/assets/resources`,
                resource.name,
                `${this.externalDir}picsa`,
                resource.name
              )
              .catch(err => {
                throw new Error(`copy file error: ${JSON.stringify(err)}`);
              });
            console.log("file copied succes");
          } catch (error) {
            console.log("file not copied", error, resource.name);
          }
        }
      }
    } else {
      console.log("all resources exist :D");
    }
    this.translations.dismissLoader();
  }

  async _listHardResources() {
    try {
      const resources = (await this.file.listDir(
        this.file.applicationDirectory,
        "www/assets/resources"
      )) as any;
      return resources;
    } catch (error) {
      console.error("could not list hard resources", error);
      return [];
    }
  }

  // take list of all resources and split into groups to view in sections
  updateResources(resources: IResource[]) {
    console.log("resource init", resources);
    // filter for what user should be able to access
    //  current placeholder filters out 2017 content
    //***add trigger for group change
    resources = resources.filter(r => {
      if (r.viewableBy && !r.viewableBy.includes("EXAMPLE")) {
        return false;
      }
      if (r.region && REGIONAL_SETTINGS.country !== r.region) {
        return false;
      }
      return true;
    });
    // allocate resources into groups
    const groups = {};
    console.log("building resource groups");
    resources.forEach(res => {
      if (!groups[res.group]) {
        groups[res.group] = {
          name: res.group,
          resources: []
        };
      }
      groups[res.group].resources.push(res);
    });
    console.log("groups", groups);
    this.resourceGroups = _jsonObjectValues(groups);
    console.log("this.resources", this.resourceGroups);
  }

  unsetResource() {
    this.activeResource = null;
  }

  // video width needs to be set programtically
  _setVideoPlayerWidth() {
    const width = this.content.contentWidth;
    this.playerWidth = width * 0.9;
    console.log("width", this.playerWidth, window);
  }

  async copyApplicationFileLocally(filename) {}

  _getMimetype(filename: string) {
    const fileNameSplit = filename.split(".");
    const extension: string = fileNameSplit[fileNameSplit.length - 1];
    return mimetypes[extension];
  }

  // depending on mobile/web, use cordova fileopener or new tab to show resources
  async openResource(resource: IResource) {
    this.activeResource = resource;
    if (!this.platform.is("cordova")) {
      return window.open(resource.weblink, "_blank");
    } else {
      return this.filePrvdr.openFileCordova(
        `${this.externalDir}picsa/${resource.filename}`
      );
    }
  }
}
function _jsonObjectValues(json: any) {
  const values = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      values.push(json[key]);
    }
  }
  return values;
}
