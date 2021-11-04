import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-menu-info',
  templateUrl: './logged-menu-info.component.html',
  styleUrls: ['./logged-menu-info.component.scss']
})
export class LoggedMenuInfoComponent {

  constructor(private router: Router) { }

  selectedItem(action: string) {
    let selectedScreen = '';
    if (action === 'view') {
      selectedScreen = 'admin/view';
    }
    this.router.navigate([selectedScreen]);
  }

}
