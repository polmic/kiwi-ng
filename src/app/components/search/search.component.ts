import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../services/search/search.service";
import {Subject} from "../../../../../kiwi-ns/node_modules/rxjs";
import {debounceTime, distinctUntilChanged} from "../../../../../kiwi-ns/node_modules/rxjs/internal/operators";
import {subscribe} from "../../../../../kiwi-ns/node_modules/kinvey-js-sdk/lib/live";
import {element} from "protractor";

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

  constructor(private _searchService: SearchService) {
    this.searchTextUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this._searchService.search(value).subscribe((data: any) => {
          this.results = [];
          for (let [key, value] of Object.entries(data.response)) {
            this.results.push(value);
          }
        });
      });
  }

  ngOnInit() {
  }

}
