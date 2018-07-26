/* Storage strategy
Need offline-first approach and also potentially for users only ever offline.
Data to be updated online also has local copy in storage.data which provides initial population
*/

import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { DataActions } from "../actions/data.actions";
import storageData from "./storage.data";

@Injectable()
export class StorageProvider {
  constructor(public storage: Storage, private actions: DataActions) {
    this.dataInit();
  }

  // automatically load all data from storage into redux, where not available load from file
  // if local data version > storage then override
  async dataInit() {
    const currentDataVersion = await this.storage.get("_version");
    console.log("current data version:", currentDataVersion);
    console.log("storage data version:", storageData._version);
    this.loadData();
  }
  // attempt to load data from cache, if doesn't exist fallback to file
  async loadData() {
    for (const key of Object.keys(storageData)) {
      const data = await this.storage.get(key);
      if (data && data.length > 0) {
        this.actions.loadData({ [key]: data }, "storage");
      } else {
        this.actions.loadData({ [key]: storageData[key] }, "file");
      }
    }
  }
  // standard storage methods
  async get(storageKey: string) {
    return this.storage.get(storageKey);
  }

  async set(storageKey: string, data: any) {
    return this.storage.set(storageKey, data);
  }

  // **** FUNCTIONS TO BE MIGRATED ***
  getUser() {}
  getUserDoc() {}
}

// getUserDoc(collection, docId?) {
//   // ***need another function to return from local db
//   // ***could also add queries
//   const userID = this.userID;
//   return new Promise((resolve, reject) => {
//     // local first approach
//     this.storage
//       .get(collection)
//       .then(res => {
//         if (docId) {
//           resolve(res[docId]);
//         } else {
//           resolve(res);
//         }
//       })
//       .catch(err => console.log("failed retrieving user doc", err));
//   });
// }

// removeUserDoc(collection, docId) {
//   console.log("removing user doc", collection, docId);
//   // offline first
//   return new Promise((resolve, reject) => {
//     this.storage.get(collection).then(res => {
//       if (res.hasOwnProperty(docId)) {
//         delete res[docId];
//       }
//       this.storage.set(collection, res);
//       resolve();
//     });
//   });
//   // return this.afs.firestore.collection("users").doc(this.userID).collection(collection).doc(docId).delete()
// }

// getAll(collection) {
//   // get all docs in collection, returns as array
//   console.log("getting all docs in collection", collection);
//   return new Promise((resolve, reject) => {
//     // local first approach
//     this.storage.get(collection).then(res => {
//       console.log("docs received, converting to array", res);
//       // messy with lots of try/catches because of old and mixed data storage
//       // will be removed in future
//       try {
//         res = JSON.parse(res);
//       } catch (err) {}
//       if (res == null) {
//         resolve([]);
//       } else {
//         const docsArray = [];
//         for (const key in res) {
//           if (res.hasOwnProperty(key)) {
//             let data = res[key];
//             if (data.hasOwnProperty("jsonString")) {
//               try {
//                 data = JSON.parse(data.jsonString);
//               } catch (err) {
//                 data = data.jsonString;
//               }
//             }
//             if (data.hasOwnProperty("json")) {
//               try {
//                 data = JSON.parse(data.json);
//               } catch (err) {
//                 data = data.json;
//               }
//             }
//             docsArray.push(data);
//             console.log("array", docsArray);
//             resolve(docsArray);
//           }
//         }
//       }
//     });
//   });
// }

// saveUserDoc(
//   data: any,
//   stringify: boolean,
//   collection?: string,
//   id?: string,
//   merge?: boolean
// ) {
//   // saves data attached to user profile
//   // accepts data, whether to stringify (avoid nested arrays), optional colletion and document id
//   console.log("saving", data, stringify, collection, id);

//   return new Promise((resolve, reject) => {
//     if (!this.userID) {
//       return this.loadUser().then(() =>
//         this.saveUserDoc(data, stringify, collection, id, merge)
//       );
//     }
//     if (stringify == true) {
//       data = { jsonString: JSON.stringify(data) };
//     }
//     if (!merge) {
//       merge = false;
//     }

//     if (collection) {
//       // create new doc within collection, overrides any previous document
//       // offline first approach
//       // *** note ,used to be based on returning functions but now promise so live needs to swap for resolve methods ***
//       if (!id) {
//         id = this.firestorePrvdr.db.createId();
//       }
//       console.log("creating new doc in collection by id", collection, id);
//       this.storage.get(collection).then(
//         res => {
//           if (res == null) {
//             res = {};
//           }
//           res[id] = data;
//           this.storage.set(collection, res).then(_ => resolve(res));
//         },
//         rej => {
//           this.storage
//             .set(collection, { id: data })
//             .then(_ => resolve({ id: data }));
//         }
//       );

