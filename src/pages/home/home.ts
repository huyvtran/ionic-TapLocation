import { UserprofilePage } from './../userprofile/userprofile';
import { TruckPage } from './../truck/truck';
import { TapPage } from './../tap/tap';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { ListPage } from '../list/list';
import { CoodsPage } from '../coods/coods';
import { CoordstPage } from '../coordst/coordst';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 today:number;
  constructor(private geoCoder:GeocoderProvider, public navCtrl: NavController, private auth:AuthProvider,public alertCtrl:AlertController) {

  }
  

  tap(){
    this.navCtrl.setRoot(CoodsPage);
  }
  ionViewDidEnter(){
this.geoCoder.reverseGeocode(-26.015374,28.2291106).then(results=>{
  console.log(results);
})
  }

  truck(){
    this.navCtrl.setRoot(CoordstPage);
  }
  map(){
    this.navCtrl.push(MapPage);
  }
  active(){
    this.navCtrl.push(ListPage)
  }
  // logout(){
  //   this.auth.signOut();
  //   this.navCtrl.push(SigninPage);
  // }

  logout() {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log Out',
          handler: () => {
            this.auth.signOut();
            this.navCtrl.setRoot(SigninPage);
            console.log('Logged out');
          }
        }
      ],
      cssClass: 'alertcss'
    });
    alert.present();
  }

  


  
}
