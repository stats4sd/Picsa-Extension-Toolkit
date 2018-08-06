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
***REMOVED***

  initTranslate() {
    this.translate.setDefaultLang("en");
    this.lang$.subscribe(lang => {
      if (lang) {
        this.changeLanguage(lang);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  // load user doc from storage on init and reflect to redux
  // additionally checks for user backup
  async loadUser() {
    const user: IUser = await this.storagePrvdr.get("user");
    console.log("user loaded", user);
    if (user) {
      this.setUser(user);
      this.presentToast("user loaded successfully");
  ***REMOVED*** else {
      // no user, see if a backup exists on file if using mobile
      if (this.filePrvdr.isCordova) {
        const userBackup = await this._checkIfUserBackupExists();
        if (userBackup) {
          this.setUser(userBackup);
          this.presentToast("user restored successfully");
          return;
      ***REMOVED***
        // if no backup let's initialise a new user so that user object exists to store data on
        else {
          this.createNewUser();
      ***REMOVED***
    ***REMOVED*** else {
        this.createNewUser();
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  // additional set user used primarly during user load and backup
  setUser(user: IUser) {
    this.user = user;
    this.storagePrvdr.set("user", user);
    this.actions.updateUser(user);
***REMOVED***

  createNewUser() {
    const user: IUser = {
      lang: "en",
      appVersion: version.text
  ***REMOVED***;
    this.setUser(user);
    this.presentToast("user profile created");
***REMOVED***

  // automatically reflect changes to user to local storage and firebase
  // note - only want to sync if user authenticated (i.e logged in via email or joined group)
  async enableUserSync() {
    this.user$.subscribe(async user => {
      this.user = user;
      if (user) {
        await this.storagePrvdr.set("user", user);
        if (user && user.authenticated) {
          this.firestorePrvdr.setDoc(`users/${user.id}`, user);
      ***REMOVED***
        if (this.filePrvdr.isCordova) {
          this._backupUserToDisk();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  async _backupUserToDisk() {
    await this.filePrvdr.createFile(
      "picsaUserBackup.txt",
      this.user,
      true,
      true
    );
    return;
***REMOVED***

  async _checkIfUserBackupExists() {
    const fileTxt = await this.filePrvdr.readTextFile(
      "picsaUserBackup.txt",
      true
    );
    if (fileTxt) {
      const user: IUser = JSON.parse(fileTxt);
      return user;
  ***REMOVED***
    return null;
***REMOVED***

  // present toast with timeout to allow content to be fully registered
  presentToast(msg: string) {
    const toast = this.toast.create({
      duration: 2000,
      dismissOnPageChange: true,
      position: "bottom",
      message: msg
  ***REMOVED***);
    setTimeout(() => {
      toast.present();
  ***REMOVED***, 500);
***REMOVED***

  changeLanguage(code: string) {
    this.translate.use(code);
***REMOVED***

  // joinGroup() {}

  // set user doc
  updateUser(userFieldKey, value) {
    const user = this.user;
    user[userFieldKey] = value;
    this.actions.updateUser(user);
***REMOVED***

  saveFormResponse(formID: string, response: IFormResponse) {
    const user = this.user;
    if (!user.submittedForms) {
      user.submittedForms = {***REMOVED***
  ***REMOVED***
    if (!user.submittedForms[formID]) {
      user.submittedForms[formID] = {***REMOVED***
  ***REMOVED***
    user.submittedForms[formID][response._key] = response;
    this.actions.updateUser(user);
***REMOVED***

  subscribeToFirebaseChanges() {
    // wrap in try-catch as sometimes throws error if offline and trying to refresh token
    try {
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.actions.updateUser({
            id: user.uid,
            email: user.email,
            verified: user.emailVerified
        ***REMOVED***);
      ***REMOVED*** else {
          // User is signed out.
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED*** catch (error) {
      console.error(error);
  ***REMOVED***
***REMOVED***
}
