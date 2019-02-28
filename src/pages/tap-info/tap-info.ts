
import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
import 'firebase/database';
import firebase, { User } from 'firebase/app';
import { TapProvider } from '../../providers/tap/tap';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the TapInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tap-info',
  templateUrl: 'tap-info.html',
})
export class TapInfoPage {
  hideMe=true;
  isInfo=true;
  isTap=true;

  // key='';
  data=[];
  taps=[];
  keys=[];
  key:string;
  isChecked=true;
  isUpdate=false;
  starttime='';
  endtime='';
  listTaps;
  location:string;
  reliable:string='';
  time:string='';
  safety:string='';
  lat:string;
  lng:string;
   reftap:firebase.database.Reference;
   updateFire:firebase.database.Reference;
  startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
  endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  // reftap = firebase.database().ref('waterService/taps/answers/');
  constructor(public navCtrl: NavController,private tap:TapProvider,
  public modalCtrl:ModalController, private alertCTR: AlertController,
  public navParams: NavParams,public platform: Platform) {
   this.listTaps=this.navParams.get('data');
   console.log('io',  this.listTaps)

      this.reftap = firebase.database().ref('waterService/taps/answers/');
      this.lat=this.navParams.get('lat');
      this.lng=this.navParams.get('lng');
      this.location=this.lat+" - "+this.lng;
      console.log('location',this.location);
      console.log('checked',this.isChecked);
  
      this.reftap.on('value', resp => {
        this.taps = snapshotToArray(resp);
      });
      this.tap.getalltaps().then((res: any) => {
        console.log()
      });

  }
  viewGoogleMap(){
  
    let destination = this.listTaps.latitude + ',' + this.listTaps.longitude;
   
      if(this.platform.is('md')){
        window.open('maps://?q=' + destination, '_system');
      } else {
        let label = encodeURI('My Label');
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
  }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
    this.uploadTaps();
  }
  ionViewDidEnter() {
    // this.uploadTaps();
 }

 edit(key){
  this.isUpdate=true;
  this.isChecked=false;
  this.key=key;
  this.reliable=this.taps[0].reliable;
  this.time=this.taps[0].time;
  this.safety=this.taps[0].safety
  this.starttime=this.taps[0].optime;
  this.endtime=this.taps[0].clotime;
  
}

updateTap(){
  console.log('data',this.key);
    this.updateFire=firebase.database().ref('waterService/taps/answers/'+this.key);
    this.time=this.starttime+' - '+this.endtime;
    this.update(this.reliable,this.safety,this.time,this.starttime,this.endtime);
    this.isUpdate=false;
}

update(reliable:string,safety:string,time:string,optime:string,clotime:string):Promise<any>{
  return this.updateFire.update({reliable,safety,time,optime,clotime})
}

click(){
  this.isUpdate=false
}

uploadTaps(){
  this.reftap.on('value', resp => {
    this.taps = snapshotToArray(resp);
    for(var i=0;i<this.taps.length;i++){
      if(this.location===this.taps[i].location){
         this.taps.push(this.taps[i]);
      }
    }
    console.log('data',this.taps);
  });
  this.tap.getalltaps().then((res: any) => {
    
  });
}

 ok(){
   this.navCtrl.setRoot(ListPage)
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