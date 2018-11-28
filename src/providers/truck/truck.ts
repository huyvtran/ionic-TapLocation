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

  constructor() {
  }
  waterTruck(location,time,liters,reliable,days){
    firebase.database().ref(`/trucks`).push().set({
      location:this.location,
      time:this.time,
      liters:this.liters,
      reliable:this.reliable,
      days:this.days
    });
  }
}
