import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavednewsPage } from './savednews';

@NgModule({
  declarations: [
    SavednewsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavednewsPage),
  ],
})
export class SavednewsPageModule {}
