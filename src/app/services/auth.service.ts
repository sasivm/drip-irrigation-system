import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAdminLoggedIn(): boolean {
    const isLogged: boolean = !!(sessionStorage.getItem('auth-token'));
    const isAdminRecExist: boolean = !!(sessionStorage.getItem('admin-rec'))
    return isLogged && isAdminRecExist;
  }

  getAdminFromSession(): any[] {
    const adminRec: string | null = sessionStorage.getItem('admin-rec');
    if (!adminRec) return [];

    const adminProfile = JSON.parse(adminRec);
    if ((adminProfile.length === 1) && adminProfile[0]._id) {
      return adminProfile;
    }

    return [];
  }

  storeAdminOnSession(adminRec: any[]) {
    if (adminRec.length === 1 && adminRec[0]._id) {
      const adminRecStr: string = JSON.stringify(adminRec);
      sessionStorage.setItem('admin-rec', adminRecStr);
    }
  }

  storeAuthTokenOnSession(token: string) {
    if (token && token.length > 5) {
      sessionStorage.setItem('auth-token', token);
    }
  }

  getAuthTokenOnSession() {
    return sessionStorage.getItem('auth-token');
  }

  /**
    Removes all the sessionStorage related to admin detils in current session 
  */
  __removeUserFromSession(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('admin-rec');
    sessionStorage.setItem('log-out', 'true');
  }
}