//       // if (id) { return this.afs.firestore.collection('users').doc(this.userID).collection(collection).doc(id).set(data, { merge: merge }) }
//       // else { return this.afs.firestore.collection('users').doc(this.userID).collection(collection).doc().set(data, { merge: merge }) }
//     } else {
//       // otherwise update any existing fields, uses set command with merge option to prevent total overwrite
//       //offline first approach
//       this.storage.get(collection).then(res => {
//         if (merge) {
//           for (const key in data) {
//             res[key] = data[key];
//           }
//         } else {
//           res = data;
//         }
//         this.storage.set(collection, res).then(_ => {
//           resolve(res);
//         });
//       });
//       // return this.afs.firestore.collection('users').doc(this.userID).set(data, { merge: merge })
//     }
//   });
// }

// saveBatch(
//   data: any,
//   stringify: boolean,
//   collection: string,
//   idAsKey?: boolean
// ) {
//   console.log("saving batch", data);
//   console.log("this.userID", this.userID);
//   // save multiple docs to a sub collection on user doc. overwrites any existing doc
//   // allows idAsKey if data format {id:data}, which will maintain same doc ref

//   // offline first
//   const temp = {};
//   for (const key in data) {
//     let doc = data[key];
//     if (stringify) {
//       doc = { json: JSON.stringify(doc) };
//     }
//     let id;
//     if (idAsKey) {
//       id = key;
//     } else {
//       id = this.firestorePrvdr.db.createId();
//     }
//     temp[id] = doc;
//   }
//   return this.storage.set(collection, temp);
// }

// syncForms(firebaseID) {
//   return new Promise((resolve, reject) => {
//     this.storage.get("submittedForms").then(forms => {
//       // hardcoded just for reporting forms for now
//       const pending = forms.reporting.pending;
//       const batch = this.afs.firestore.batch();
//       console.log("pending", pending);
//       for (const p of pending) {
//         const id = p._submissionID;
//         const ref = this.afs.firestore
//           .collection("forms")
//           .doc("reporting")
//           .collection("submissions")
//           .doc(id);
//         batch.set(ref, p);
//       }
//       batch
//         .commit()
//         .then(res => resolve("success"), rej => reject(rej))
//         .catch(err => console.log("problem syncing forms", err));
//     });
//   });
// }

// syncAll(firebaseID) {
//   // assumes preflight checks already carried out in network app
//   return new Promise((resolve, reject) => {
//     console.log("syncing all", firebaseID);
//     const batch = this.afs.firestore.batch();
//     let total = 0;
//     this.storage
//       .forEach((docsObject, collection, n) => {
//         /* storage in form
//       collection       docs object
//       budgets:{ budgets:data1, budget2:data2      }
//       */
//         // push collections objects to right place
//         if (typeof docsObject == "object") {
//           for (const id in docsObject) {
//             let data = docsObject[id];
//             if (data instanceof Date) {
//               // custom format for date object instance
//               data = {};
//               data[id] = docsObject;
//             }
//             const ref = this.afs.firestore
//               .collection("users")
//               .doc(firebaseID)
//               .collection(collection)
//               .doc(id);
//             batch.set(ref, data);
//             total++;
//           }
//         }
//         //anything else is local setting, can still pass
//         else {
//           const ref = this.afs.firestore.collection("users").doc(firebaseID);
//           const data = {};
//           data[collection] = docsObject;
//           batch.set(ref, data);
//           total++;
//         }
//       })
//       .then(_ => {
//         console.log("commiting", total);
//         console.log("batch", batch);
//         batch
//           .commit()
//           .then(res => resolve("success"), rej => reject(rej))
//           .catch(err => console.log("err", err));
//       });
//   });
// }

// _createUser(id?) {
//   //creates new user and saves to this.user
//   return new Promise((resolve, reject) => {
//     if (!id) {
//       id = this.firestorePrvdr.db.createId();
//     }
//     this.user = {
//       id: id,
//       name: "anonymous",
//       role: "extension",
//       group: "malawi-2017"
//     };
//     this.userID = id;
//     this.events.publish("user:loaded", this.user);
//     // save id to local storage and sync to firebase db (offline and online)
//     this.storage.set("userID", this.userID).then(() => {
//       this.saveUserDoc(this.user, false, "settings", "profile").then(() => {
//         console.log("user saved", this.user);
//         resolve(this.user);
//       });
//     });
//   });
// }

// _checkDB() {
//   return this.storage.get("dbUpgraded");
// }

// assignPermissions(code) {
//   console.log("assigning permissions");
//   return new Promise((resolve, reject) => {
//     this.loadFile("assets/admin/userPermissions.json").then(res => {
//       if (res[code]) {
//         this.user.permissions = res[code];
//         this.saveUserDoc(this.user, false, "settings", "profile").then(_ =>
//           resolve(this.user)
//         );
//       } else {
//         reject("Invalid code, please try again");
//       }
//     });
//   });
// }

// loadFile(url) {
//   return new Promise(resolve => {
//     this.http.get(url).subscribe(data => {
//       resolve(data);
//     });
//   });
// }

// presentToast(message) {
//   console.log("creating toast", message);
//   const toast = this.toastCtrl.create({
//     message: message,
//     duration: 3000
//   });
//   toast.present();
// }

