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
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase';
import { ProfileProvider } from '../providers/profile/profile';



var config = {
      apiKey: "AIzaSyDDpPOYQFcw6mG_bNtfHw5MNqQv5627o_w",
      authDomain: "waterproject-f6b87.firebaseapp.com",
      databaseURL: "https://waterproject-f6b87.firebaseio.com",
      projectId: "waterproject-f6b87",
      storageBucket: "waterproject-f6b87.appspot.com",
      messagingSenderId: "885621857289"
    };
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    TapPage,
    TruckPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    UserprofilePage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    TapPage,
    TruckPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    UserprofilePage
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider
  ]
})
export class AppModule {}
