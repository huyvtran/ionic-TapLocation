
import { HomePage } from './../home/home';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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

  truck='1';
  location:string;
  time:string;
  liters:string;
  reliable:string;
  days:string;
  tapwater=[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
    this.tapwater=[];
    this.navCtrl.push(HomePage);
  }
  next1(){
    this.tapwater.push(this.location);
    this.truck='2';
    this.location='';
    console.log('data',this.tapwater)
  }
  next2(){
    this.tapwater.push(this.time);
    this.truck='3';
    this.time='';
    console.log('data',this.tapwater)
  }

  next3(){
    this.tapwater.push(this.liters);
    this.truck='4';
    this.liters='';
    console.log('data',this.tapwater)
  }

  next4(){
    this.tapwater.push(this.reliable);
    this.truck='5';
    this.reliable=''
    console.log('data',this.tapwater)
  }

  next5(){
    this.tapwater.push(this.days);
    this.days='';
    console.log('data',this.tapwater)
    
  }
}