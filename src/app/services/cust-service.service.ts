import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/app.global-constant';
import { CustomerResponse } from '../common/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustServiceService {

  private REST_API_SERVER = GlobalConstants.BASE_API_URL;

  constructor(private _http: HttpClient) { }

  getCustomerData(applicantId: string): Observable<CustomerResponse> {
    const customerIdSearch = this.REST_API_SERVER + '/customer/' + applicantId;
    return this._http.get<CustomerResponse>(customerIdSearch);
  }

  updateCustomer(custRecord: any): Observable<CustomerResponse> {
    const customerUpdate: string = this.REST_API_SERVER + '/customer';
    return this._http.post<CustomerResponse>(customerUpdate, custRecord);
  }

  searchCustomersDetails(customerQuery: any): Observable<CustomerResponse> {
    const customerSearch: string = this.REST_API_SERVER + '/SearchCustomers';
    return this._http.post<CustomerResponse>(customerSearch, customerQuery);
  }

  setCustomerReqOnSession(applicationId: string) {
    if (applicationId) {
      const userReqString: string = JSON.stringify({ 'applicationId': applicationId });
      sessionStorage.setItem('user-req', userReqString);
      return true;
    }
    return false;
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
