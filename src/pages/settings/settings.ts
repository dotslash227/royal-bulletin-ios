import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  nightmode:boolean = true;

  constructor(public navCtrl: NavController,
              private app: AppProvider,
              public navParams: NavParams) {
    this.nightmode = app.selectedTheme==='dark-theme';
  }

  ionViewDidLoad() {
  }
  
  toggleAppTheme() {
    if (this.nightmode) {
      this.app.setActiveTheme('dark-theme');
    } else {
      this.app.setActiveTheme('light-theme');
    }
  }

  changeFont(pluse:boolean = true){
      this.app.fontSize = pluse ? this.app.fontSize + 4 : this.app.fontSize - 4;
      this.app.updateSetting();
  }

  goSavedNews(){
    this.navCtrl.push('SavednewsPage');
  }
}
