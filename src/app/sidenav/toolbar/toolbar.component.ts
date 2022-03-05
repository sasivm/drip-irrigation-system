import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() navbarRef: any = null;

  app_title: string = 'Drip Irrigation System | BHARATHI DRIPS';

  app_theme: string = 'light';
  app_theme_desc: string = 'Switch to dark mode';

  constructor() { }

  ngOnInit() {
    const ENVIRONMENT_NAME = environment?.envName;
    if (ENVIRONMENT_NAME !== 'prod') {
      this.app_title += `  (${ENVIRONMENT_NAME})`;
    }
  }

  changeAppTheme() {
    try {
      const body = document.getElementsByTagName('body')[0];
      if (body) {
        if (this.app_theme === 'light') {
          body.style.filter = 'invert(1)';
          this.app_theme_desc = `Switch to ${this.app_theme} mode`;
          this.app_theme = 'dark';
        } else {
          body.style.filter = 'none';
          this.app_theme_desc = `Switch to ${this.app_theme} mode`;
          this.app_theme = 'light';
        }
      }
    } catch (error) {
      console.log('error occured while chnaging body style');
      console.log('error ', error);
    }
  }
}
