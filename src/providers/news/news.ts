import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
  }

  getCategories() {
    let uri = `http://rb.delhinerds.com`;
    return this.http.get(uri, { responseType: 'text' });
  }

  formatResponse(response, debug: boolean = false) {
    let responseInJson = [], k = 0;
    let parser = new DOMParser();
    let oDOM = parser.parseFromString(response, "application/xml");
    let nodes = oDOM.firstChild.childNodes;

    if (debug) {
      console.log(nodes);
    }

    for (let i = 0; i < nodes.length; i++) {
      if (i % 2 !== 0) {
        responseInJson[k] = {};
        for (let j = 0; j < nodes[i].attributes.length; j++) {
          responseInJson[k][nodes[i].attributes[j].localName] = nodes[i].attributes[j].textContent;
        }
        k = k + 1;
      }
    } 
    return responseInJson;
  } 

  getCategoryDetail(id) {
    let uri = 'http://rb.delhinerds.com/category/' + id;
    return this.http.get(uri, { responseType: 'text' });
  }

  getNewsById(id) {
    let uri = 'http://rb.delhinerds.com/news/' + id;
    return this.http.get(uri, { responseType: 'text' });
  }

}
