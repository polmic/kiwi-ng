import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getWiki(isRandomMode: boolean, category: string) {
    let url = "https://en.wikipedia.org/w/api.php";
    const params = {
      action: "query",
      format: "json",
      redirects: 1
    };
    const otherParams: Object = this._addParams(isRandomMode, category);
    url = url + "?origin=*";
    Object.keys(params).forEach(key => url += "&" + key + "=" + params[key]);
    Object.keys(otherParams).forEach(key => url += "&" + key + "=" + otherParams[key]);
    console.log(otherParams);
    console.log(url);
    return this.http.get(url);
  }

  _addParams(isRandomMode: boolean, category: string) {
    if (isRandomMode) {
      return {
        generator: 'random',
        grnlimit: 3,
        grnnamespace: 0,
        prop: 'extracts&exintro&explaintext',
      }
    } else {
      return {
        prop: "categories",
        titles: category
      }
    }
  }

}