// _migrateData() {
//   // messy promise chains used to upgrade old format local storage objects to new db
//   // will be removed for future deployments
//   return new Promise((resolve, reject) => {
//     this.storage.keys().then(keys => {
//       console.log("keys", keys);
//       if (keys.length == 0) {
//         // new user
//         console.log("new user");
//         this._createUser().then(user => {
//           this.storage.set("dbUpgraded", true);
//           resolve(user);
//         });
//       } else {
//         // first upgrade user, then budgets
//         if (keys.indexOf("user") > -1) {
//           this._upgradeUser().then(userID => {
//             console.log("user id", userID);
//             if (keys.indexOf("budgets") > -1) {
//               console.log("upgrading budgets");
//               this._upgradeBudgets(userID).then(() => {
//                 if (keys.indexOf("budgetCards") > -1) {
//                   console.log("upgrading budget cards");
//                   this._upgradeBudgetCards(userID).then(() => {
//                     resolve();
//                   });
//                 } else {
//                   resolve();
//                 }
//               });
//             } else {
//               resolve();
//             }
//           });
//         } else {
//           resolve();
//         }
//       }
//     });
//   });
//   //

//   // list db objects, then map
// }
// _upgradeBudgets(userID) {
//   console.log("user id", userID);
//   return new Promise((resolve, reject) => {
//     this.storage.get("budgets").then(res => {
//       const budgets = JSON.parse(res);
//       console.log("parsed budgets", budgets);
//       this.saveBatch(budgets, true, "budgets", true).then(() => {
//         console.log("budgets saved");
//         resolve();
//       });
//     });
//   });
// }
// _upgradeBudgetCards(userID) {
//   // identical to above, could have been merged
//   console.log("user id", userID);
//   return new Promise((resolve, reject) => {
//     this.storage.get("budgetCards").then(res => {
//       const cards = JSON.parse(res);
//       console.log("parsed cards", cards);
//       this.saveBatch(cards, true, "budgetCards", true).then(() => {
//         console.log("budgetCards saved");
//         resolve();
//       });
//     });
//   });
// }
// _upgradeUser() {
//   console.log("upgrading user");
//   return new Promise((resolve, reject) => {
//     // existing user in need of migrating
//     let id: string;
//     this.storage.get("user").then(user => {
//       console.log("user", user);
//       try {
//         user = JSON.parse(user);
//       } catch (err) {
//         // user parsed, return format either object or string depending on version. Now to upgrade
//         if (typeof user == "string") {
//           // 0.27 format where user saved as single string object
//           console.log("string format");
//           id = user;
//           console.log("user id", user);
//         }
//         //else console.error(err);
//       }
//       console.log("parsed user", user);
//       if (user.hasOwnProperty("ID")) {
//         // 0.28 format with user ID field
//         id = user.ID;
//       }
//       if (user.hasOwnProperty("id")) {
//         // 0.29 correct format, only needs syncing as done for both below
//         id = user.id;
//       }
//       console.log("id", id);
//       this.storage.set("userID", this.userID);
//       this.storage.set("dbUpgraded", true);
//       this._createUser(id).then(user => {
//         console.log("this.userID", this.userID);
//         this.storage.set("dbUpgraded", true).then(() => {
//           resolve(id);
//         });
//       });
//     });
//   });
// }

// //can merge code from resources page to single provider (either storage or file)
// //checks for a single directory (assumes picsa directory will already exist)...not adapted for root eg. /picsa/backups/profile/...
// checkFileDirectory(dir?) {
//   console.log("checking dir", dir);
//   console.log("cordova?", this.platform.is("cordova"));
//   if (!this.platform.is("cordova")) {
//     return;
//   }
//   return new Promise((resolve, reject) => {
//     //assumes directory child of picsa, check picsa exists
//     this.file
//       .checkDir(`${this.file.externalApplicationStorageDirectory}picsa/`, dir)
//       .then(_ => {
//         console.log(
//           "directory exists",
//           `${this.file.externalApplicationStorageDirectory}picsa/${dir}`
//         );
//         resolve("directory exists");
//       })
//       .catch(err => {
//         this.file
//           .createDir(
//             `${this.file.externalApplicationStorageDirectory}picsa/`,
//             dir,
//             false
//           )
//           .then(() => {
//             console.log(`picsa/${dir} directory created`);
//             resolve("directory created");
//           })
//           .catch(err => {
//             reject(err);
//           });
//       });
//   });
// }

/*

********** rest needs to be reviewed by Chris ***************************

Approach - all user docs stored offline-first and sync'd when internet available
User doc only goes 2 levels deep to allow for easy syncing (collection -> document)

In ideal case local id and firebase id should match, however not vital as firebase can always handle online id
Want tracking info into forms, however this is likely to be local device id

Currently all 1:1 (local device to online db). If planning on multiple device use will need way to merge local storage docs

firebase could use email format 'localID@picsa'
(need to remove special characters?, possibly store as old-id?, unlikely to be major as can just say early data not available )

note - haven't included all merge features, should review when testing

*************************************************************************************************************

*/
