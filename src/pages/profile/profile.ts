import { SigninPage } from './../signin/signin';
import { ProfileProvider } from './../../providers/profile/profile';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, LoadingController, AlertController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { WaterServiceProvider } from '../../providers/water-service/water-service';
import { ListPage } from '../list/list';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imgPreview = 'assets/imgs/chatterplace.png';
  currentUser: User;
  profileRef: firebase.database.Reference;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public zone: NgZone, private userProv: ProfileProvider, private camera: Camera, public navParams: NavParams, private alertCtrl: AlertController) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.currentUser = user;
        this.profileRef = firebase.database().ref(`/userProfile/${user.uid}`);

      }
    })
  }
  ionViewWillEnter() {
    this.loaduserdetails();
  }
  updatePassword() {
    const alert: Alert = this.alertCtrl.create({

      inputs: [{
        name: 'oldPassword',
        placeholder: 'Enter old password',
        type: 'password'

      }, {
        name: 'newPassword',
        placeholder: 'Enter new password',
        type: 'password'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Save',
        handler: data => {
          this.userProv.updatePassword(data.newPassword, data.oldPassword)
            .catch(err => {
              console.log('Error message from catch:', err.message)
              let newAlert: Alert = this.alertCtrl.create({
                message: err.message
              })
              newAlert.present();
            })
        }
      }]
    })
    alert.present()
  }
  logout() {
    this.userProv.signOut().then(() => {
      this.navCtrl.setRoot(SigninPage);
    })
  }

  loaduserdetails() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userProv.getuserdetails().then((res: any) => {
      this.firstname = res.firstName;
      this.lastname = res.lastName;
      this.email = res.email;
      console.log('userProfile', res)
      this.zone.run(() => {
        this.imgPreview = res.picture;
      })
      loading.dismiss();
    })
  }
  done() {
    this.navCtrl.popTo(ListPage);
  }
  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true,
      targetHeight: 500,
      targetWidth: 500,
      allowEdit: true,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((profilePicture) => {
      let loading = this.loadingCtrl.create({
        content: 'uploading...'
      });
      loading.present();
      profilePicture = firebase.storage().ref(`/userProfile/${this.currentUser.uid}`).putString(profilePicture, 'base64', { contentType: 'image/png' })
        .then((savedProfilePicture) => {

          savedProfilePicture.ref.getDownloadURL().then((downloadedUrl) => {
            this.imgPreview = downloadedUrl;
            this.profileRef.child('/picture').set(downloadedUrl)
            loading.dismiss();
          })

        })

    }, err => {
      console.log('érror' + JSON.stringify(err))
    })
  }
}
