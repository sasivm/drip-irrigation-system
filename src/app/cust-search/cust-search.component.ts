import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../common/app.global-constant';
import { CommonList, OptionList, TableErrorMessage } from '../common/models/common-types';
import { CustServiceService } from '../services/cust-service.service';

@Component({
  selector: 'app-cust-search',
  templateUrl: './cust-search.component.html',
  styleUrls: ['./cust-search.component.scss']
})
export class CustSearchComponent {

  constructor(private fb: FormBuilder, private _custService: CustServiceService) { }

  customerSearch: FormGroup = this.fb.group({
    applicationId: [''],
    farmerName: [''],
    farmerType: [''],
    registeredBy: [''],
    department: [''],
    block: [''],
    village: ['']
  });

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();

  formerTypeList: OptionList[] = GlobalConstants.APPLICATION_FormerTypeList;

  registeredByList: OptionList[] = GlobalConstants.APPLICATION_RegisteredByList;

  departmentList: OptionList[] = GlobalConstants.APPLICATION_DepartmentList;

  displayedColumns: string[] = ['applicationId', 'farmerName', 'farmerType', 'department']; // 'registeredBy', 'village', 'block', 'landOwnSon'

  searchCustomers() {
    const searchRequest: any = this.customerSearch.value;
    console.log(searchRequest);
    this._custService.searchCustomersDetails(searchRequest).subscribe((response: any[]) => {
      console.log('Res came', response);
    }, err => {
      console.log('error ', err.message);
    });
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
