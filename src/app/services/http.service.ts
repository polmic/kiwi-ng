import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getThumbnail(plantName: string) {
    let url = `https://pixabay.com/api/`;
    const params = {
      q: plantName,
      lang: 'fr',
      category: 'nature',
      image_type: 'photo',
      per_page: 3,
      pretty: true
    };
    url = url + "?key=14625960-186859b5b791695ac2c68752d";
    Object.keys(params).forEach(key => url += "&" + key + "=" + params[key]);
    return this.http.get(url);
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
