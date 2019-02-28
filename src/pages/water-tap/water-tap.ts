import { TapInfoPage } from './../tap-info/tap-info';
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
  isSearchbarOpened=false;
  imgPreview = null;
  name: string = 'trucks';
  key: any;
  temparr=[];
  reftap = firebase.database().ref('waterService/taps/answers/');
  filteredtaps=[];

  constructor(public app:App,public navCtrl: NavController,  private loadingCtrl: LoadingController, public navParams: NavParams, private tapsProvider: TapProvider) {
    this.reftap.on('value', resp => {
      this.filteredtaps = snapshotToArray(resp);
    })
  }
  tapInfo(i:number){
    
    this.navCtrl.push(TapInfoPage,{data:this.listTaps[i]})
    // alert(JSON.stringify(this.listTaps[i]))
  }
  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }
  ionViewDidEnter() {
  this.uploadTap();


  }
  searchTaps(searchbar) {
    this.reftap.on('value', resp => {
      this.filteredtaps = snapshotToArray(resp);
      console.log('ta[[]]',this.filteredtaps);
    })
  
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
 
    this.filteredtaps = this.filteredtaps.filter((v) => {
      if ((v.id.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
        console.log('ta[[]]',this.filteredtaps);
        return true;
      }
      return false;
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
    this.navCtrl.push(CoodsPage)
  }



  // scroll(event) {
  //   var searchTxt = document.getElementsByClassName("searchBar") as HTMLCollectionOf<HTMLElement>;
  //   if (event.directionY == "down") {
  //    if (event.scrollTop >= 15) {
  //     searchTxt[0].style.top = "5px";
  //   }
  //   }
  //   else {
  //   searchTxt[0].style.top = "18px";
  //   }
  //   }


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
