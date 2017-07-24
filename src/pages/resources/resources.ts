import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {
  resources: any=[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fileOpener: FileOpener,
    public file: File,
    public platform: Platform) {
    
    if (this.platform.is('mobile')) {
      console.log('mobile platform')
      this.checkFileDirectory()
  ***REMOVED***
    else {
      console.log('not mobile platform')
      this.setResources()
  ***REMOVED***
    
    
    
***REMOVED***

  checkFileDirectory() {
    console.log('checking file directory')
    this.file.checkDir(this.file.externalApplicationStorageDirectory, 'picsa')
      .then(_ => {
        console.log('file directory exists');
        this.setResources()
    ***REMOVED***)
      .catch(err => {
        this.file.createDir(this.file.externalApplicationStorageDirectory, 'picsa', false).then(() => {
          console.log('pics directory created')
          this.setResources()
      ***REMOVED***).catch(err => { console.log(err) })
    ***REMOVED***)
***REMOVED***
  
  ionViewDidLoad() { }
  
  list(dir, path) {
    console.log('listing', path)
    this.file.listDir(dir, path).then(res => {
      console.log('list:',path, res)
  ***REMOVED***).catch(err => { console.log('err', err) })
***REMOVED***

  //works if resource placed in assets/resourrces folder. Can later use directory reader to populate list
  loadResource(resource) {
    console.log('loading resource',resource)
    if (resource.type == "pdf") {
      this.openResource(resource)
  ***REMOVED***
***REMOVED***
  openResource(resource) {
    this.file.copyFile(this.file.applicationDirectory + 'www/assets/resources/', resource.filename, this.file.externalApplicationStorageDirectory + 'picsa/', resource.filename)
      .then(_ => {
        console.log('file copied successfully', resource.filename)
        console.log('opening file',resource.filename)
        this.fileOpener.open(this.file.externalApplicationStorageDirectory+'picsa/' + resource.filename, 'application/pdf')
          .then(_ => console.log('openned successfully')).catch(err => {
            err => console.log('file opener err', err);
            this.list(this.file.externalApplicationStorageDirectory, 'picsa')
        ***REMOVED***)
    ***REMOVED***).catch(
      err => {
        console.log('file copy error', err)
        this.fileOpener.open(this.file.externalApplicationStorageDirectory + resource.filename, 'application/pdf')
          .then(_=>console.log('opened successfuly')).catch(err => {
            err => console.log('file opener error', err);
            this.list(this.file.externalApplicationStorageDirectory, 'picsa')
        ***REMOVED***)
    ***REMOVED***)    
***REMOVED***
  setResources() {
    this.resources = [
      { name: 'Picsa Manual', filename: 'picsa-field-manual.pdf', type: 'pdf', image: 'assets/resources/picsa-field-manual-cover.png' },
      { name: 'Crop Information - Chileka', filename: 'crop-info-sheet-chileka.pdf', type: 'pdf', image: 'assets/resources/crop-info-sheet-chileka-cover.png' },
      { name: 'Potential Training Schedule', filename: 'potential-PICSA-training-schedule.pdf', type: 'pdf', image: 'assets/resources/potential-PICSA-training-schedule-cover.png' },
    ]
***REMOVED***
}  


    // this.file.copyFile(this.file.applicationDirectory + 'www/assets', 'picsa-field-manual.pdf', this.file.externalApplicationStorageDirectory, 'picsa-field-manual.pdf')
    //   .then(_ => {
    //     console.log('external data', this.file.externalApplicationStorageDirectory)
    //     this.fileOpener.open(this.file.externalApplicationStorageDirectory + '/picsa-field-manual.pdf', 'application/pdf')
    // ***REMOVED***).catch(
    //   err => {
    //     console.log(err)
    //     this.fileOpener.open(this.file.externalApplicationStorageDirectory + '/picsa-field-manual.pdf', 'application/pdf')
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