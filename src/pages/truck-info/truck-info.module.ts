import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckInfoPage } from './truck-info';

@NgModule({
  declarations: [
    TruckInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckInfoPage),
  ],
})
export class TruckInfoPageModule {}
