import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { OptionList, TableErrorMessage } from 'src/app/common/models/common-types';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  adminSearch: FormGroup = this.fb.group({
    adminId: [''],
    firstName: [''],
    adminRole: ['admin3']
  });

  adminRoleList: OptionList[] = GlobalConstants.ADMIN_ROLELIST;

  loadProgresser: boolean = false;

  adminDataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['view', 'action', 'adminId', 'firstName', 'adminRole', 'email', 'delete'];


  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  ngOnInit() {
    this.adminDataSource.data = [
      { adminId: 34, firstName: 'sasi', adminRole: 'admin3', email: 'saikumar@gmail.com' },
      { adminId: 45, firstName: 'Ajith', adminRole: 'admin3', email: 'ravikaran@gmail.com' },
      { adminId: 78, firstName: 'Kumar', adminRole: 'admin3', email: 'mohanraj@gmail.com' }
    ];
  }

  searchAdmins() {

  }

  viewAdminRec(adminId: string) {

  }

  resetForm() {
    this.adminSearch.get('adminId')?.reset('');
    this.adminSearch.get('firstName')?.reset('');
    this.adminSearch.get('adminRole')?.reset('');
  }

}
