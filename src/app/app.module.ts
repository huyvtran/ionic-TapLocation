import { TruckInfoPage } from './../pages/truck-info/truck-info';
import { TapInfoPage } from './../pages/tap-info/tap-info';
import { Camera } from '@ionic-native/camera';
import { WaterTruckPage } from './../pages/water-truck/water-truck';
import { WaterTapPage } from './../pages/water-tap/water-tap';
import { WaterServiceTabsPage } from './../pages/water-service-tabs/water-service-tabs';

import { ProfilePage } from './../pages/profile/profile';
import { ListPage } from './../pages/list/list';
import { UserprofilePage } from './../pages/userprofile/userprofile';
import { ResetpasswordPage } from './../pages/resetpassword/resetpassword';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TruckPage } from './../pages/truck/truck';
import { TapPage } from './../pages/tap/tap';
import { MapPage } from './../pages/map/map';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase';
import { ProfileProvider } from '../providers/profile/profile';
import { WaterServiceProvider } from '../providers/water-service/water-service';
import { TapProvider } from '../providers/tap/tap';
import { TruckProvider } from '../providers/truck/truck';
import { LeafletmapPage } from '../pages/leafletmap/leafletmap';
import { CoodsPage } from '../pages/coods/coods';
import { CoordstPage } from '../pages/coordst/coordst';
import { ListProvider } from '../providers/list/list';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { ImageProvider } from '../providers/image/image';

var config = {
  apiKey: "AIzaSyCDA2SmyMOpqB49eOYtL566O6_QZOQL9zQ",
  authDomain: "waterapp-aa3d2.firebaseapp.com",
  databaseURL: "https://waterapp-aa3d2.firebaseio.com",
  projectId: "waterapp-aa3d2",
  storageBucket: "waterapp-aa3d2.appspot.com",
  messagingSenderId: "319915755205"
};
firebase.initializeApp(config);



@NgModule({
  declarations: [
    WaterServiceTabsPage,
    TruckInfoPage,
    WaterTapPage,
    WaterTruckPage,
    MyApp,
    HomePage,
    ListPage,
    CoodsPage,
    MapPage,
    CoordstPage,
    TapPage,
    ProfilePage,
    TruckPage,
    LeafletmapPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    UserprofilePage, TapInfoPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TapInfoPage,
    TruckInfoPage,
    WaterServiceTabsPage,
    WaterTapPage,
    WaterTruckPage,
    MyApp,
    HomePage,
    MapPage,
    CoodsPage,
    CoordstPage,
    ProfilePage,
    LeafletmapPage,
    TapPage,
    ListPage,
    TruckPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    UserprofilePage
  ],

  providers: [
    StatusBar,
    Geolocation,
    NativeGeocoder,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    ProfileProvider,
    WaterServiceProvider,
    TapProvider,
    TruckProvider,
    ListProvider,
    GeocoderProvider,
    Geolocation,
    ImageProvider,
    Camera

  ]
})
export class AppModule { }
