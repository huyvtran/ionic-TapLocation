import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoodsPage } from './coods';

@NgModule({
  declarations: [
    CoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(CoodsPage),
  ],
})
export class CoodsPageModule {}
