import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
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
  location:string;
  time:string;
  people:string;
  reliable:string;
  safety:string;
  tapwater=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private taps:TapProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TapPage');
  }
  waterTap(){

  }
  tapdata(){
    this.location=this.tapwater[0];
    this.time=this.tapwater[1];
    this.people=this.tapwater[2];
    this.reliable=this.tapwater[3];
    this.safety=this.tapwater[4];
    firebase.database().ref(`/taps`).push().set({
      location:this.location,
      time:this.time,
      pepole:this.people,
      reliable:this.reliable,
      safety:this.safety
    });
    this.tapwater=[];
    this.navCtrl.push(HomePage);
  }
  next1(){
    this.tapwater.push(this.location);
    this.location='';
    this.tap='2';
    console.log('data',this.tapwater)
  }
  next2(){
    this.tapwater.push(this.time);
    this.tap='3';
    this.time='';
    console.log('data',this.tapwater)
  }

  next3(){
    this.tapwater.push(this.people);
    this.tap='4';
    this.people='';
    console.log('data',this.tapwater)
  }

  next4(){
    this.tapwater.push(this.reliable);
    this.tap='5';
    this.reliable='';
    console.log('data',this.tapwater)
  }

  next5(){
    this.tapwater.push(this.safety);
    this.safety='';
    console.log('data',this.tapwater)
    
  }


}
