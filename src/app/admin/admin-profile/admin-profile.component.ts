import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { OptionList } from 'src/app/common/models/common-types';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  imageURL: string = 'assets/images/avatar_profile.jpg';

  adminProfile: FormGroup = this.fb.group({
    adminId: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    role: ['']
  });

  user_profile: any = {
    firstName: 'Edogaru',
    lastName: 'V M',
    email: 'edogaru@mail.com.my',
    role: 'subAdmin'
  };

  pswdBtnDesc: string = 'Change password';

  isSubAdminLogged: boolean = true; // true - default
  isNewRequest: boolean = true; // false

  adminRoleList: OptionList[] = GlobalConstants.ADMIN_ROLELIST;

  ngOnInit() {
    this.disableForm();
    this.isSubAdminLogged = (this.user_profile.role === '!subAdmin');
    if (!this.isSubAdminLogged) {
      this.enableFields();
    }
  }

  enableFields() {
    this.adminProfile.get('firstName')?.enable();
    this.adminProfile.get('lastName')?.enable();
    this.adminProfile.get('email')?.enable();
    
    if (this.isNewRequest) {
      this.adminProfile.get('role')?.enable();
      this.adminProfile.get('role')?.setValue('admin3');
      this.pswdBtnDesc = 'Set Password';
    }
  }

  disableForm() {
    this.adminProfile.disable();
  }

}
