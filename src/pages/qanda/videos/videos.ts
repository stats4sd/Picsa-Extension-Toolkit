import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from 'ionic-native';
import {Platform} from "ionic-angular";
<<<<<<< HEAD
import {FileService} from "../../../providers/file-service"
declare let cordova: any;

=======
import {Http} from '@angular/http'
import {YoutubeService} from '../../../providers/youtube-service'
//declare let cordova: any;
>>>>>>> d472e0482f5e9fbe4e02d336cff84aa86cf7cc88

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
  providers:[FileService]
})
export class VideosPage {
  videos:any;
  fs:string;
  channelID: string = 'UCQLmF5mZgYCu0L4Fb7TxCkA';
  //walker inst: UC8MTu04Zyz7oZGIihcjbNNA
  maxResults: string = '30';
  pageToken: string; 
  googleToken: string = 'AIzaSyBJUkoClld4_1xnivIuqYs5pMZo3UvE0QU';
  searchQuery: string = '';
  posts: any = [];
  onPlaying: boolean = false; 
  done:boolean=false
  player;
  activeVideo;

<<<<<<< HEAD
  constructor(public navCtrl: NavController, public platform:Platform, fileService:FileService) {
    this.videos=[
      {
        name:'034 Women in extension - ENGLISH.mp4',
        size:66.49,
        downloadURL:'https://firebasestorage.googleapis.com/v0/b/extension-toolkit.appspot.com/o/Videos%2F034%20Women%20in%20extension%20-%20ENGLISH.mp4?alt=media&token=9a539872-b55e-42c5-890b-d918e72959c8',
        youtubeURL:'https://youtu.be/M_s9PGklENo',
      }
    ]
    if (this.platform.is('mobile')) {
      let dataObj = new Blob(['some file data'], { type: 'text/plain' });
      console.log(dataObj);
      Promise.all([
        fileService.createDirectory('PICSA-videos'),
        fileService.listDirectory('PICSA-videos'),
        fileService.createFile('PICSA-videos','testdoc.txt','sample text',false)
      ]).then(
        values=>console.log(values)).catch(
          err=>console.log(err))
    }
    else{console.log('working in browser?')}

=======
  constructor(public http: Http, public navCtrl: NavController, public platform:Platform,  public ytPlayer: YoutubeService) {
    this.videos=[
      {
        name:'Women in extension',
        file:'034 Women in extension - ENGLISH.mp4',
        image:'assets/test.png',
        description:'Test description',
        youtubeURL:'',
        link:'https://firebasestorage.googleapis.com/v0/b/extension-toolkit.appspot.com/o/Videos%2F034%20Women%20in%20extension%20-%20ENGLISH.mp4?alt=media&token=9a539872-b55e-42c5-890b-d918e72959c8',
      }
    ]
    // if (this.platform.is('mobile')) {
    //   this.fs= cordova.file.dataDirectory;
    //   File.checkDir(this.fs, 'videos').then(res =>
    //   console.log(res))
    //   .catch(err => 
    //   console.log(err)
    //   );
    // }
    // else{console.log('working in browser?')}
    this.fetchData();
>>>>>>> d472e0482f5e9fbe4e02d336cff84aa86cf7cc88
  }

  ionViewDidLoad() {
    console.log('Hello VideosPage Page');
  }

<<<<<<< HEAD
  testFileFunction(){
    console.log('running test file function)')
    console.log(cordova.file);
    File.listDir(this.fs,'videos').then(res=>
    console.log(res));
    File.createFile(this.fs+'/videos','test.txt',true).then(res =>
    this.fileCheck(res))

  }
  errorFunction(err){
      console.log('error:');
      console.log(err);
    if(err.code==12){
      //directory exists so no really an error, can proceed
      this.testFileFunction()
    }
    else{
      
    }
  }
  fileCheck(res){
    console.log('running file check');
    console.log(res)
    File.listDir(this.fs,'videos')
  }

}
=======
  fetchData(): void {
    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&q=' + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;
    if(this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }
    this.http.get(url).map(res => res.json()).subscribe(data => { 
      console.log (data.items);
      // *** Get individual video data like comments, likes and viewCount. Enable this if you want it.
      // let newArray = data.items.map((entry) => {
      //   let videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,statistics&id=' + entry.id.videoId + '&key=' + this.googleToken;
      //   this.http.get(videoUrl).map(videoRes => videoRes.json()).subscribe(videoData => {
      //     console.log (videoData);
      //     this.posts = this.posts.concat(videoData.items);
      //     return entry.extra = videoData.items;
      //   });
      // });
      this.posts = this.posts.concat(data.items);
    });
  }

  playVideo(e, post): void {
      this.onPlaying = true;
      this.activeVideo=post;
      this.ytPlayer.launchPlayer(post.id, post.snippet.title);
  }
}
>>>>>>> d472e0482f5e9fbe4e02d336cff84aa86cf7cc88
