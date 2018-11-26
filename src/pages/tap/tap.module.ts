import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TapPage } from './tap';

@NgModule({
  declarations: [
    TapPage,
  ],
  imports: [
    IonicPageModule.forChild(TapPage),
  ],
})
export class TapPageModule {}
