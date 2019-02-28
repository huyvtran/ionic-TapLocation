import { ListPage } from './../list/list';
import { TruckProvider } from './../../providers/truck/truck';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import 'firebase/database';
import firebase, { User } from 'firebase/app';
import { Platform } from 'ionic-angular';

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
  // name:string='Trucks';
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
  // reftruck=firebase.database().ref('waterService/trucks/answers/');
  constructor(public navCtrl: NavController, private truck: TruckProvider,
    public modalCtrl: ModalController, private alertCTR: AlertController,
    public navParams: NavParams,public platform: Platform) {
    this.listTrucks = this.navParams.get('data');
    console.log('io', this.listTrucks)

    this.reftruck = firebase.database().ref('waterService/trucks/answers/');
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.location = this.lat + "-" + this.lng;
    console.log('location', this.location);
    console.log('checked', this.isChecked);


    this.reftruck.on('value', resp => {
      this.trucks = snapshotToArray(resp);
      console.log('hey', this.listTrucks);
    });
    this.truck.getalltrucks().then((res: any) => {
      console.log()

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TruckInfoPage');
    this.uploadtrucks();
  }

  edit(key) {
    this.isUpdate = true;
    this.isChecked = false;
    this.key = key;
    this.reliable = this.trucks[0].reliable;
    this.time = this.trucks[0].time;
    this.days = this.trucks[0].days
    this.starttime = this.trucks[0].optime;
    this.endtime = this.trucks[0].clotime;

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

  updateTruck() {
    this.updateFire = firebase.database().ref('waterService/trucks/answers/' + this.key);
    this.time = this.starttime + ' - ' + this.endtime;
    this.update(this.reliable, this.liters, this.time, this.days, this.starttime, this.endtime);
    this.navCtrl.pop();
  }

  update(reliable: string, time: string, days: string, liters: string, optime: string, clotime: string): Promise<any> {
    return this.updateFire.update({ reliable, liters, days, time, optime, clotime })
  }

  click() {
    this.navCtrl.pop();
  }


  updatetk(id: string): Promise<any> {
    return this.updateFire.update({ id })
  }

  uploadtrucks() {
    this.reftruck.on('value', resp => {
      this.trucks = snapshotToArray(resp);
      for (var i = 0; i < this.trucks.length; i++) {
        if (this.location === this.trucks[i].location) {
          this.trucks.push(this.trucks[i]);
        }
      }
      console.log('data', this.trucks);
    });
    this.truck.getalltrucks().then((res: any) => {
      this.trucks = res;
    });
  }

  ok() {
    this.navCtrl.setRoot(ListPage)
  }

  // changeTruck(){
  //   this.isTruck=true;
  //   this.name="Trucks"
  // }

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