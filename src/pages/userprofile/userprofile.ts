import { ProfileProvider } from './../../providers/profile/profile';
import { SigninPage } from './../signin/signin';
import { AuthProvider } from './../../providers/auth/auth';
import { Component,NgZone } from '@angular/core';
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
  avatar:string;
  firstname:string;
  lastname:string;
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,
    private authPROV:AuthProvider,public zone: NgZone,private djPROV:ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

  loaduserdetails() {
    this.djPROV.getuserdetails().then((res: any) => {
      this.firstname = res.firstName;
      this.email = res.email;
      this.lastname= res.lastName;
      console.log('userProfile',res)
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
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
