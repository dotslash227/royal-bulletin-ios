import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { AppProvider } from "../../providers/app/app";
import { NewsProvider } from "../../providers/news/news";

@Component({
  selector: "page-news",
  templateUrl: "news.html"
})
export class NewsPage {
  private news: any | null = null;
  public related_news: any | null = null;
  public saveIcon: string = "ios-bookmark-outline";

  constructor(
    public navCtrl: NavController,
    private app: AppProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private newsProvider: NewsProvider
  ) {
    this.news = {
      id: this.navParams.get("newsId")
    };
    this.getData();
    this.saveIcon =
      this.app.savedNews[this.news.id] == null ||
      this.app.savedNews[this.news.id] == undefined ||
      !this.app.savedNews[this.news.id]
        ? "ios-bookmark-outline"
        : "ios-bookmark";
  }

  getData() {
    this.newsProvider.getNewsById(this.news.id).subscribe(res => {
      let parser = new DOMParser();
      let oDOM = parser.parseFromString(res, "application/xml");
      let nodes = oDOM.firstChild.childNodes[0]['data'];
      nodes = parser.parseFromString(nodes, "application/xml").firstChild
        .childNodes;

      for (let i = 0; i < nodes.length; i++) {
        let source = {};
        for (let j = 0; j < nodes[i].attributes.length; j++) {
          let attr = nodes[i].attributes[j];
          source[attr.localName] = attr.nodeValue;
        }
        console.log(source);
        this.news = Object.assign(this.news, source);
        this.related_news = this.news.otherCategories
          .split(",")
          .map(element => {
            this.newsProvider
              .getCategoryDetail(parseInt(element))
              .subscribe(res => {
                let parser = new DOMParser();
                let oDOM = parser.parseFromString(res, "application/xml");
                let nodes = oDOM.firstChild.childNodes[0]['data'];
                this.related_news = this.related_news.concat(this.newsProvider.formatResponse(nodes));
              }, err => console.log(err),
                () => {
                  this.related_news = this.related_news.filter(news => news !== undefined);
                console.log(this.related_news);
                return this.related_news;
              });
          });
      }
    });

    // this.app.getData("NewsDetail/" + this.news.id).subscribe(data => {
    //   if (data.news != null && data.news != undefined) {
    //     this.news.views = data.news.views;
    //     this.news.content = data.news.content;
    //   } else if (this.saveIcon === "ios-bookmark") {
    //     this.app.saveNews(this.news);
    //   }
    //   this.releated_news = data.releated_news;
    // });
  }

  goItemPage(data) {
    this.navCtrl.push(NewsPage, { newsId: parseInt(data) });
  }

  saveNews(news: any) {
    this.app.saveNews(news);
    this.saveIcon =
      this.saveIcon === "ios-bookmark"
        ? "ios-bookmark-outline"
        : "ios-bookmark";
    this.presentToast(
      this.saveIcon === "ios-bookmark" ? "News saved" : "News unsaved"
    );
  }

  presentToast(message: string = "") {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
