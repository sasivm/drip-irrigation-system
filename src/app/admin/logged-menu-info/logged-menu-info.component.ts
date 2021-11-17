import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-menu-info',
  templateUrl: './logged-menu-info.component.html',
  styleUrls: ['./logged-menu-info.component.scss']
})
export class LoggedMenuInfoComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService, private route: ActivatedRoute) { }

  adminName: string = '';

  ngOnInit() {
    const [{ firstName }] = this._authService.getAdminFromSession();
    this.adminName = firstName;
  }

  selectedItem(action: string) {
    let selectedScreen = 'admin/account';

    if (action === 'view') {
      selectedScreen = 'admin/view';
    }

    if (action !== 'logout') {
      this.router.navigate([selectedScreen], { relativeTo: this.route });
    } else if (action === 'logout') {
      this.logoutUser();
    }
  }

  logoutUser() {
    this._authService.__removeUserFromSession();
    const logOutQueryParams: NavigationExtras = { queryParams: { loggedOut: true } };
    this.router.navigate(['login'], logOutQueryParams);
  }

}
