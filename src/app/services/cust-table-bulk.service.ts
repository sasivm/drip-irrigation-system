import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from '../common/app.global-constant';
import { BulkCustomerResponse } from '../common/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustTableBulkService {

  private REST_API_SERVER = GlobalConstants.BASE_API_URL;

  constructor(private _http: HttpClient) { }

  sendBulkCustData(payload: any[]): Observable<BulkCustomerResponse> {
    const bulk_api = `${this.REST_API_SERVER}/bulkRegister`;
    return this._http.post<BulkCustomerResponse>(bulk_api, payload);
  }

  handleError(error: HttpErrorResponse) {
    const errorObj: any = {
      status: 0,
      message: 'Unknown error!'
    };
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      console.log('Client-side errors');

      // errorObj.status = error.status;
      errorObj.message = error;
    } else {
      // Server-side errors
      console.log('Server-side errors');
      errorObj.status = error.status;
      errorObj.message = error.message;
    }

    return throwError(errorObj);
  }

}
