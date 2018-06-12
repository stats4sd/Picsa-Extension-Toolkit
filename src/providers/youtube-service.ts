import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams } from "@angular/http";

@Injectable()
export class YoutubeService {
  youtube: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: "100%",
    playerWidth: "100%"
***REMOVED***;

  constructor() {
    this.setupPlayer();
***REMOVED***

  createPlayer(videoId): void {
    const YT = window["YT"];
    this.youtube.player = YT.Player(this.youtube.playerId, {
      height: this.youtube.playerHeight,
      width: this.youtube.playerWidth,
      videoId: videoId,
      playerVars: {
        rel: 0,
        showinfo: 0,
        modestbranding: 1
    ***REMOVED***,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
    ***REMOVED***
  ***REMOVED***);
    console.log("youtube player created");
    console.log(this.youtube.player);
***REMOVED***

  onPlayerReady(event) {
    event.target.playVideo();
    console.log("onPlayerReady");
***REMOVED***
  onPlayerStateChange() {
    console.log("onPlayerStateChange");
***REMOVED***

  loadPlayer(): void {
    if (this.youtube.ready && this.youtube.playerId) {
      if (this.youtube.player) {
        this.youtube.player.destroy();
    ***REMOVED***
      this.youtube.player = this.createPlayer("M7lc1UVf-VE");
  ***REMOVED***
***REMOVED***

  setupPlayer() {
    console.log("Running Setup Player");
    window["onYouTubeIframeAPIReady"] = () => {
      if (window["YT"]) {
        console.log("Youtube API is ready");
        this.youtube.ready = true;
        this.youtube.playerId = "placeholder";
        this.loadPlayer();
    ***REMOVED***
  ***REMOVED***;
    // if (window.YT && window.YT.Player) {
    //         console.log('Youtube Player is ready');
    //      this.youtube.ready = true;
    //      this.youtube.playerId = 'placeholder';
    //      this.loadPlayer();
    // }
***REMOVED***

  launchPlayer(id, title): void {
    this.createPlayer(id.videoId);
***REMOVED***
}
