import { HomePage } from './../home/home';
import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase, { User, database } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
import { CoodsPage } from '../coods/coods';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WaterTapPage } from '../water-tap/water-tap';
/**
 * Generated class for the TapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tap',
  templateUrl: 'tap.html',
})
export class TapPage {

  tap='1';
  hide=false;
  isBack=false;
  isCaptured=false;
  isSubmit=false;
  isLoading=false;
  done:string='no';
  location:string='';
  time:string='';
  people:string='';
  reliable:string='';
  safety:string='';
  tapwater=[];
  starttime:string="";
  endtime:string="";
  today:number;
  slatitude:string='';
  slongitude:string="";
  hourstocompare=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
  startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
  endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  reftap = firebase.database().ref('waterService/taps/answers/');
  updateFire:firebase.database.Reference;
  id:string;
  key:any;
  listTaps = [];
  index:number=0;
  imgPreview = 'assets/imgs/chatterplace.png';
  currentUser:User;
  profileRef: firebase.database.Reference;
  len:number;
  address:string;
  constructor(public navCtrl: NavController,public zone: NgZone,private camera: Camera,private alertCtrl: AlertController, public navParams: NavParams, private taps:TapProvider) {
    this.slatitude=this.navParams.get('slatitude');
    this.slongitude=this.navParams.get('slongitude');
    this.address=this.navParams.get('address');
    this.location=this.slatitude+" - "+this.slongitude;
    this.tapwater.push(this.location)
    console.log('TapPage',this.slatitude);
    console.log('TapPage',this.slongitude);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TapPage');
    this.uploadTaps();
  }
  tapdata(){
    this.location=this.tapwater[0];
    this.time=this.tapwater[1];
    this.reliable=this.tapwater[2];
    this.safety=this.tapwater[3];
    firebase.database().ref(`waterService/taps/answers`).push().set({
      location:this.location,
      time:this.time,
      reliable:this.reliable,
      safety:this.safety,
      latitude:this.slatitude,
      optime:this.starttime,
      clotime:this.endtime,
      longitude:this.slongitude,
      address:this.address,
      picture:this.imgPreview
    });
    this.tapwater=[];
    this.uploadTaps();
  }
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
      for(var i=0;i<this.listTaps.length;i++){
         this.index=+i;
      }
      this.key=this.listTaps[this.index].key;
      this.updateTap(this.key)
      console.log('index',this.key);
    });
  }
  updateTap(key){
    this.updateFire=firebase.database().ref('waterService/taps/answers/'+this.key);
    this.id=key.substr(key.length -5);
    this.update(this.id);
    
  }
  update(id:string):Promise<any>{
    return this.updateFire.update({id})
  }
  back1(){
    this.tapwater.splice(0,1);
    this.navCtrl.setRoot(CoodsPage);
  }
  back2(){
    this.tap='1';
    this.tapwater.splice(1,1);
  }
  back3(){
    this.tap='2';
    this.tapwater.splice(2,1);
    this.isSubmit=false;
  }
  next2(){
    if(this.starttime==="" && this.endtime===""){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the accessibe time.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
   
      alert.present();
    }
    else if(this.starttime===""){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the openning time.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
   
      alert.present();
    }
    else if(this.endtime===""){
      let alert = this.alertCtrl.create({
        subTitle: 'Please enter the closing time.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else{
    this.time=this.starttime+" - "+this.endtime;
    this.tapwater.push(this.time);
    this.tap='2';
    this.time='';}
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
    this.tap='3';
    this.reliable='';}
    console.log('data',this.tapwater)
  }

  next5(){
    if(this.safety===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please select your answer.',
        buttons: ['ok'],
        cssClass: 'alertcss'
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.safety);
    this.safety='';
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
  yes(){
   this.navCtrl.push(TapPage);
  }
  takePhoto() {
    this.tapdata();
    this.uploadTaps();
    this.isLoading=true;
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType:this.camera.MediaType.PICTURE,
      // targetHeight: 300,
      // targetWidth: 500,
      allowEdit:true,
    }).then((profilePicture) => {
      this.profileRef=database().ref('waterService/taps/answers/'+this.key);
      firebase.storage().ref('taps/pictures/'+this.key).putString(profilePicture, 'base64', { contentType: 'image/png' })
      .then((savedProfilePicture) => {
        savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
          this.imgPreview = downloadedUrl;
          this.isLoading=false;
          this.profileRef.child('/picture').set(downloadedUrl);
          let alert = this.alertCtrl.create({
            subTitle:'<img src="../../assets/imgs/checkmark-gif.gif">',
            message:'',
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