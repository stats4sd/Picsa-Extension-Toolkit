import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class MalawiDataProvider {
  metaData: any;

  constructor(public http: Http) {
    console.log("Hello MalawiDataProvider Provider");
    this.getMetaData();
  }

  getMetaData() {
    return new Promise(resolve => {
      if (this.metaData) {
        resolve(this.metaData);
      } else {
        this.loadFile("assets/datasets/metadata.json").then(res => {
          this.metaData = res;
          resolve(this.metaData);
        });
      }
    });
  }

  loadFile(url) {
    var options = {};
    if (!this.metaData) {
      return new Promise(resolve => {
        this.http
          .get(url)
          .pipe(map(res => res.json()))
          .subscribe(data => {
            resolve(data);
          });
      });
    }
  }
}
