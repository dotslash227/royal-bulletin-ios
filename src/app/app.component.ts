import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AppProvider } from '../providers/app/app';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  template: `<ion-nav [root]="rootPage" [class]="app.selectedTheme"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public app: AppProvider, statusBar: StatusBar,
    splashScreen: SplashScreen, private push: Push, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.rootPage = HomePage;
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPush();
    });
  }

  initPush() {
    const options: PushOptions = {
      android: {
        forceShow: true,
        topics:['notify']
      },
      ios: {
        alert: 'true',
        badge: true,
        clearBadge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered ID: ', registration.registrationId));
  }
}