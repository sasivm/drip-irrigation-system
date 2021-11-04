import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drip-irrigation-system';

  isUserLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    const userProfile = JSON.parse(sessionStorage.getItem('user-profile') || 'null');
    this.isUserLoggedIn = !(userProfile);
  }

  checkUserState(isLogged: boolean) {
    this.isUserLoggedIn = isLogged;
  }

}
