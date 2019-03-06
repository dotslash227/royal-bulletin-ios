import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { AppProvider } from "../../providers/app/app";
import { NewsProvider } from "../../providers/news/news";
import { HomePage } from "../home/home";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
  })

  export class ContactPage{

    constructor(
        public navCtrl: NavController,
        private app: AppProvider,
        public toastCtrl: ToastController,
        public navParams: NavParams,
        private newsProvider: NewsProvider
      ){
      }

      goToHome(){
        this.navCtrl.setRoot(HomePage);
      }

  }