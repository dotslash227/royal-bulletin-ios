import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Push } from '@ionic-native/push';
import { AppProvider } from '../providers/app/app';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { NewsProvider } from '../providers/news/news';
import { CategoryPage } from '../pages/category/category';
import { MenuProvider } from '../providers/menu/menu';
import { ContactPage } from "../pages/contact/contact";
import { AdMobFree } from "@ionic-native/admob-free";

@NgModule({
  declarations: [MyApp, HomePage, NewsPage, CategoryPage, ContactPage],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: ''
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, NewsPage, CategoryPage, ContactPage],
  providers: [
    StatusBar,
    SplashScreen,
    AppProvider,
    NewsProvider,
    Network,
    Push,
    AppProvider,
    AdMobFree,
    MenuProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MenuProvider
  ]
})
export class AppModule {}
