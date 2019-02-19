import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AppProvider } from '../providers/app/app';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NewsProvider } from '../providers/news/news';
import { NewsPage } from '../pages/news/news';
import { MenuProvider } from '../providers/menu/menu';

@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string; id: any }> = [];

  constructor(
    platform: Platform,
    public app: AppProvider,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private push: Push,
    public alertCtrl: AlertController,
    private news: NewsProvider,
    private menu: MenuController,
    private menuProvider: MenuProvider
  ) {
    platform.ready().then(() => {
      this.rootPage = HomePage;
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPush();
    });

    news
      .getCategories()
      .subscribe(res => (this.pages = this.news.formatResponse(res)));
  }

  initPush() {
    const options: PushOptions = {
      android: {
        forceShow: true,
        topics: ['notify']
      },
      ios: {
        alert: 'true',
        badge: true,
        clearBadge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);
    pushObject
      .on('registration')
      .subscribe((registration: any) =>
        console.log('Device registered ID: ', registration.registrationId)
      );
  }

  goItemPage(id) {
    this.menuProvider.goToCategoryId(id);
    // this.nav.setRoot(NewsPage, { newsId: parseInt(id) });
    this.menu.close();
  }
}
