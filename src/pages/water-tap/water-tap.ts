import { TapInfoPage } from './../tap-info/tap-info';
import { TruckProvider } from './../../providers/truck/truck';

import { HomePage } from './../home/home';
import { UserprofilePage } from './../userprofile/userprofile';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';

import { TapProvider } from '../../providers/tap/tap';
import { Base64 } from '@ionic-native/base64';
import { CoodsPage } from '../coods/coods';

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
  temparr=[];
  isSearch=false;
  reftap = firebase.database().ref('waterService/taps/answers/');
  filteredtaps=[];

  constructor(public app:App,public navCtrl: NavController,  private loadingCtrl: LoadingController, public navParams: NavParams, private tapsProvider: TapProvider) {
    this.reftap.on('value', resp => {
      this.filteredtaps = snapshotToArray(resp);
      this.temparr =  snapshotToArray(resp);
    })
  }
 ionViewDidLoad(){
  this.uploadTap()
 }
 tapInfo(i){
   this.navCtrl.setRoot(TapInfoPage,{data:this.filteredtaps[i]});
 }
 searchuser(searchbar) {
  this.filteredtaps= this.temparr;
  var q = searchbar.target.value;
  if (q.trim() == '') {
    return;
  }

  this.filteredtaps = this.filteredtaps.filter((v) => {
   
    if (v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
      return true;
    }
    else{
      return false;
    }
  })
}
  uploadTap() {
    let loading = this.loadingCtrl.create({
      content: 'Loading content...'
    });
    loading.present();
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
      loading.dismiss();
    });
    this.tapsProvider.getalltaps().then((res: any) => {
    });
  }
  add(){
    this.navCtrl.setRoot(CoodsPage)
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
