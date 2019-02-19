import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { AppProvider } from "../../providers/app/app";
import { NewsProvider } from "../../providers/news/news";

@Component({
    selector: "page-category",
    template: "category.html"
})

export class CategoryPage {
    private news: any | null = null;
  
    constructor(
      public navCtrl: NavController,
      private app: AppProvider,
      public toastCtrl: ToastController,
      public navParams: NavParams,
      private newsProvider: NewsProvider
    ) {
    //   Add code To fetch latest news
    }

  
    openNews(){

    }
  }