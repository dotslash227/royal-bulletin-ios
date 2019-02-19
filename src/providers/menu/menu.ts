import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {
  catId;

  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor(public http: HttpClient) {
    console.log('Hello MenuProvider Provider');
  }

  goToCategoryId(id) {
    this.catId = id;
    this.change.emit(this.catId);
  }
}
