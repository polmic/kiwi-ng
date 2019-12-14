import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpClient) {
  }

  search(searchText: string) {
    let url = `http://localhost:8080/api/search?q=${searchText}`;
    console.log(url);
    return this.http.get(url);
  }

}
