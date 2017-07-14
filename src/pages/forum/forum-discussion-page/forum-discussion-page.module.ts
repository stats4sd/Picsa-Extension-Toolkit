import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumDiscussionPage } from './forum-discussion-page';

@NgModule({
  declarations: [
    ForumDiscussionPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumDiscussionPage),
  ],
  exports: [
    ForumDiscussionPage
  ]
})
export class ForumDiscussionPageModule {}
