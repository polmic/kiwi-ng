import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit {

  pages: Object[];
  intervalId: number;
  isRandomMode: boolean = true;
  category: string = '';

  progressbarIntervalId: number;
  progressbarValue: number = 100;

  refreshTimeSec: number = 15;
  timeLeft: number = 0;

  constructor(private _http: HttpService) {
  }

  ngOnInit() {
    const getWiki = () => this._http.getWiki(this.isRandomMode, this.category).subscribe((data: any) => {
      this.pages = [];
      for (let [key, value] of Object.entries(data.query.pages)) {
        this.pages.push(value);
      }
      if (!this.intervalId) {
        this.intervalId = setInterval(() => getWiki(), this.refreshTimeSec * 1000);
      }
    });

    getWiki();
    this._startProgressBar();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearInterval(this.progressbarIntervalId);
  }

  openLink(pageid: number) {
    const url: string = 'http://en.wikipedia.org/?curid=' + pageid;
    window.open(url, "_blank");
  }

  changeMode(mode: string) {
    this.isRandomMode = mode === 'random';
  }

  _startProgressBar() {
    this.progressbarIntervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = this.refreshTimeSec - 1;
      }
      this.progressbarValue = this.timeLeft * 100 / this.refreshTimeSec;
    },1000)
  }

  _restartProgressBar() {
    clearInterval(this.progressbarIntervalId);
    this._startProgressBar()
  }

}
