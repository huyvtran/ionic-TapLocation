import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the TruckProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TapProvider {

  location:string;
  time:string;
  people:string;
  reliable:string;
  safety:string;

  constructor() {
  }

}
