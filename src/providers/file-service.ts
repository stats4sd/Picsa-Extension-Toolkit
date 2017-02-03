import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import { File } from 'ionic-native';
declare let cordova: any;
declare let window:any

@Injectable()
export class FileService {
  platforms:any;
  mainPlatform:string;
  fs:any;

  constructor(public http: Http, public platform:Platform) {
    this.checkPlatform();
    if(this.mainPlatform=='mobile'){
      this.fs= cordova.file.dataDirectory;
    }else{this.fs=undefined}
  }

  checkPlatform(){
   this.platforms=this.platform.platforms()
   if(this.platform.is('mobile')){this.mainPlatform='mobile'}
   if(this.platform.is('core')){this.mainPlatform='desktop'}
  }

  listDirectory(path:string){
    if(this.fs){
      console.log('listing directory')
      return new Promise((resolve, reject) =>{
        File.listDir(this.fs,path).then(res=>
        resolve(res)
      ).catch(err=>
      resolve(err))      
    })
  }
  }

  createDirectory(name:string){
    if(this.fs){
      console.log('creating directory: '+name)
      return new Promise((resolve,reject)=>{
        File.createDir(this.fs,name,false).then(res =>
          resolve(res)
      ).catch(err=>
      resolve(err))
      })
    }
  }

  createFile(filepath,filename:string,data:any,replace:boolean){
    if(this.fs){
        return new Promise((resolve,reject)=>{
          File.createFile(this.fs+filepath,filename,true).then(res=>{
            console.log('file created')
          File.writeFile(this.fs+filepath, filename, data,{}).then(res => 
          resolve('file written')
        ).catch(err=> resolve(err))
      }).catch(err=>{console.log('file could not be created');resolve(err)})
      }
        )}
  }
}


