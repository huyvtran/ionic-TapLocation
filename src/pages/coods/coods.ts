import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import { TapPage } from '../tap/tap';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';
/**
 * Generated class for the CoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coods',
  templateUrl: 'coods.html',
})
export class CoodsPage {
  address;
  map: any;
  data: any;
  estado: any;
  isSaved=false;
  slatitude:string="";
  slongitude:string="";
  constructor(private alertCtrl: AlertController,private geoCoder:GeocoderProvider,public navCtrl: NavController, private loadingCtrl:LoadingController, private geolocation:Geolocation, public navParams: NavParams) {
  
  }
  ngOnInit():void{
    this.drawMap();
  }
  ionViewDidLoad() {
    this.locate();
    console.log('ionViewDidLoad CoodsPage');
  }
  locateme(){
    this.geolocation.getCurrentPosition().then((resp) => {});
    var map = this.map;
    map.locate({ setView: true});

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
      this.isSaved=true; 
      this.confirmAddress(this.slatitude,this.slongitude)
    }).catch((error) => {
       console.log('Error getting location', error);
     });
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
  nextQ(){
    this.navCtrl.setRoot(TapPage,{slatitude:this.slatitude,slongitude:this.slongitude,address:this.address});
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
  back(){
    this.navCtrl.setRoot(HomePage)
  }

}
