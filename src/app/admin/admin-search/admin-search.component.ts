import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { OptionList, TableErrorMessage } from 'src/app/common/models/common-types';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent {

  constructor(private fb: FormBuilder, private _adminServ: AdminService) { }

  adminSearch: FormGroup = this.fb.group({
    _id: [''],
    firstName: [''],
    adminRole: ['admin'],
    email: ['']
  });

  adminRoleList: OptionList[] = GlobalConstants.ADMIN_ROLELIST;

  loadProgresser: boolean = false;

  adminDataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'email', 'delete'];


  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  searchAdmins() {
    this.sucessMessage = '';
    this.errorMessage = {message: '', desc: ''};

    const isFormValid = this.validateAdminSearch();
    if (!isFormValid) {
      this.errorMessage.message = 'Enter valid value on any field';
      return;
    }

    const searchRequest = this.adminSearch.value;
    delete searchRequest.adminRole;

    this._adminServ.searchCustomersDetails(searchRequest).subscribe(response => {
      if (response && response.adminRec && response.adminRec.length > 0) {
        this.adminDataSource.data = response.adminRec;
      } else {
        this.errorMessage.message = 'No record found';
      }
    }, err => {
      if (err.name === 'HttpErrorResponse') {
        this.errorMessage.message = err.message;
        this.errorMessage.desc = err.statusText;
      } else {
        this.errorMessage.message = err.message;
      }
    });
  }

  validateAdminSearch() {
    const searchForm = this.adminSearch.value;
    if (searchForm._id || searchForm.firstName || searchForm.email) {
      return true;
    }
    return false;
  }

  viewAdminRec(adminId: string) {

  }

  resetForm() {
    this.sucessMessage = '';
    this.errorMessage = {message: '', desc: ''};

    this.adminSearch.get('_id')?.reset('');
    this.adminSearch.get('firstName')?.reset('');
    this.adminSearch.get('adminRole')?.reset('');
    this.adminSearch.get('email')?.reset('');
  }
  

}
