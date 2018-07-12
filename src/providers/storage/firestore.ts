import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class FirestoreStorageProvider {
  constructor(public db: AngularFirestore) {}
  getCollection(path) {
    // return collection observable
    return this.db.collection(path).valueChanges();
***REMOVED***

  getDocument(path) {
    return this.db.doc(path).valueChanges();
***REMOVED***

  updateDoc(path, data) {
    // clean data to remove undefined values
    Object.keys(data).forEach(key => {
      if (typeof data[key] == "undefined") {
        data[key] = null;
    ***REMOVED***
  ***REMOVED***);
    console.log("cleaned data", data);
    return this.db.doc(path).update(data);
***REMOVED***

  setDoc(path: string, data) {
    return this.db.doc(path).set(data);
***REMOVED***

  addToCollection(path: string, data, key?) {
    // update existing by providing key, set key in meta
    if (key == undefined) {
      key = this.db.createId();
  ***REMOVED***
    data._key = key;
    return this.db
      .collection(path)
      .doc(key)
      .set(data);
***REMOVED***
}
