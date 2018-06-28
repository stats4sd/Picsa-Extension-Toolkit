import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  ViewController,
  ToastController
} from "ionic-angular";
import { StorageProvider } from "../../../providers/storage/storage";

@IonicPage()
@Component({
  selector: "page-budget-settings",
  templateUrl: "budget-settings.html"
})
export class BudgetSettingsPage {
  newBudgetSlide = true;
  loadBudgetSlide = false;
  saved: any = [];
  archived: any = [];
  enterprises: any;
  months: any;
  timeScales: any;
  days: any;
  modalMode: boolean;
  budget = {
    title: "New Budget",
    archived: false,
    periods: { labels: [], starting: "Jan", timeScale: "months", total: 12 }
***REMOVED***;
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storagePrvdr: StorageProvider,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
    console.log("loading budget settings page");
    this.enterprises = ["crop", "livestock", "livelihood"];
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    this.timeScales = ["months", "weeks", "days", "none"];
    this.budget.periods.labels = this.months;
    console.log("budget", this.budget);
***REMOVED***

  ionViewDidEnter() {
    // if sent as model
    if (this.navParams.data.operation) {
      console.log("navParams", this.navParams);
      this.modalMode = true;
      if (this.navParams.data.operation == "new") {
        this.startNew();
    ***REMOVED***
      if (this.navParams.data.operation == "load") {
        this.loadSaved();
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  startNew() {
    this.newBudgetSlide = true;
    this.loadBudgetSlide = false;
    this.slides.update();
    this.slides.slideTo(1, 500);
***REMOVED***
  loadSaved() {
    // load saved click, loads cached budgets and moves to loading screen
    this.newBudgetSlide = false;
    this.loadBudgetSlide = true;
    this.loadSavedBudgets();
    this.slides.update();
    this.slides.slideTo(1, 500);
***REMOVED***
  loadSavedBudgets() {
    // load saved budgets from cache
    this.storagePrvdr.getAll("budgets").then(res => {
      let arr = [];
      for (let key in res) {
        let budget = res[key];
        if (budget.archived) {
          this.archived.push(budget);
      ***REMOVED*** else {
          if (!budget.hasOwnProperty("title")) {
            budget = this.upgradeBudget(budget);
        ***REMOVED***
          arr.push(budget);
      ***REMOVED***
    ***REMOVED***
      this.saved = arr.reverse();
      console.log("saved budgets", this.saved);
  ***REMOVED***);
***REMOVED***
  loadBudget(b, isNew) {
    // click function to return selected budget
    console.log("loading budget", b);

    if (isNew) {
      b.created = new Date();
      b.id = this.storagePrvdr.generatePushID();
      b.data = this.createDataTemplates(b.periods.labels);
  ***REMOVED***
    if (this.modalMode) {
      this.viewCtrl.dismiss(b);
  ***REMOVED*** else {
      this.navCtrl.push("BudgetToolPage", b);
  ***REMOVED***
***REMOVED***
  createDataTemplates(labels) {
    let arr = [];
    console.log("creating templates");
    labels.forEach((label, i) => {
      arr.push({
        label: label,
        index: i,
        activities: [],
        inputs: [],
        outputs: [],
        familyLabour: { people: 0, days: 0 },
        balance: {
          inputs: {
            total: 0,
            dots: []
        ***REMOVED***,
          outputs: {
            total: 0,
            dots: []
        ***REMOVED***,
          consumed: {
            total: 0,
            dots: []
        ***REMOVED***,
          monthly: {
            total: 0,
            dots: []
        ***REMOVED***,
          running: {
            total: 0,
            dots: []
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
    return arr;
***REMOVED***
  archive(budget) {
    console.log("archiving budget", budget);
    budget.archived = true;
    this.storagePrvdr
      .saveUserDoc(budget, true, "budgets", budget.id)
      .then(() => {
        this.loadSavedBudgets();
        let toast = this.toastCtrl.create({
          message: "Budget Archived",
          duration: 3000
      ***REMOVED***);
        toast.present();
    ***REMOVED***);
***REMOVED***
  nextSlide() {
    this.slides.slideNext();
***REMOVED***
  calculatePeriod() {
    // return array representing time periods
    let timeScale = this.budget.periods.timeScale;
    let starting = this.budget.periods.starting;
    let total = this.budget.periods.total;
    let arr = [];
    if (timeScale == "months") {
      arr = this.calculatePeriodMonths(total, starting);
  ***REMOVED***
    if (timeScale == "days") {
      arr = this.calculatePeriodDays(total, starting);
  ***REMOVED***
    if (timeScale == "weeks") {
      arr = this.calculatePeriodConsecutive(total, "week");
  ***REMOVED***
    if (timeScale == "none") {
      arr = this.calculatePeriodConsecutive(total);
  ***REMOVED***
    this.budget.periods.labels = arr;
***REMOVED***
  calculatePeriodConsecutive(total, prefix?) {
    if (!prefix) {
      prefix = "";
  ***REMOVED***
    let arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push(prefix + i);
  ***REMOVED***
    return arr;
***REMOVED***
  calculatePeriodMonths(total, starting) {
    let array = this.months;
    if (starting) {
      let startIndex = this.months.indexOf(starting);
      for (let i = 0; i < startIndex; i++) {
        array.push(array.shift());
    ***REMOVED***
  ***REMOVED***
    if (total > array.length) {
      for (let i = 0; i < Math.ceil(total / array.length); i++) {
        array = array.concat(array);
    ***REMOVED***
  ***REMOVED***
    return array.slice(0, total);
***REMOVED***
  calculatePeriodDays(total, starting) {
    let array = this.days;
    if (starting) {
      let startIndex = this.days.indexOf(starting);
      for (let i = 0; i < startIndex; i++) {
        array.push(array.shift());
    ***REMOVED***
  ***REMOVED***
    if (total > array.length) {
      for (let i = 0; i < Math.ceil(total / array.length); i++) {
        array = array.concat(array);
    ***REMOVED***
  ***REMOVED***
    return array.slice(0, total);
***REMOVED***

  /************* legacy functions, to be removed in future updates *************/

  upgradeBudget(b) {
    console.log("upgrading budget b");
    if (!b.title) {
      b.title = b.name;
      delete b.name;
  ***REMOVED***
    if (!b.periods) {
      b.periods = { labels: [], starting: 1, timeScale: "none", total: 12 ***REMOVED***
  ***REMOVED***
    return b;
***REMOVED***
}
