import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MalawiDataProvider {
  metaData: any;

  constructor(public http: HttpClient) {
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
    if (!this.metaData) {
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => {
          resolve(data);
        });
      });
    }
  }
}
