import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TapInfoPage } from './tap-info';

@NgModule({
  declarations: [
    TapInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TapInfoPage),
  ],
})
export class TapInfoPageModule {}
