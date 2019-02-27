import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WaterTapPage } from '../water-tap/water-tap';
import { WaterTruckPage } from '../water-truck/water-truck';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the WaterServiceTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-water-service-tabs',
  templateUrl: 'water-service-tabs.html'
})
export class WaterServiceTabsPage {

  waterTapRoot = WaterTapPage
  waterTruckRoot = WaterTruckPage
  userProfile = ProfilePage


  constructor(public navCtrl: NavController) { }

}
