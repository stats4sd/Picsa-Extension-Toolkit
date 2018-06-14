import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { File } from "@ionic-native/file";
import { IonicPage, NavController } from "ionic-angular";
import { Platform } from "ionic-angular";
import { FileService } from "../../providers/file-service";
import { YoutubeService } from "../../providers/youtube-service";

declare let cordova: any;

@IonicPage()
@Component({
  selector: "page-videos",
  templateUrl: "videos.html"
  // providers:[FileService]
})
export class VideosPage {
  videos: any;
  fs: string;
  channelID: string = "UCQLmF5mZgYCu0L4Fb7TxCkA";
  //walker inst: UC8MTu04Zyz7oZGIihcjbNNA
  maxResults: string = "30";
  pageToken: string;
  googleToken: string = "AIzaSyBJUkoClld4_1xnivIuqYs5pMZo3UvE0QU";
  searchQuery: string = "";
  posts: any = [];
  onPlaying: boolean = false;
  done: boolean = false;
  player;
  activeVideo;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    fileService: FileService,
    public http: HttpClient,
    private file: File,
    public ytPlayer: YoutubeService
  ) {
    this.videos = [
      {
        name: "Women in extension",
        file: "034 Women in extension - ENGLISH.mp4",
        image: "assets/test.png",
        description: "Test description",
        youtubeURL: "",
        link:
          "https://firebasestorage.googleapis.com/v0/b/extension-toolkit.appspot.com/o/Videos%2F034%20Women%20in%20extension%20-%20ENGLISH.mp4?alt=media&token=9a539872-b55e-42c5-890b-d918e72959c8"
    ***REMOVED***
    ];
    if (this.platform.is("mobile")) {
      const dataObj = new Blob(["some file data"], { type: "text/plain" });
      console.log(dataObj);
      Promise.all([
        fileService.createDirectory("PICSA-videos"),
        fileService.listDirectory("PICSA-videos"),
        fileService.createFile(
          "PICSA-videos",
          "testdoc.txt",
          "sample text",
          false
        )
      ])
        .then(values => console.log(values))
        .catch(err => console.log(err));
  ***REMOVED*** else {
      console.log("working in browser?");
  ***REMOVED***

    // if (this.platform.is('mobile')) {
    //   this.fs= cordova.file.dataDirectory;
    //   this.file.checkDir(this.fs, 'videos').then(res =>
    //   console.log(res))
    //   .catch(err =>
    //   console.log(err)
    //   );
    // }
    // else{console.log('working in browser?')}
    this.fetchData();
***REMOVED***

  ionViewDidLoad() {
    console.log("Hello VideosPage Page");
***REMOVED***

  testFileFunction() {
    console.log("running test file function)");
    console.log(cordova.file);
    this.file.listDir(this.fs, "videos").then(res => console.log(res));
    this.file
      .createFile(this.fs + "/videos", "test.txt", true)
      .then(res => this.fileCheck(res));
***REMOVED***
  errorFunction(err) {
    console.log("error:");
    console.log(err);
    if (err.code == 12) {
      //directory exists so no really an error, can proceed
      this.testFileFunction();
  ***REMOVED*** else {
  ***REMOVED***
***REMOVED***
  fileCheck(res) {
    console.log("running file check");
    console.log(res);
    this.file.listDir(this.fs, "videos");
***REMOVED***

  fetchData(): void {
    let url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=
    ${this.channelID}&q=${
      this.searchQuery
  ***REMOVED***&type=video&order=viewCount&maxResults=
    ${this.maxResults}&key=${this.googleToken}`;
    if (this.pageToken) {
      url += "&pageToken=" + this.pageToken;
  ***REMOVED***
    this.http.get(url).subscribe((data: any) => {
      console.log(data.items);
      // *** Get individual video data like comments, likes and viewCount. Enable this if you want it.
      // let newArray = data.items.map((entry) => {
      //   let videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,statistics&id=' + entry.id.videoId + '&key=' + this.googleToken;
      //   this.http.get(videoUrl).map(videoRes => videoRes.json()).subscribe(videoData => {
      //     console.log (videoData);
      //     this.posts = this.posts.concat(videoData.items);
      //     return entry.extra = videoData.items;
      // ***REMOVED***);
      // });
      this.posts = this.posts.concat(data.items);
  ***REMOVED***);
***REMOVED***

  playVideo(e, post): void {
    this.onPlaying = true;
    this.activeVideo = post;
    this.ytPlayer.launchPlayer(post.id, post.snippet.title);
***REMOVED***
}
