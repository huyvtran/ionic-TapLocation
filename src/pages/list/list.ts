import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { TapProvider } from '../../providers/tap/tap';
import { TruckProvider } from '../../providers/truck/truck';
import { StorageConfig } from '@ionic/storage';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  trucks=[];
  taps=[];
  list=[];
  times=[];
  otime=[];
  ctime=[];
  hours=[];
  token1=[];
  token2=[];
  token3=[];
  token4=[];
  chour1=[];
  opened=[];
  closed=[];
  openIndex=[];
  checkopen=false;
  checkclose=false;
  closedIndex=[];
  activeTaps=[];
  activetruck=[];
  inactivetaps=[];
  hours1:string;
  hours2:string;
  hours3:string;
  hours4:string;
  water="taps";
  checkTime='';
  today:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private tap:TapProvider, private truck:TruckProvider) {

  }
  ionViewDidLoad() {
    this.loadtaps();
    this.loadtrucks();
    console.log('list',this.list);
  }

  loadtaps() {
  
    var d = new Date();
    var h =d.getHours();
    var tim=h;
    console.log('time',tim);
    this.tap.getalltaps().then((res: any) => {
      this.taps=res;
      console.log('list taps',this.taps);
    });
    this.tap.getallhours().then((res: any) => {
      this.hours=res;
      console.log('hou',this.hours);
      for(let i of this.hours){
        this.token1.push(i.otime.substring(0, 2));
        this.token2.push(i.ctime.substring(0, 2));
      }
      for(var i=0;i< this.token1.length;i++){
        if(this.token1[i]===h.toString()){
          this.opened.push(this.token1[i]);
          this.openIndex.push(i);
          this.activeTaps.push(this.taps[i].time);
          
        }
      
      }

      console.log('active',this.activeTaps);
      console.log('inactive',this.inactivetaps);
      console.log('hours1',this.token1);
      console.log('hours2',this.token2);
   });
   

  }
  loadtrucks(){
    var d = new Date();
    var h =d.getHours();
    var tim=h;
    this.truck.getalltrucks().then((res: any) => {
      this.trucks=res;
     console.log('list trucks',this.trucks)
   });
   this.truck.getallhours().then((res: any) => {
    this.hours=res;
    console.log('hou truck',this.hours);
    for(let i of this.hours){
      this.token1.push(i.otime.substring(0, 2));
      this.token2.push(i.ctime.substring(0, 2));
    }
    for(var i=0;i< this.token1.length;i++){
      if(this.token1[i]===h.toString()){
        this.activetruck.push(this.trucks[i]);
        
      }
    
    }

    console.log('active',this.activetruck);
    console.log('inactive ',this.inactivetaps);
    console.log('hours1',this.token1);
    console.log('hours2',this.token2);
 });
  }

}
