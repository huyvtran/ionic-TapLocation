import { TruckProvider } from './../../providers/truck/truck';

import { HomePage } from './../home/home';
import { UserprofilePage } from './../userprofile/userprofile';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';

import { TapProvider } from '../../providers/tap/tap';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

/**
 * Generated class for the WaterTapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-water-tap',
  templateUrl: 'water-tap.html',
})
export class WaterTapPage {
  listTaps = [];

  imgPreview = null;
  name: string = 'trucks';
  key: any;
  refTap = firebase.database().ref('waterService/taps/answers/');

  constructor(public navCtrl: NavController, private camera: Camera, public navParams: NavParams, private tapsProvider: TapProvider) {
  }

  ionViewDidEnter() {
    this.uploadTap();


  }
  uploadTap() {
    this.refTap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);

    });
    this.tapsProvider.getalltaps().then((res: any) => {
    });
  }
  scroll(event) {



    var searchTxt = document.getElementsByClassName("searchBar") as HTMLCollectionOf<HTMLElement>;



    if (event.directionY == "down") {

      if (event.scrollTop >= 15) {


        searchTxt[0].style.top = "5px";



      }
    }
    else {
      searchTxt[0].style.top = "18px";
    }

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
