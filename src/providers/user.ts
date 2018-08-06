import { select } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AngularFireAuth } from "angularfire2/auth";
import { ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { UserActions } from "../actions/user.actions";
import { IFormResponse, IUser } from "../models/models";
import version from "../pages/changelog/version";
// unsure why, but can't import both from ./providers - not a big issue
import { FileService } from "./file-service";
import { FirestoreStorageProvider } from "./firestore";
import { StorageProvider } from "./storage";

@Injectable()
export class UserProvider {
  user: IUser;
  @select("user") user$: Observable<IUser>;
  @select(["user", "lang"])
  readonly lang$: Observable<string>;
  constructor(
    private afAuth: AngularFireAuth,
    private storagePrvdr: StorageProvider,
    private actions: UserActions,
    private firestorePrvdr: FirestoreStorageProvider,
    private translate: TranslateService,
    private filePrvdr: FileService,
    private toast: ToastController
  ) {}
  async init() {
    this.initTranslate();
    await this.loadUser();
    await this.enableUserSync();
    this.subscribeToFirebaseChanges();
  }

  initTranslate() {
    this.translate.setDefaultLang("en");
    this.lang$.subscribe(lang => {
      if (lang) {
        this.changeLanguage(lang);
      }
    });
  }

  // load user doc from storage on init and reflect to redux
  // additionally checks for user backup
  async loadUser() {
    const user: IUser = await this.storagePrvdr.get("user");
    console.log("user loaded", user);
    if (user) {
      this.setUser(user);
      this.presentToast("user loaded successfully");
    } else {
      // no user, see if a backup exists on file if using mobile
      if (this.filePrvdr.isCordova) {
        const userBackup = await this._checkIfUserBackupExists();
        if (userBackup) {
          this.setUser(userBackup);
          this.presentToast("user restored successfully");
          return;
        }
        // if no backup let's initialise a new user so that user object exists to store data on
        else {
          this.createNewUser();
        }
      } else {
        this.createNewUser();
      }
    }
  }

  // additional set user used primarly during user load and backup
  setUser(user: IUser) {
    this.user = user;
    this.storagePrvdr.set("user", user);
    this.actions.updateUser(user);
  }

  createNewUser() {
    const user: IUser = {
      lang: "en",
      appVersion: version.text
    };
    this.setUser(user);
    this.presentToast("user profile created");
  }

  // automatically reflect changes to user to local storage and firebase
  // note - only want to sync if user authenticated (i.e logged in via email or joined group)
  async enableUserSync() {
    this.user$.subscribe(async user => {
      this.user = user;
      if (user) {
        console.log("updating user", user);
        await this.storagePrvdr.set("user", user);
        console.log("user updated successfully");
        if (user && user.authenticated) {
          this.firestorePrvdr.setDoc(`users/${user.id}`, user);
        }
        if (this.filePrvdr.isCordova) {
          this._backupUserToDisk();
        }
      }
    });
  }

  async _backupUserToDisk() {
    console.log("backing up user to disk");
    await this.filePrvdr.createFile(
      "picsaUserBackup.txt",
      this.user,
      true,
      true
    );
    console.log("user backed up to disk");
    return;
  }

  async _checkIfUserBackupExists() {
    console.log("checking for user backup file");
    const fileTxt = await this.filePrvdr.readTextFile(
      "picsaUserBackup.txt",
      true
    );
    if (fileTxt) {
      const user: IUser = JSON.parse(fileTxt);
      return user;
    }
    return null;
  }

  // present toast with timeout to allow content to be fully registered
  presentToast(msg: string) {
    const toast = this.toast.create({
      duration: 2000,
      dismissOnPageChange: true,
      position: "bottom",
      message: msg
    });
    setTimeout(() => {
      toast.present();
    }, 500);
  }

  changeLanguage(code: string) {
    this.translate.use(code);
  }

  // joinGroup() {}

  // set user doc
  updateUser(userFieldKey, value) {
    const user = this.user;
    user[userFieldKey] = value;
    this.actions.updateUser(user);
  }

  saveFormResponse(formID: string, response: IFormResponse) {
    const user = this.user;
    if (!user.submittedForms) {
      user.submittedForms = {};
    }
    if (!user.submittedForms[formID]) {
      user.submittedForms[formID] = {};
    }
    user.submittedForms[formID][response._key] = response;
    this.actions.updateUser(user);
  }

  subscribeToFirebaseChanges() {
    // wrap in try-catch as sometimes throws error if offline and trying to refresh token
    try {
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("user signed in", user.uid);
          this.actions.updateUser({
            id: user.uid,
            email: user.email,
            verified: user.emailVerified
          });
        } else {
          console.log("no user signed in");
          // User is signed out.
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
