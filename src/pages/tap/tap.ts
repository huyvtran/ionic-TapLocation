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
  isDone=false;
  isSubmit=false;
  done:string='no';
  location:string='';
  time:string='';
  people:string='';
  reliable:string='';
  safety:string='';
  tapwater=[];
  starttime="";
  endtime="";
  today:number;
  slatitude:string='';
  slongitude:string="";
  hourstocompare=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
  startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
  endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams, private taps:TapProvider) {
    this.tap=this.navParams.get('data');
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
      safety:this.safety
    });
    // this.updatedhours();
    this.tapwater=[];
    this.isCaptured=true;
    this.hide=false;
  }
  // updatedhours(){
  //   firebase.database().ref(`waterService/taps/answers`).push().set({
  //     otime:this.starttime,
  //     ctime:this.endtime,})
  // }
  back2(){
    this.tapwater.splice(0,1);
    this.navCtrl.popTo(CoodsPage);
  }
  back4(){
    this.tap='2';
    this.tapwater.splice(1,1);
  }
  back5(){
    this.tap='3';
    this.tapwater.splice(2,1);
    this.isDone=false;
    this.isSubmit=false;
  }
  backChange(){
    this.tapwater.splice(3,1);
    this.isDone=false;
    this.isSubmit=false;
    this.isBack=false;
  }
  next2(){
    if(this.starttime==='' && this.endtime===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please enter the accessibe time.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
    this.time=this.starttime+" - "+this.endtime;
    this.tapwater.push(this.time);
    this.tap='3';
    this.time='';}
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
    this.tap='4';
    this.reliable='';}
    console.log('data',this.tapwater)
  }

  next5(){
    if(this.safety===''){
      let alert = this.alertCtrl.create({
        subTitle: 'please select your answer.',
        buttons: ['ok']
      });
      alert.present();
    }
    else{
    this.tapwater.push(this.safety);
    this.safety='';
    this.isBack=true;
    this.isSubmit=true;
    this.hide=true;
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
