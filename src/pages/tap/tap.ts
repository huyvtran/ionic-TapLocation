import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
import { CoodsPage } from '../coods/coods';
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
  
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams, private taps:TapProvider) {
    this.slatitude=this.navParams.get('slatitude');
    this.slongitude=this.navParams.get('slongitude');
    this.location=this.slatitude+" - "+this.slongitude;
    this.tapwater.push(this.location)
    console.log('TapPage',this.slatitude);
    console.log('TapPage',this.slongitude);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TapPage');
    
  }
  waterTap(){

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
      longitude:this.slongitude
    });
    this.tapwater=[];
    this.isCaptured=true;
    this.hide=false;
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
    this.tapdata()
    }
    console.log('data',this.tapwater)
    
  }
 yes(){
   this.navCtrl.push(TapPage);
 }
 no(){
  this.navCtrl.setRoot(HomePage);
}

}
