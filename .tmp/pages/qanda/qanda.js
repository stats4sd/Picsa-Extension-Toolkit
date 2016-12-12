import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
export var QandAPage = (function () {
    function QandAPage(navCtrl, af, alertCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.discussions = af.database.list('/discussions');
    }
    QandAPage.prototype.addDiscussion = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Discussion',
            message: "Enter a title for the discussion",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.discussions.push({
                            title: data.title
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
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
                    }
                }, {
                    text: 'Update title',
                    handler: function () {
                        _this.updateDiscussion(discussionId, discussionTitle);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    QandAPage.prototype.removeDiscussion = function (discussionId) {
        this.discussions.remove(discussionId);
    };
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
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.discussions.update(discussionId, {
                            title: data.title
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    QandAPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-qanda',
                    templateUrl: 'qanda.html'
                },] },
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