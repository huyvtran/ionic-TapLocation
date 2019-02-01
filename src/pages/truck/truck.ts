
import { HomePage } from './../home/home';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { CoordstPage } from '../coordst/coordst';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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
  truck='1';
  location:string='';
  time:string='';
  liters:string;
  liter:string;
  reliable:string='';
  days:string='';
  tapwater=[];
  starttime="";
  endtime="";
  slatitude:string="";
  slongitude:string="";
  startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
  endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,public FB:FormBuilder,
     public navParams: NavParams) {

    this.user= this.FB.group({
  
      liters:['',Validators.compose([Validators.required,
      Validators.minLength(3),
      Validators.pattern('[0-9]*')])],

    })
    
    this.slatitude=this.navParams.get('slatitude');
    this.slongitude=this.navParams.get('slongitude');
    this.location=this.slatitude+" - "+this.slongitude;
    this.tapwater.push(this.location);
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
    firebase.database().ref(`waterService/trucks/answers`).push().set({
      location:this.location,
      time:this.time,
      liters:this.liters,
      reliable:this.reliable,
      days:this.days,
      optime:this.starttime,
      clotime:this.endtime,
      latitude:this.slatitude,
      longitude:this.slongitude
    });

    this.tapwater=[];
    this.isCaptured=true;
    this.hide=false;
  }

  back2(){
    this.tapwater.splice(0,1);
    this.navCtrl.push(CoordstPage);
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
        subTitle: 'Please enter the liters offered.',
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
    this.tapdata();
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