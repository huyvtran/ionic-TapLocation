import { ListPage } from './../list/list';
import { TruckProvider } from './../../providers/truck/truck';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import 'firebase/database';
import firebase, { User } from 'firebase/app';
import { Platform } from 'ionic-angular';
import { WaterServiceTabsPage } from '../water-service-tabs/water-service-tabs';
import { WaterTruckPage } from '../water-truck/water-truck';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';

/**
 * Generated class for the TruckInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-truck-info',
  templateUrl: 'truck-info.html',
})
export class TruckInfoPage {
  hideMe=true;
  data = [];
  trucks = [];
  keys = [];
  key: string;
  isChecked = true;
  isTruck = true;
  isUpdate = false;
  starttime = '';
  endtime = '';
  listTrucks;
  location: string;
  liters: string = '';
  reliable: string = '';
  time: string = '';
  days: string = '';
  lat: string;
  lng: string;
  reftruck: firebase.database.Reference;
  updateFire: firebase.database.Reference;
  startTime = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  endTime = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  arrdays = ['1', '2', '3', '4', '5', '6', '7'];
  address;
  constructor(public navCtrl: NavController, private truck: TruckProvider,
    public modalCtrl: ModalController, private alertCTR: AlertController,
    public navParams: NavParams,private geoCoder:GeocoderProvider,public platform: Platform) {
    this.listTrucks = this.navParams.get('data');
    this.key=this.listTrucks.key;
    console.log(this.key);
  }

  ionViewDidLoad() {
   
  }

  edit() {
    this.isUpdate = true;
    this.reliable = this.listTrucks.reliable;
    this.liters=this.listTrucks.liters;
    this.time = this.listTrucks.time;
    this.days = this.listTrucks.days;
    this.starttime = this.listTrucks.optime;
    this.endtime = this.listTrucks.clotime;

  }
  viewGoogleMap(){
  
    let destination = this.listTrucks.latitude + ',' + this.listTrucks.longitude;
   
      if(this.platform.is('md')){
        window.open('maps://?q=' + destination, '_system');
      } else {
        let label = encodeURI('My Label');
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      }
  }

  ionViewDidEnter() {
    // this.uploadTaps();
  }
  back(){
    this.navCtrl.setRoot(WaterTruckPage);
  }
  updateTruck() {
    this.updateFire = firebase.database().ref('waterService/trucks/answers/'+this.key);
    this.time = this.starttime +' - '+this.endtime;
    this.update(this.reliable,this.time,this.days,this.liters,this.starttime,this.endtime);
    this.isUpdate=false;
  }

  update(reliable: string, time: string, days: string, liters: string, optime: string, clotime: string): Promise<any> {
    return this.updateFire.update({ reliable, liters, days, time, optime, clotime})
  }

  click() {
    this.isUpdate=false
  }


  updatetk(id: string): Promise<any> {
    return this.updateFire.update({ id })
  }

  ok() {
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