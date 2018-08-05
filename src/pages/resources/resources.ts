import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import {
  Content,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Platform
} from "ionic-angular";
import { Observable } from "rxjs";

import { IResource, IResourceGroup } from "../../models/models";
import { FileService } from "../../providers/providers";
import mimetypes from "./mimetypes";

@IonicPage({
  defaultHistory: ["HomePage"]
})
@Component({
  selector: "page-resources",
  templateUrl: "resources.html"
})
export class ResourcesPage {
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
    private fileOpener: FileOpener,
    private file: File,
    public platform: Platform,
    private loader: LoadingController,
    private filePrvdr: FileService
  ) {}
  ngOnInit() {
    if (this.platform.is("mobile")) {
      this.initMobileStorageDirectory();
  ***REMOVED*** else {
      this.platformIsWeb = true;
      this._addSubscribers();
  ***REMOVED***
***REMOVED***
  ngAfterViewInit() {
    this._setVideoPlayerWidth();
***REMOVED***

  _addSubscribers() {
    this.resources$.subscribe(resources => {
      if (resources) {
        this.updateResources(resources);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
  _removeSubscribers() {}

  // on load copy resources from app to external directory, checking directory exists first
  async initMobileStorageDirectory() {
    const loader = this.loader.create({
      content: "Preapring Resources",
      dismissOnPageChange: true,
      enableBackdropDismiss: false
  ***REMOVED***);
    await loader.present();
    this.externalDir = await this.filePrvdr.checkFileDirectoryExists();
    const appDir = this.filePrvdr.appDir;
    const hardResources = await this._listHardResources();
    const savedResources = await this.filePrvdr.listDirectory(
      this.externalDir,
      "picsa"
    );
    // copy hard resources
    if (hardResources.length != savedResources.length) {
      for (const resource of hardResources) {
        {
          try {
            console.log("copying file", resource);
            await this.file.copyFile(
              `${appDir}www/assets/resources`,
              resource.name,
              `${this.externalDir}picsa`,
              resource.name
            );
            console.log("file copied succes");
        ***REMOVED*** catch (error) {
            console.log("file not copied", error, resource.name);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else {
      console.log("all resources exist :D");
  ***REMOVED***
    this._addSubscribers();
    loader.dismiss();
***REMOVED***

  async _listHardResources() {
    try {
      const resources = (await this.file.listDir(
        this.file.applicationDirectory,
        "www/assets/resources"
      )) as any;
      return resources;
  ***REMOVED*** catch (error) {
      console.error("could not list hard resources", error);
      return [];
  ***REMOVED***
***REMOVED***

  // take list of all resources and split into groups to view in sections
  updateResources(resources: IResource[]) {
    console.log("resource init", resources);
    // filter for what user should be able to access
    //  current placeholder filters out 2017 content
    //***add trigger for group change
    resources = resources.filter(r => {
      if (r.viewableBy && !r.viewableBy.includes("EXAMPLE")) {
        return false;
    ***REMOVED***
      return true;
  ***REMOVED***);
    // allocate resources into groups
    const groups = {***REMOVED***
    console.log("building resource groups");
    resources.forEach(res => {
      if (!groups[res.group]) {
        groups[res.group] = {
          name: res.group,
          resources: []
      ***REMOVED***;
    ***REMOVED***
      groups[res.group].resources.push(res);
  ***REMOVED***);
    console.log("groups", groups);
    this.resourceGroups = _jsonObjectValues(groups);
    console.log("this.resources", this.resourceGroups);
***REMOVED***

  unsetResource() {
    this.activeResource = null;
***REMOVED***

  // video width needs to be set programtically
  _setVideoPlayerWidth() {
    const width = this.content.contentWidth;
    this.playerWidth = width * 0.9;
    console.log("width", this.playerWidth, window);
***REMOVED***

  async copyApplicationFileLocally(filename) {}

  _getMimetype(filename: string) {
    const fileNameSplit = filename.split(".");
    const extension: string = fileNameSplit[fileNameSplit.length - 1];
    return mimetypes[extension];
***REMOVED***

  // depending on mobile/web, use cordova fileopener or new tab to show resources
  async openResource(resource: IResource) {
    this.activeResource = resource;
    if (!this.platform.is("cordova")) {
      return this.openWebResource(resource);
  ***REMOVED*** else {
      this.openCordovaResource(resource);
  ***REMOVED***
***REMOVED***

  openCordovaResource(resource) {
    const mimetype = this._getMimetype(resource.filename);
    const filepath = `${this.externalDir}picsa/${resource.filename}`;
    console.log("opening resource", filepath, mimetype);
    this.fileOpener.open(filepath, mimetype).catch(err => console.error(err));
***REMOVED***

  openWebResource(resource) {
    // open resource for browser or simulator version. Currently files manually added to firebase storage and url copied. In future could automate.
    // refs: https://firebase.google.com/docs/storage/web/download-files
    window.open(resource.weblink, "_blank");
***REMOVED***
}

//   @ViewChild(Content) content: Content;

// ngAfterViewInit() {
//   const scrollID = location.hash.split("#")[3];
//   if (scrollID) {
//     console.log("scrolling to id", scrollID, this.content);
//     this._scrollTo(scrollID);
// ***REMOVED***
// }
// _scrollTo(id: string) {
//   const yOffset = document.getElementById(id).offsetTop;
//   this.content.scrollTo(0, yOffset, 2000);
// }

function _jsonObjectValues(json: any) {
  const values = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      values.push(json[key]);
  ***REMOVED***
***REMOVED***
  return values;
}
