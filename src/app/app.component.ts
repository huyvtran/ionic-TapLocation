import { Camera } from '@ionic-native/camera';
import { WaterServiceTabsPage } from './../pages/water-service-tabs/water-service-tabs';
import { ListPage } from './../pages/list/list';
import { SigninPage } from './../pages/signin/signin';
import { TruckPage } from './../pages/truck/truck';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LeafletmapPage } from '../pages/leafletmap/leafletmap';
import { CoodsPage } from '../pages/coods/coods';
import { CoordstPage } from '../pages/coordst/coordst';
import { WaterTapPage } from '../pages/water-tap/water-tap';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

