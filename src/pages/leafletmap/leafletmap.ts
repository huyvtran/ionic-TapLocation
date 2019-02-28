import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import { WaterTapPage } from '../water-tap/water-tap';
import { WaterTruckPage } from '../water-truck/water-truck';
import { ProfilePage } from '../profile/profile';

declare const L: any; 
/**
 * Generated class for the LeafletmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leafletmap',
  templateUrl: 'leafletmap.html',
})
export class LeafletmapPage {

map: any;
data: any;
estado: any;

  constructor(public navCtrl: NavController) {}
  

}
