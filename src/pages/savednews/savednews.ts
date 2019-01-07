import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { NewsPage } from '../news/news';

@IonicPage()
@Component({
  selector: 'page-savednews',
  templateUrl: 'savednews.html',
})
export class SavednewsPage {

  public items:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: AppProvider) {
    this.app.getSavedNews();
    this.app.savedNews.forEach(element => {
      if(element!=null && element!=undefined){
        this.items.push(element);
      }
    });
  }

  goItemPage(data) {
      this.navCtrl.push(NewsPage, {news: data});
  }
}
