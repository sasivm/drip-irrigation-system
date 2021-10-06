import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../common/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustServiceService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getCustomerData(applicantId: string): Observable<CustomerResponse> {
    const customerIdSearch = this.REST_API_SERVER + '/customer/' + applicantId;
    return this._http.get<CustomerResponse>(customerIdSearch);
  }

  updateCustomer(custRecord: any): Observable<CustomerResponse> {
    const customerUpdate: string = this.REST_API_SERVER + '/customer';
    return this._http.post<CustomerResponse>(customerUpdate, custRecord);
  }

  getCustomerRecordFromSession() {
    const custRecord: string | null = sessionStorage.getItem('cust-rec');
    return custRecord;
  }

  getLoadedCustomerRecord(): any[] {
    const custRecord = JSON.parse(sessionStorage.getItem('cust-rec') || '');
    return [custRecord] || [];
  }

}
