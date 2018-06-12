import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class MalawiDataProvider {
  metaData: any;

  constructor(public http: Http) {
    console.log("Hello MalawiDataProvider Provider");
    this.getMetaData();
***REMOVED***

  getMetaData() {
    return new Promise(resolve => {
      if (this.metaData) {
        resolve(this.metaData);
    ***REMOVED*** else {
        this.loadFile("assets/datasets/metadata.json").then(res => {
          this.metaData = res;
          resolve(this.metaData);
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  loadFile(url) {
    var options = {***REMOVED***
    if (!this.metaData) {
      return new Promise(resolve => {
        this.http
          .get(url)
          .pipe(map(res => res.json()))
          .subscribe(data => {
            resolve(data);
        ***REMOVED***);
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
}
