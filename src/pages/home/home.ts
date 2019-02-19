import { Component, ViewChild, NgZone, Renderer } from '@angular/core';
import {
  Content,
  NavController,
  Keyboard,
  MenuController
} from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { Network } from '@ionic-native/network';
import { NewsPage } from '../news/news';
import { throttle } from 'lodash';
import { NewsProvider } from '../../providers/news/news';
import { MenuProvider } from '../../providers/menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  public isInternet: boolean;
  private activeTab: string;
  public errorMessage: string = null;
  private newsList: any = [];
  private showFloat: boolean = false;
  private query: string = '';
  private isSearchBar: boolean = false;

  constructor(
    private navCtrl: NavController,
    private network: Network,
    private zone: NgZone,
    private renderer: Renderer,
    private keyboard: Keyboard,
    private app: AppProvider,
    private news: NewsProvider,
    private menu: MenuController,
    private menuProvider: MenuProvider
  ) {
    this.scrollToTop = throttle(this.scrollToTop, 500, {
      leading: true,
      trailing: false
    });
    this.loadCategoryList();
  }

  ngOnInit() {
    this.menuProvider.change.subscribe(id => {
      console.log(id);
      this.changeTab(id);
    });
  }

  loadCategoryList() {
    if (this.network.type !== 'none') {
      this.news.getCategories().subscribe(data => {
        this.app.category = this.news.formatResponse(data);
        console.log(this.app.category);
        this.changeTab(this.app.category[0].id);
      });
    } else {
      this.isInternet = true;
    }
  }

  loadNewsList(infiniteScroll: any = null, refresh: boolean = false) {
    if (this.network.type !== 'none') {
      this.isInternet = false;
      this.errorMessage = null;

      // get news list from a category
      this.news.getCategoryDetail(this.query).subscribe(
        res => {
          let parser = new DOMParser();
          let oDOM = parser.parseFromString(res, 'application/xml');
          let nodes = oDOM.firstChild.childNodes[0]['data'];
          console.log('newslist', this.news.formatResponse(nodes));
          this.newsList = this.news.formatResponse(nodes);
          if (infiniteScroll != null) infiniteScroll.complete();
        },
        err => {
          console.log(err);
          this.isInternet = true;
          if (infiniteScroll != null) infiniteScroll.complete();
        }
      );

      // this.app
      //   .getData(
      //     "News/" +
      //       this.activeTab +
      //       "?page=" +
      //       (refresh ? 0 : this.newsList.length) +
      //       this.query
      //   )
      //   .subscribe(
      //     data => {
      //       if (refresh) this.newsList = [];
      //       if (data.news.length > 0) {
      //         this.newsList = this.newsList.concat(data.news);
      //       } else if (this.newsList.length === 0) {
      //         this.errorMessage = "Sorry, there are no results.";
      //       }
      //       if (infiniteScroll != null) infiniteScroll.complete();
      //     },
      //     error => {
      //       this.isInternet = true;
      //       if (infiniteScroll != null) infiniteScroll.complete();
      //     }
      //   );
    } else {
      this.isInternet = true;
      if (infiniteScroll != null) infiniteScroll.complete();
    }
  }

  setSearchBar() {
    this.isSearchBar = !this.isSearchBar;
  }

  onSearch(event) {
    this.renderer.invokeElementMethod(event.target, 'blur');
    this.keyboard.close();
    this.activeTab = this.app.category[0].title;
    this.newsList = [];
    this.query = '&search=' + event.target.value;
    this.loadNewsList();
  }

  changeTab(newTab) {
    this.isSearchBar = false;
    this.query = newTab;
    this.activeTab = newTab;
    this.loadNewsList(null, true);
  }

  goItemPage(id) {
    this.navCtrl.push(NewsPage, { newsId: parseInt(id) });
  }

  closeSearchBar() {
    this.isSearchBar = false;
    this.newsList = [];
    this.query = '';
    this.loadNewsList();
  }

  getScrollPosition() {
    if (this.content.scrollTop != null && this.content.scrollTop > 200) {
      if (this.showFloat === false) {
        this.showFloat = true;
        this.zone.run(() => {});
      }
    } else if (this.showFloat) {
      this.showFloat = false;
      this.zone.run(() => {});
    }
  }

  scrollToTop() {
    if (this.showFloat) {
      this.showFloat = false;
      const wait = this.content.isScrolling ? 150 : 0;
      setTimeout(() => this.content.scrollToTop(500), wait);
    }
  }

  checkInternet() {
    if (this.app.category.length == 0) this.loadCategoryList();
    else this.loadNewsList();
  }

  goSettings() {
    this.navCtrl.push('SettingsPage');
  }

  goSavedNews() {
    this.navCtrl.push('SavednewsPage');
  }
}
