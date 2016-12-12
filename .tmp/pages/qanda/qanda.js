import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
export var QandAPage = (function () {
    function QandAPage(navCtrl, af, alertCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.discussions = af.database.list('/discussions');
  ***REMOVED***
    QandAPage.prototype.addDiscussion = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Discussion',
            message: "Enter a title for the discussion",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
              ***REMOVED***,
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                  ***REMOVED***
              ***REMOVED***,
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.discussions.push({
                            title: data.title
                      ***REMOVED***);
                  ***REMOVED***
              ***REMOVED***
            ]
      ***REMOVED***);
        prompt.present();
  ***REMOVED***;
    QandAPage.prototype.showOptions = function (discussionId, discussionTitle) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Delete Discussion',
                    role: 'destructive',
                    handler: function () {
                        _this.removeDiscussion(discussionId);
                  ***REMOVED***
              ***REMOVED***, {
                    text: 'Update title',
                    handler: function () {
                        _this.updateDiscussion(discussionId, discussionTitle);
                  ***REMOVED***
              ***REMOVED***, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                  ***REMOVED***
              ***REMOVED***
            ]
      ***REMOVED***);
        actionSheet.present();
  ***REMOVED***;
    QandAPage.prototype.removeDiscussion = function (discussionId) {
        this.discussions.remove(discussionId);
  ***REMOVED***;
    QandAPage.prototype.updateDiscussion = function (discussionId, discussionTitle) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Discussion Name',
            message: "Update the name for this discussion",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title',
                    value: discussionTitle
              ***REMOVED***,
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                  ***REMOVED***
              ***REMOVED***,
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.discussions.update(discussionId, {
                            title: data.title
                      ***REMOVED***);
                  ***REMOVED***
              ***REMOVED***
            ]
      ***REMOVED***);
        prompt.present();
  ***REMOVED***;
    QandAPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-qanda',
                    templateUrl: 'qanda.html'
              ***REMOVED***,] },
    ];
    /** @nocollapse */
    QandAPage.ctorParameters = [
        { type: NavController, },
        { type: AngularFire, },
        { type: AlertController, },
        { type: ActionSheetController, },
    ];
    return QandAPage;
}());
//# sourceMappingURL=qanda.js.map