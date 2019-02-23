import { HomePage } from './../home/home';
import { UserprofilePage } from './../userprofile/userprofile';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TruckProvider } from '../../providers/truck/truck';
import { TapProvider } from '../../providers/tap/tap';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  isTap=true;
  isTruck=false;
  listTaps = [];
   listTrucks = [];
   imgPreview = null;
   name:string='Taps';
   key:any;
   reftap = firebase.database().ref('waterService/taps/answers/');
   reftruck=firebase.database().ref('waterService/trucks/answers/');
  constructor(public navCtrl: NavController,private camera: Camera, public navParams: NavParams,private truck:TruckProvider,private tap:TapProvider) {

  }
  //please help us with the camera.
  //the key that the method receives is from the html, which will help to set up a downloadURL
  takePhotoTruck(key) {

    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true,
      targetHeight: 800,
      targetWidth: 500,
      allowEdit: true,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((profilePicture) => {
      profilePicture=
      firebase.storage().ref(`waterService/taps/answers/${key}`).putString(profilePicture, 'base64', { contentType: 'image/png' })
      .then((savedProfilePicture) => {
      
        savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
        this.imgPreview = downloadedUrl;
          this.reftap.child('/picture').set(downloadedUrl)
       
        })
    
        })
     
    }, err => {
      console.log('érror' + JSON.stringify(err))
    })
   }
   //please help us with the truck camera
  takePhotoTap(key) {

    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true,
      targetHeight: 800,
      targetWidth: 500,
      allowEdit: true,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((profilePicture) => {
      profilePicture=
      firebase.storage().ref(`waterService/taps/answers/${key}`).putString(profilePicture, 'base64', { contentType: 'image/png' })
      .then((savedProfilePicture) => {
      
        savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
        this.imgPreview = downloadedUrl;
          this.reftap.child('/picture').set(downloadedUrl)
       
        })
    
        })
     
    }, err => {
      console.log('érror' + JSON.stringify(err))
    })
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  ionViewDidEnter() {
    this.uploadTaps();
    this.uploadtrucks();
 
 }
 changeTap(){
  this.isTap=true;
  this.isTruck=false;
  this.name="Taps"
}
changeTruck(){
  this.isTruck=true;
  this.isTap=false;
  this.name="Trucks"
}
  profile(){
    this.navCtrl.push(UserprofilePage)
  }

  add(){
    this.navCtrl.push(HomePage)
  }
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
    });
    this.tap.getalltaps().then((res: any) => {
    });
  }
  uploadtrucks(){
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
 
    });
    this.truck.getalltrucks().then((res: any) => {
    });
  } 
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}