import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { stringify } from '@angular/core/src/util';
/*
  Generated class for the TruckProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TruckProvider {

  truck:firebase.database.Reference;

  currentUser:User;
  location:string;
  time:string;
  liters:string;
  reliable:string;
  days:string;
  firedata=firebase.database().ref('/trucks');
  constructor() {
  }
  getalltrucks() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  getallhours() {
    this.firedata=firebase.database().ref('/truckhours');
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
   }
}
