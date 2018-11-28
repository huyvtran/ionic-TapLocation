import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the WaterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WaterServiceProvider {
  userProfile:firebase.database.Reference;
  currentUser:User;
  constructor() {

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
       this.userProfile= firebase.database().ref(`/userProfile/${user.uid}/waterService`);
      }
    })
  }
}
