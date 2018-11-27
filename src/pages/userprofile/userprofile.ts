import { SigninPage } from './../signin/signin';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private authPROV:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

  signoutConfirm(){
    let alert = this.alertCtrl.create({
      subTitle:'Are you sure you want to signout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authPROV.signOut().then(() => {
              this.authPROV.signOut();
              this.navCtrl.setRoot(SigninPage);
            });
          }
        }
      ]
    });
    alert.present();
  } 

}
