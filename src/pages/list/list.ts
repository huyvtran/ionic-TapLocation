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
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    this.navCtrl.push(ProfilePage)
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