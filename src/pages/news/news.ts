import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AppProvider} from "../../providers/app/app";

@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
})
export class NewsPage {
    private news: any | null = null;
    public releated_news: any | null = null;
    public saveIcon:string = 'ios-bookmark-outline';

    constructor(public navCtrl: NavController,
                private app: AppProvider,
                public toastCtrl: ToastController,
                public navParams: NavParams) {
        this.news = this.navParams.get('news');
        this.getData();
        this.saveIcon = this.app.savedNews[this.news.id]==null || this.app.savedNews[this.news.id]==undefined || !this.app.savedNews[this.news.id] ? 'ios-bookmark-outline' : 'ios-bookmark';
    }

    getData() {
        this.app
            .getData('NewsDetail/' + this.news.id)
            .subscribe(data => {
                if(data.news!=null && data.news!=undefined){
                    this.news.views =  data.news.views;
                    this.news.content = data.news.content;
                }else if(this.saveIcon==='ios-bookmark'){
                    this.app.saveNews(this.news);
                }
                this.releated_news = data.releated_news;
            });
    }

    goItemPage(data){
        this.navCtrl.push(NewsPage,{news:data});
    }

    saveNews(news:any){
        this.app.saveNews(news);
        this.saveIcon = this.saveIcon==='ios-bookmark' ? 'ios-bookmark-outline' : 'ios-bookmark';
        this.presentToast(this.saveIcon==='ios-bookmark' ? 'News saved' : 'News unsaved');
    }

    presentToast(message:string = '') {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
}
