import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeafletmapPage } from './leafletmap';

@NgModule({
  declarations: [
    LeafletmapPage,
  ],
  imports: [
    IonicPageModule.forChild(LeafletmapPage),
  ],
})
export class LeafletmapPageModule {}
