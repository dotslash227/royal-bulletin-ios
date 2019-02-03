import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AppProvider } from '../providers/app/app';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NewsProvider } from '../providers/news/news';
import { Network } from "@ionic-native/network";

@Component({
  templateUrl: `app.html`
})
export class MyApp {
  rootPage: any = HomePage;
  pages: Array<{title: string, id: any}>;
  private news:NewsProvider;
  private network: Network;
  public isInternet: boolean;

  constructor(platform: Platform, public app: AppProvider, statusBar: StatusBar,
    splashScreen: SplashScreen, private push: Push, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.rootPage = HomePage;
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPush();
    });
    

    this.pages = [
      {title: "Home", id:"1"}
    ]

  }

  loadCategoryList() {
    if (this.network.type !== "none") {
      this.news.getCategories().subscribe(data => {
        this.app.category = this.news.formatResponse(data);
        console.log(this.app.category);
        this.changeTab(this.app.category[0].id);
      });
    } else {
      this.isInternet = true;
    }
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