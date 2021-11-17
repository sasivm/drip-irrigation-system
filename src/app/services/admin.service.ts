import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/app.global-constant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly REST_API_SERVER = GlobalConstants.BASE_API_URL;

  constructor(private _http: HttpClient) { }

  validateAdminLogin(request: any): Observable<any> {
    const adminLogin = this.REST_API_SERVER + '/auth/login';
    return this._http.post(adminLogin, request);
  }

  registerNewAdmin(request: any): Observable<any> {
    const adminRegister = this.REST_API_SERVER + '/auth/registration';
    return this._http.post(adminRegister, request);
  }

  updateAdminDetails(request: any): Observable<any> {
    const adminUpdateAPI = this.REST_API_SERVER + '/admin/update';
    return this._http.post(adminUpdateAPI, request);
  }
}
