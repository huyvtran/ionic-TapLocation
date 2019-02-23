
import { Injectable } from '@angular/core';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';


/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  currentPicture: string = null
  newPicture:any;
  currentUser
  firebaseRef
  pictureUrl:string;
  key:any;
  databaseRef:firebase.database.Reference
  constructor() {
 
  }


  saveImage(proPicture){

    console.log(this.currentUser)
    firebase.storage().ref(`waterService/taps/answers/${this.key}`).putString(proPicture, 'base64', { contentType: 'image/png' })
    .then((savedProfilePicture) => {
    
      savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
      this.pictureUrl = downloadedUrl;
        this.firebaseRef.child('/picture').set(downloadedUrl)
     
      })
     
  
      })
      console.log(this.pictureUrl)
     return this.pictureUrl;
    
}

}
