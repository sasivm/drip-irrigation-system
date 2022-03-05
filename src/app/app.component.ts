import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { RouterConstants } from './common/router-constants';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drip-irrigation-system';

  loadingRouteConfig: boolean = false;

  constructor(private router: Router, private _auth: AuthService, private _adminService: AdminService) {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }

  ngOnInit(): void {
    if (this._auth.getAuthTokenOnSession()?.trim()) {
      this.validateLoggedAdminToken();
    }
  }

  validateLoggedAdminToken() {
    this._adminService.validateAuthToken().subscribe(res => {
      if (!res.isSuccess) {
        this.invalidTokenRemoveUser();
      }
    }, error => {
      this.invalidTokenRemoveUser();
    });
  }

  invalidTokenRemoveUser() {
    this._auth.__removeUserFromSession();
    this.router.navigate([RouterConstants.LOGIN]);
  }

}
