import { select } from "@angular-redux/store";
import { Component, ViewChild } from "@angular/core";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import {
  Content,
  IonicPage,
  NavController,
  NavParams,
  Platform
} from "ionic-angular";
import { Observable } from "rxjs";

import { IResource, IResourceGroup } from "../../models/models";
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
    public platform: Platform
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

  async initMobileStorageDirectory() {
    this.externalDir = await this.checkFileDirectoryExists();
    // console.log("externalDir", externalDir);
    const appDir = this.file.applicationDirectory;
    // console.log("directory exists", externalDir);
    const hardResources = await this._listHardResources();
    // console.log("hardResources", hardResources);
    const savedResources = await this.list(this.externalDir, "picsa");
    // console.log("saved resources", savedResources);
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
    const groups: {} = {***REMOVED***
    resources.forEach(res => {
      if (!groups[res.group]) {
        groups[res.group] = {
          name: res.group,
          resources: []
      ***REMOVED***;
    ***REMOVED***
      groups[res.group].resources.push(res);
  ***REMOVED***);
    this.resourceGroups = Object.values(groups);
    console.log("groups", this.resourceGroups);
***REMOVED***

  unsetResource() {
    this.activeResource = null;
***REMOVED***

  // set active resource to clicked resource (to show/hide video player) and open
  loadResource(resource) {
    console.log("loading resource", resource);
    this.activeResource = resource;

    this.openResource(resource);
***REMOVED***

  // video width needs to be set programtically
  _setVideoPlayerWidth() {
    const width = this.content.contentWidth;
    this.playerWidth = width * 0.9;
    console.log("width", this.playerWidth, window);
***REMOVED***

  async checkFileDirectoryExists() {
    console.log("checking file directory");
    try {
      await this.file.checkDir(
        this.file.externalApplicationStorageDirectory,
        "picsa"
      );
      return this.file.externalApplicationStorageDirectory;
  ***REMOVED*** catch (error) {
      console.log("picsa directory does not exist, creating");
      try {
        await this.file.createDir(
          this.file.externalApplicationStorageDirectory,
          "picsa",
          false
        );
        return this.file.externalApplicationStorageDirectory;
    ***REMOVED*** catch (error) {
        console.log("could not create application storage directory");
        throw new Error(JSON.stringify(error));
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  // list directory contents for specified path
  async list(dir, path) {
    console.log("listing", path);
    try {
      const files = await this.file.listDir(dir, path);
      return files;
  ***REMOVED*** catch (error) {
      throw new Error(JSON.stringify(error));
  ***REMOVED***
***REMOVED***

  async copyApplicationFileLocally(filename) {}

  _getMimetype(filename: string) {
    console.log("getting mimetype", filename);
    const fileNameSplit = filename.split(".");
    const extension: string = fileNameSplit[fileNameSplit.length - 1];
    console.log("mimetype", extension, mimetypes[extension]);
    return mimetypes[extension];
***REMOVED***
  async openResource(resource: IResource) {
    if (!this.platform.is("cordova")) {
      return this.openWebResource(resource);
  ***REMOVED***
    const mimetype = this._getMimetype(resource.filename);
    const filepath = `${this.externalDir}picsa/${resource.filename}`;
    console.log("opening file", filepath, mimetype);
    this.fileOpener.open(filepath, mimetype);
    // const file = await this.file.checkFile(
    //   `${this.file.applicationStorageDirectory}www/assets/resources`,
    //   resource.filename
    // );
    // console.log("file exists?", file);
    // try {
    //   await this.file.copyFile(
    //     `${this.file.applicationStorageDirectory}www/assets/resources/`,
    //     resource.filename,
    //     `${this.file.externalApplicationStorageDirectory}"picsa/`,
    //     resource.filename
    //   );
    //   console.log("file copied successfully", resource.filename);
    //   console.log("opening file", resource.filename);
    // } catch (error) {
    //   console.error("file copy error", error);
    //   console.log(
    //     "application directory",
    //     this.file.applicationStorageDirectory
    //   );
    //   const files1 = await this.file.listDir(
    //     this.file.applicationDirectory,
    //     "www/assets/resources"
    //   );
    //   console.log("files1", files1);
    //   return console.error(error);
    // }
    // try {
    //   await this.fileOpener
    //     .open(
    //       `${this.file.externalApplicationStorageDirectory}picsa/"${
    //         resource.filename
    //     ***REMOVED***`,
    //       "application/pdf"
    //     )
    //     .then(_ => console.log("openned successfully"))
    //     .catch(err => {
    //       err => console.log("file opener err", err);
    //       this.list(this.file.externalApplicationStorageDirectory, "picsa");
    //   ***REMOVED***);
    // } catch (error) {
    //   return console.error("file copy error", error);
    // }
    // try {
    //   await this.fileOpener.open(
    //     this.file.externalApplicationStorageDirectory + resource.filename,
    //     "application/pdf"
    //   );
    //   console.log("opened successfuly");
    // } catch (error) {
    //   return console.error("file opener error", error);
    // }
***REMOVED***

  openWebResource(resource) {
    // open resource for browser or simulator version. Currently files manually added to firebase storage and url copied. In future could automate.
    // refs: https://firebase.google.com/docs/storage/web/download-files
    window.open(resource.weblink, "_blank");
***REMOVED***
}

// this.file.copyFile(this.file.applicationDirectory + 'www/assets', 'picsa-field-manual.pdf', this.file.externalApplicationStorageDirectory, 'picsa-field-manual.pdf')
//   .then(_ => {
//     console.log('external data', this.file.externalApplicationStorageDirectory)
//     FileOpener.open(this.file.externalApplicationStorageDirectory + '/picsa-field-manual.pdf', 'application/pdf')
// ***REMOVED***).catch(
//   err => {
//     console.log(err)
//     FileOpener.open(this.file.externalApplicationStorageDirectory + '/picsa-field-manual.pdf', 'application/pdf')
// ***REMOVED***
//   )

// this.file.checkDir(this.file.dataDirectory, 'picsa')
//   .then(_ => {
//     console.log('Directory exists')
// ***REMOVED***)
//   .catch(err => {
//     this.file.createDir(this.file.dataDirectory, 'picsa', false).then(() => {
//       this.file.copyDir(this.file.applicationDirectory + 'www/assets', 'resources', this.file.dataDirectory + '/picsa', 'resources')
//         .then(_ => {
//           console.log('folder successfully copied')
//           this.list(this.file.dataDirectory, 'picsa/assets')
//       ***REMOVED***)
//   ***REMOVED***).catch(err => { console.log(err) })
// ***REMOVED***)

// check if additional nav hashtag given to scroll to given section
// *** not working as ionic strips extra hash on initial load

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
