import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/app.global-constant';
import { CommonList, OptionList, TableErrorMessage } from '../common/models/common-types';
import { CustomerResponse } from '../common/models/customer';
import { CustServiceService } from '../services/cust-service.service';

@Component({
  selector: 'app-cust-search',
  templateUrl: './cust-search.component.html',
  styleUrls: ['./cust-search.component.scss']
})
export class CustSearchComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: any;

  constructor(private fb: FormBuilder, private router: Router, private _custService: CustServiceService) { }

  customerSearch: FormGroup = this.fb.group({
    applicationId: [''],
    farmerName: [''],
    farmerType: [''],
    registeredBy: [''],
    department: [''],
    block: [''],
    village: ['Thottampatti']
  });

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  formerTypeList: OptionList[] = GlobalConstants.APPLICATION_FormerTypeList;

  registeredByList: OptionList[] = GlobalConstants.APPLICATION_RegisteredByList;

  departmentList: OptionList[] = GlobalConstants.APPLICATION_DepartmentList;

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['action', 'applicationId', 'farmerName', 'farmerType', 'department']; // 'registeredBy', 'village', 'block', 'landOwnSon'

  ngAfterViewInit() {
    this.custDataSource.paginator = this.paginator;
  }

  searchCustomers() {
    this.clearMessageBanner();
    const searchRequest: any = this.customerSearch.value;
    console.log(searchRequest);
    this._custService.searchCustomersDetails(searchRequest).subscribe((response: CustomerResponse) => {
      console.log('Res came', response);
      if (response.isSuccess) {
        const customerRecords: any[] = response.custRec;
        if (customerRecords.length > 0) {
          this.sucessMessage = 'Customer record(s) found';
          this.custDataSource.data = customerRecords;
        } else {
          this.errorMessage.message = 'No record found';
        }
      } else {
        this.errorMessage.message = response.message;
      }
    }, err => {
      console.log('error ', err.error); // For error message
      this.errorMessage.message = err.error;
    });
  }

  saveCustRecReq(applicationId: string) {
    const isReqSaved: boolean = this._custService.setCustomerReqOnSession(applicationId);
    if (isReqSaved) {
      this.router.navigate(['/register']);
    }
  }

  clearMessageBanner() {
    this.sucessMessage = '';
    this.errorMessage = { message: '', desc: '' };
  }

  resetForm() {
    this.customerSearch.get('applicationId')?.reset('');
    this.customerSearch.get('farmerName')?.reset('');
    this.customerSearch.get('farmerType')?.reset('');
    this.customerSearch.get('registeredBy')?.reset('');
    this.customerSearch.get('department')?.reset('');
    this.customerSearch.get('block')?.reset('');
    this.customerSearch.get('village')?.reset('');
  }
}
