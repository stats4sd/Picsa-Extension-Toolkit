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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileOpener: FileOpener,
    private file: File,
    public platform: Platform
  ) {
    if (this.platform.is("mobile")) {
      this.checkFileDirectory();
  ***REMOVED***
***REMOVED***

  ngOnInit() {
    this.resources$.subscribe(resources => {
      if (resources) {
        this.initResources(resources);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  // on init want to take list of all resources and split into groups to view in sections
  initResources(resources: IResource[]) {
    console.log("resource init", resources);
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
    this._setVideoPlayerWidth();
    console.log("content", this.content.contentWidth);
    this.activeResource = resource;
    console.log("loading resource", resource);
    if (resource.type == "pdf") {
      this.openResource(resource);
  ***REMOVED***
***REMOVED***

  // video width needs to be set programtically
  _setVideoPlayerWidth() {
    const width = this.content.contentWidth;
    this.playerWidth = width * 0.9;
    console.log("width", this.playerWidth, window);
***REMOVED***

  // **** code tidying checkpoint - code after here needs review (cc 17th July 2018) ***

  checkFileDirectory() {
    console.log("checking file directory");
    this.file
      .checkDir(this.file.externalApplicationStorageDirectory, "picsa")
      .then(_ => {
        console.log("file directory exists");
        // this.setResources();
    ***REMOVED***)
      .catch(err => {
        this.file
          .createDir(
            this.file.externalApplicationStorageDirectory,
            "picsa",
            false
          )
          .then(() => {
            console.log("pics directory created");
            // this.setResources();
        ***REMOVED***)
          .catch(err => {
            console.log(err);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***

  // ionViewDidLoad() {}

  list(dir, path) {
    console.log("listing", path);
    this.file
      .listDir(dir, path)
      .then(res => {
        console.log("list:", path, res);
    ***REMOVED***)
      .catch(err => {
        console.log("err", err);
    ***REMOVED***);
***REMOVED***

  openResource(resource) {
    if (!this.platform.is("cordova")) {
      return this.openWebResource(resource);
  ***REMOVED***
    this.file
      .copyFile(
        `${this.file.applicationDirectory}www/assets/resources/`,
        resource.filename,
        `${this.file.externalApplicationStorageDirectory}"picsa/`,
        resource.filename
      )
      .then(_ => {
        console.log("file copied successfully", resource.filename);
        console.log("opening file", resource.filename);
        this.fileOpener
          .open(
            `${this.file.externalApplicationStorageDirectory}picsa/"${
              resource.filename
          ***REMOVED***`,
            "application/pdf"
          )
          .then(_ => console.log("openned successfully"))
          .catch(err => {
            err => console.log("file opener err", err);
            this.list(this.file.externalApplicationStorageDirectory, "picsa");
        ***REMOVED***);
    ***REMOVED***)
      .catch(err => {
        console.log("file copy error", err);
        this.fileOpener
          .open(
            this.file.externalApplicationStorageDirectory + resource.filename,
            "application/pdf"
          )
          .then(_ => console.log("opened successfuly"))
          .catch(err => {
            err => console.log("file opener error", err);
            this.list(this.file.externalApplicationStorageDirectory, "picsa");
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***
  openWebResource(resource) {
    // open resource for browser or simulator version. Currently files manually added to firebase storage and url copied. In future could automate.
    // refs: https://firebase.google.com/docs/storage/web/download-files
    console.log("opening resource", resource);
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
