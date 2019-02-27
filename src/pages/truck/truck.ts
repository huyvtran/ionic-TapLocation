
import { HomePage } from './../home/home';
import firebase, { User, database } from 'firebase/app';
import 'firebase/database';
import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { CoordstPage } from '../coordst/coordst';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WaterTapPage } from '../water-tap/water-tap';

/**
 * Generated class for the TapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-tap',
  templateUrl: 'truck.html',
})
export class TruckPage {

  public user:FormGroup;

  // liters:string;
  isBack=false;
  isCaptured=false;
  isDone=false;
  isSubmit=false;
  hide=false;
  isLoading=false;
  truck='1';
  index:number;
  location:string='';
  time:string='';
  liters:string='';
  reliable:string='';
  days:string='';
  tapwater=[];
  starttime="";
  endtime="";
  key:string;
  slatitude:string="";
  slongitude:string="";
  imgPreview = 'assets/imgs/chatterplace.png';
  currentUser:User;
  
  profileRef: firebase.database.Reference;
  updateFire:firebase.database.Reference;
  reftruck=firebase.database().ref('waterService/trucks/answers/');
  address:string;
  listTrucks = [];
  id:string;
  startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
  endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(public navCtrl: NavController,public zone: NgZone,private camera: Camera,private alertCtrl: AlertController,public FB:FormBuilder,
     public navParams: NavParams) {
       
    this.slatitude=this.navParams.get('slatitude');
    this.slongitude=this.navParams.get('slongitude');
    this.address=this.navParams.get('address');
    this.location=this.slatitude+" - "+this.slongitude;
    this.tapwater.push(this.location);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TapPage');
  }
  uploadTrucks(){
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
      for(var i=0;i<this.listTrucks.length;i++){
         this.index=+i;
      }
      this.key=this.listTrucks[this.index].key;
      this.updateTruck(this.key)
      console.log('index',this.key);
    });
  }
  updateTruck(key){
    this.updateFire=firebase.database().ref('waterService/trucks/answers/'+this.key);
    this.id=key.substr(key.length -5);
    this.update(this.id);
  }
  update(id:string):Promise<any>{
    return this.updateFire.update({id})
  }
  tapdata(){
    this.location=this.tapwater[0];
    this.time=this.tapwater[1];
    this.liters=this.tapwater[2];
    this.reliable=this.tapwater[3];
    this.days=this.tapwater[4];
    firebase.database().ref(`waterService/trucks/answers`).push().set({
      location:this.location,
      time:this.time,
      liters:this.liters,
      reliable:this.reliable,
      days:this.days,
      optime:this.starttime,
      clotime:this.endtime,
      latitude:this.slatitude,
      longitude:this.slongitude,
      address:this.address,
      picture:this.imgPreview
    });

    this.tapwater=[];
    this.isCaptured=true;
    this.hide=false;
    this.uploadTrucks();
  }

  back2(){
    this.tapwater.splice(0,1);
    this.navCtrl.setRoot(CoordstPage);
  }
  back3(){
    this.truck='1';
    this.tapwater.splice(1,1);
  }
  back4(){
    this.truck='2';
    this.tapwater.splice(2,1);
  }
  back5(){
    this.truck='3';
    this.tapwater.splice(3,1);
  }
  next2(){
    if(this.starttime==='' && this.endtime===''){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the operational time.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else if(this.starttime===''){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the arrival time.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else if(this.endtime===''){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the departure time.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else{
      this.time=this.starttime+" - "+this.endtime;
      this.tapwater.push(this.time);
      this.truck='2';
      this.time='';}
    console.log('data',this.tapwater)
  }

  next3(){
    if(this.liters===''){
      let alert = this.alertCtrl.create({
        subTitle: 'Please select one.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.liters);
    this.truck='3';
    // this.liters='';
  }
    console.log('data',this.tapwater)
  }

  next4(){
    if(this.reliable===''){
      let alert = this.alertCtrl.create({
        subTitle: 'Please select your answer.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.reliable);
    this.truck='4';
    this.reliable=''}
    console.log('data',this.tapwater)
  }

  next5(){
    if(this.days===''){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the number of day(s).',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else{
      this.tapwater.push(this.days);
      this.days='';
      this.isCaptured=true;
      let alert = this.alertCtrl.create({
        message:'<img src="../../assets/imgs/giphy.gif">',
        subTitle:'Confirm by taking a picture of the tap',
        buttons: [{
          text:'Ok',
          handler:(data)=>{
            this.takePhoto();
          }
        }]
      })
      alert.present();
    }
    console.log('data',this.tapwater)
    
  }
  takePhoto() {
    this.tapdata();
    this.uploadTrucks();
    this.isLoading=true;
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType:this.camera.MediaType.PICTURE,
      // targetHeight: 500,
      // targetWidth: 500,
      allowEdit:true,
      correctOrientation: false,
    }).then((profilePicture) => {
      this.profileRef=database().ref('waterService/trucks/answers/'+this.key);
  
      firebase.storage().ref('trucks/pictures/'+this.key).putString(profilePicture, 'base64', { contentType: 'image/png' })
      .then((savedProfilePicture) => {
        savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
          this.imgPreview = downloadedUrl;
          this.isLoading=false;
          this.profileRef.child('/picture').set(downloadedUrl);
          let alert = this.alertCtrl.create({
            subTitle:'',
            message:'<img src="../../assets/imgs/checkmark-gif.gif">',
            buttons: [{
              text:'Ok',
              handler:(data)=>{
                this.navCtrl.setRoot(WaterTapPage)
              }
            }]
          })
          alert.present();
        })
    
        })
     
    }, err => {
      console.log('érror' + JSON.stringify(err))
    })
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