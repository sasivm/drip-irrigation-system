import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { RouterConstants } from './common/router-constants';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private _authService: AuthService, private router: Router) { }
  canActivateChild(): boolean {
    if (this._authService.isAdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate([RouterConstants.EMPTY_REDIRECT_PATH]);
      return false;
    }
  }

}
