import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-kiwi';

  constructor() {
  }

  ngOnInit() {
    const navIcon = document.querySelector(".nav-icon");
    const nav = document.querySelector("nav");
    navIcon.onclick = function () {
      nav.classList.toggle('show');
    }
  }

}
