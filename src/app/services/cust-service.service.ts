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

  getCustomerData(applicationId: string): Observable<CustomerResponse> {
    const customerIdSearch = this.REST_API_SERVER + '/customer/' + applicationId;
    return this._http.get<CustomerResponse>(customerIdSearch);
  }

  updateCustomer(custRecord: any): Observable<CustomerResponse> {
    const custUpdateEndPoint: string = this.REST_API_SERVER + '/customer';
    return this._http.post<CustomerResponse>(custUpdateEndPoint, custRecord);
  }

  updateMILandRecord(miLandRecord: any): Observable<CustomerResponse> {
    const miUpdateEndPoint: string = this.REST_API_SERVER + '/customer/updateMILand';
    return this._http.post<CustomerResponse>(miUpdateEndPoint, miLandRecord);
  }

  deleteCustomerRecord(applicationId: string) {
    const deleteEndPoint: string = this.REST_API_SERVER + `/customer/delete/${applicationId}`;
    return this._http.delete<CustomerResponse>(deleteEndPoint);
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

  getLoadedCustomerRecord(): any[] {
    const custRecStr: string | null = sessionStorage.getItem('cust-rec');
    if (!custRecStr) return [];

    const custRecord = JSON.parse(custRecStr);
    if (!custRecord || custRecord.length !== 1) return [];

    return custRecord;
  }

  setCustomerRecordOnSession(custRecord: any[]) {
    if (custRecord.length === 1 && custRecord[0].applicationId) {
      const custRecStr: string = JSON.stringify(custRecord);
      sessionStorage.setItem('cust-rec', custRecStr);
    }
  }

}
