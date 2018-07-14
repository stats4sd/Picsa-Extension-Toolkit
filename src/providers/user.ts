import { select } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import { UserActions } from "../actions/user.actions";
import { IUser } from "../models/models";
// unsure why, but can't import both from ./providers - not a big issue
import { FirestoreStorageProvider } from "./firestore";
import { StorageProvider } from "./storage";

@Injectable()
export class UserProvider {
  user: IUser;
  @select("user") user$: Observable<IUser>;
  constructor(
    private afAuth: AngularFireAuth,
    private storagePrvdr: StorageProvider,
    private actions: UserActions,
    private firestorePrvdr: FirestoreStorageProvider
  ) {
    this.loadUser();
    this.subscribeToFirebaseChanges();
    this.afAuth.auth
      .signInAnonymously()
      .catch(err => console.log("sign in error", err));
  }

  // load user doc from storage on init and reflect to redux
  async loadUser() {
    const user: IUser = await this.storagePrvdr.get("user");
    if (user) {
      this.actions.updateUser(user);
    }
  }

  // automatically reflect changes to user to local storage and firebase
  syncUser() {
    this.user$.subscribe(user => {
      this.user = user;
      this.storagePrvdr.set("user", user);
      if (user.id) {
        this.firestorePrvdr.setDoc(`users/${user.id}`, user);
      }
    });
  }

  // set user doc
  set(userFieldKey, value) {
    let user = this.user;
    if (!user) {
      user = { lang: "en" };
    }
    user[userFieldKey] = value;
    this.actions.updateUser(user);
  }

  subscribeToFirebaseChanges() {
    // firebase auth state ch
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("user signed in", user);
        this.actions.updateUser({
          id: user.uid,
          lang: this.user.lang,
          email: user.email,
          verified: user.emailVerified
        });
      } else {
        // User is signed out.
      }
    });
  }
}
