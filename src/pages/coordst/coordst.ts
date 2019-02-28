import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import { TruckPage } from '../truck/truck';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { WaterServiceTabsPage } from '../water-service-tabs/water-service-tabs';
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
  address;
  map: any;
  data: any;
  estado: any;
  isSaved=false;
  next='';
  slatitude:string="";
  slongitude:string="";
  constructor(private alertCtrl: AlertController,public navCtrl: NavController,private geoCoder:GeocoderProvider,private loadingCtrl:LoadingController, private geolocation:Geolocation, public navParams: NavParams) {
  }
  ngOnInit():void{
    this.drawMap();
  }
  ionViewDidEnter(){
    let element = document.querySelectorAll(".tabbar");
    if(element !=null){
      Object.keys(element).map((key)=>{
        element[key].style.display="none"
      })
    }
  }
  ionViewDidLoad() {
    this.locate();
    console.log('ionViewDidLoad CoodsPage');
  }
  locate(){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loading.dismiss();
      this.slatitude=resp.coords.latitude+"";     
      this.slongitude=resp.coords.longitude+"";
      this.confirmAddress(this.slatitude,this.slongitude)
      this.isSaved=true; 
    }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  nextQ(){

    this.navCtrl.setRoot(TruckPage,{slatitude:this.slatitude,slongitude:this.slongitude,address:this.address});
  }
  confirmAddress(lat,lng){
    console.log('confirm')
    this.geoCoder.reverseGeocode(lat,lng).then((data:any)=>{
  
    this.address = data
    console.log('address',this.address);
    let alert = this.alertCtrl.create({
      subTitle: 'Address confirmation',
      message:this.address,
      buttons: ['ok'],
      cssClass: 'alertcss'
    });
    
      alert.present();
  })
  }
  back(){
    this.navCtrl.setRoot(WaterServiceTabsPage)
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
       Leaflet.marker(e.latlng).addTo(map);
     }
     map.on('locationfound', onLocationFound);

    //alert on location error
    function onLocationError(e) {
      alert(e.message);
    }

    this.map.on('locationerror', onLocationError);
  }
}
