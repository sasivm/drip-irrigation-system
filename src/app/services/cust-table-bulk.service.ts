import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustTableBulkService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getSrever() {
    return this._http.get(this.REST_API_SERVER + '/demo')
  }

  sendBulkCustData(payload: any[]) {
    const bulk_api = `${this.REST_API_SERVER}/bulkRegister`;
    return this._http.post(bulk_api, payload);
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
