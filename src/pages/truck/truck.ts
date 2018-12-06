
import { HomePage } from './../home/home';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
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
  isBack=false;
  isCaptured=false;
  isDone=false;
  isSubmit=false;
  hide=false;
  truck='1';
  location:string='';
  time:string='';
  liters:string='';
  reliable:string='';
  days:string='';
  tapwater=[];
  starttime="";
  endtime="";
  startTime=["01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
  endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00"];
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TapPage');
  }
  tapdata(){
    this.location=this.tapwater[0];
    this.time=this.tapwater[1];
    this.liters=this.tapwater[2];
    this.reliable=this.tapwater[3];
    this.days=this.tapwater[4];
    firebase.database().ref(`/trucks`).push().set({
      location:this.location,
      time:this.time,
      liters:this.liters,
      reliable:this.reliable,
      days:this.days
    });
    this.updatedhours();
    this.tapwater=[];
    this.isCaptured=true;
    this.hide=false;
  }
  updatedhours(){
    firebase.database().ref(`/truckhours`).push().set({
      otime:this.starttime,
      ctime:this.endtime,})
  }
  back2(){
    this.truck='1';
    this.tapwater.splice(0,1);
  }
  back3(){
    this.truck='2';
    this.tapwater.splice(1,1);
  }
  back4(){
    this.truck='3';
    this.tapwater.splice(2,1);
  }
  back5(){
    this.truck='4';
    this.tapwater.splice(3,1);
    this.isDone=false;
    this.isSubmit=false;
  }
  backChange(){
    this.tapwater.splice(4,1);
    this.isDone=false;
    this.isSubmit=false;
    this.isBack=false;
  }
  next1(){
    if(this.location===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please enter the location.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.location);
    this.truck='2';
    this.location='';}
    console.log('data',this.tapwater)
  }
  next2(){
    if(this.starttime==='' && this.endtime===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please enter the operational time.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
      this.time=this.starttime+" - "+this.endtime;
    this.tapwater.push(this.time);
    this.truck='3';
    this.time='';}
    console.log('data',this.tapwater)
  }

  next3(){
    if(this.liters===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please enter the liters offered.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.liters);
    this.truck='4';
    this.liters='';}
    console.log('data',this.tapwater)
  }

  next4(){
    if(this.reliable===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please select your answer.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.reliable);
    this.truck='5';
    this.reliable=''}
    console.log('data',this.tapwater)
  }

  next5(){
    if(this.days===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please enter the number of days.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.days);
    this.days='';
    this.isBack=true;
    this.isSubmit=true;
    this.hide=true;
  }
    console.log('data',this.tapwater)
    
  }

  yes(){
    this.navCtrl.push(TruckPage);
  }
  no(){
   this.navCtrl.setRoot(HomePage);
 }
}