import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from '../common/app.global-constant';
import { OptionList, TableErrorMessage } from '../common/models/common-types';
import { CustomerResponse } from '../common/models/customer';
import { CustServiceService } from '../services/cust-service.service';

@Component({
  selector: 'app-cust-search',
  templateUrl: './cust-search.component.html',
  styleUrls: ['./cust-search.component.scss']
})
export class CustSearchComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _custService: CustServiceService) { }

  customerSearch: FormGroup = this.fb.group({
    applicationId: [''],
    farmerName: [''],
    farmerType: [''],
    fatherName: [''],
    department: ['Agriculture'],
    block: [''],
    village: ['']
  });

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  formerTypeList: OptionList[] = GlobalConstants.APPLICATION_FormerTypeList;

  departmentList: OptionList[] = GlobalConstants.APPLICATION_DepartmentList;

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['view', 'action', 'applicationId', 'farmerName', 'farmerType', 'department']; // 'registeredBy', 'village', 'block', 'landOwnSon'

  loadProgresser: boolean = false;

  ngOnInit() {
    this.searchCustomers();
  }
  ngAfterViewInit() {
    this.custDataSource.paginator = this.paginator;
  }

  searchCustomers() {
    this.clearMessageBanner();
    const searchRequest: any = this.customerSearch.value;
    console.log(searchRequest);

    this.loadProgresser = true;
    this._custService.searchCustomersDetails(searchRequest).subscribe((response: CustomerResponse) => {
      console.log('Res came', response);
      if (response.isSuccess) {
        const customerRecords: any[] = response.custRec;
        if (customerRecords.length > 0) {
          this.sucessMessage = response.message;
          this.custDataSource.data = customerRecords;
        } else {
          this.errorMessage.message = 'No record found';
          this.custDataSource.data = [];
        }
      } else {
        this.errorMessage.message = response.message;
        this.custDataSource.data = [];
      }
      this.loadProgresser = false;
    }, err => {
      this.loadProgresser = false;
      console.log('error ', err); // For error message
      if (err.name === 'HttpErrorResponse') {
        this.errorMessage.message = err.message;
        this.errorMessage.desc = err.statusText;
      } else {
        this.errorMessage.message = err.message;
      }
      this.loadProgresser = false;
      this.custDataSource.data = [];
    });
  }

  viewCustRecReq(custRecord: any) {
    this._custService.setCustomerRecordOnSession([custRecord]);
    this.router.navigate(['/drips/docs']);
  }

  saveCustRecReq(applicationId: string) {
    const isSaved: boolean = this.setCustomerReqInStorage(applicationId);
    if (isSaved) {
      this.router.navigate(['../register'], { relativeTo: this.route });
    }
  }

  setCustomerReqInStorage(applicationId: string) {
    const isReqSaved: boolean = this._custService.setCustomerReqOnSession(applicationId);
    return isReqSaved;
  }

  clearMessageBanner() {
    this.sucessMessage = '';
    this.errorMessage = { message: '', desc: '' };
  }

  resetForm() {
    this.customerSearch.get('applicationId')?.reset('');
    this.customerSearch.get('farmerName')?.reset('');
    this.customerSearch.get('farmerType')?.reset('');
    this.customerSearch.get('fatherName')?.reset('');
    this.customerSearch.get('department')?.reset('');
    this.customerSearch.get('block')?.reset('');
    this.customerSearch.get('village')?.reset('');
  }
}
