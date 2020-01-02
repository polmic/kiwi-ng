import { Component, OnInit } from '@angular/core';
import { Subject } from "../../../../../kiwi-ns/node_modules/rxjs";
import { debounceTime, distinctUntilChanged } from "../../../../../kiwi-ns/node_modules/rxjs/internal/operators";

import {HttpService} from "../../services/http.service";
import {SearchService} from "../../services/search/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public consoleMessages: string[] = [];
  public searchText: string;
  searchTextUpdate = new Subject<string>();
  results: Array = [];

  constructor(private _searchService: SearchService, private _http: HttpService) {
    this.searchTextUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this._searchService.search(value).subscribe((data: any) => {
          this.results = [];
          for (let [key, value] of Object.entries(data.response)) {
            this.results.push(value);
            this._getThumbnail(value);
          }
        });
      });
  }

  _getThumbnail(result) {
    this._http.getThumbnail(result.commonName).subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
