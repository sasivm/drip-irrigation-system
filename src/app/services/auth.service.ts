import { Injectable } from '@angular/core';
import { StorageConstants } from '../common/StorageConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAdminLoggedIn(): boolean {
    const isLogged: boolean = !!(sessionStorage.getItem(StorageConstants.AUTH_TOKEN));
    const isAdminRecExist: boolean = !!(sessionStorage.getItem(StorageConstants.ADMIN_RECORD))
    return isLogged && isAdminRecExist;
  }

  getAdminFromSession(): any[] {
    const adminRec: string | null = sessionStorage.getItem(StorageConstants.ADMIN_RECORD);
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
      sessionStorage.setItem(StorageConstants.ADMIN_RECORD, adminRecStr);
    }
  }

  storeAuthTokenOnSession(token: string) {
    if (token && token.length > 5) {
      sessionStorage.setItem(StorageConstants.AUTH_TOKEN, token);
    }
  }

  getAuthTokenOnSession() {
    return sessionStorage.getItem(StorageConstants.AUTH_TOKEN);
  }

  /**
    Removes all the sessionStorage related to admin detils in current session 
  */
  __removeUserFromSession(): void {
    sessionStorage.removeItem(StorageConstants.AUTH_TOKEN);
    sessionStorage.removeItem(StorageConstants.ADMIN_RECORD);
    sessionStorage.setItem(StorageConstants.LOGOUT, 'true');
  }
}
