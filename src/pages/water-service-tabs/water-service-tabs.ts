import { UserprofilePage } from './../userprofile/userprofile';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WaterTapPage } from '../water-tap/water-tap';
import { WaterTruckPage } from '../water-truck/water-truck';

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
  userProfile = UserprofilePage


  constructor(public navCtrl: NavController) { }

}
