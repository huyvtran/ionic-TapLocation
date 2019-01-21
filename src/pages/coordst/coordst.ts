import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import { TruckPage } from '../truck/truck';
/**
 * Generated class for the CoordstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coordst',
  templateUrl: 'coordst.html',
})
export class CoordstPage {

  map: any;
  data: any;
  estado: any;
  isSaved=false;
  next='';
  tap='1'
  slatitude:string="";
  slongitude:string="";
  constructor(public navCtrl: NavController, private geolocation:Geolocation, public navParams: NavParams) {
  }
  ngOnInit():void{
    this.drawMap();
  }
  ionViewDidLoad() {
    this.locate();
    console.log('ionViewDidLoad CoodsPage');
  }
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = " latitude:"+ resp.coords.latitude + " \n " + "longidute: " + resp.coords.longitude
      this.slatitude=resp.coords.latitude+"";     
      this.slongitude=resp.coords.longitude+"";
      this.isSaved=true; 
    }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  nextQ(){
    this.next='2'
    this.navCtrl.push(TruckPage,{data:this.next,slatitude:this.slatitude,slongitude:this.slongitude});
  }
  drawMap(): void {
    this.map = Leaflet.map('map').setView([-0.1836298, -78.4821206], 13);
    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'AppTuto',
      maxZoom: 15
    }).addTo(this.map);

 
    var map = this.map;

     //web location
     map.locate({ setView: true});

     //when we have a location draw a marker and accuracy circle
     function onLocationFound(e) {
       var radius = e.accuracy / 2;
       Leaflet.marker(e.latlng).addTo(map)
       Leaflet.circle(e.latlng, radius).addTo(map);
     }
     map.on('locationfound', onLocationFound);

    //alert on location error
    function onLocationError(e) {
      alert(e.message);
    }

    this.map.on('locationerror', onLocationError);
  }
}
