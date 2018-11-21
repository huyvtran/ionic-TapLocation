import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  tap(){
this.navCtrl.push(MapPage)
  }

  truck(){
    this.navCtrl.push(MapPage)
  }

}
