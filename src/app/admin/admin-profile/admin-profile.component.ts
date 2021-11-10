import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { OptionList, TableErrorMessage } from 'src/app/common/models/common-types';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminServ: AdminService, private _authService: AuthService) { }

  imageURL: string = 'assets/images/avatar_profile.jpg';

  adminProfileForm: FormGroup = this.fb.group({
    adminId: [''],
    mail: [''],
    firstName: [''],
    lastName: [''],
    role: [''],
    password: [''],
    conPassword: ['']
  });

  admin_profile: any = {};

  pswdBtnDesc: string = 'Change password';
  showSaveCancelBtn: boolean = false;

  isSubAdminLogged: boolean = true; // true - default
  isNewRequest: boolean = false; // false
  adminRec: any[] = [];

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };
  modelMessage: string = '';

  adminRoleList: OptionList[] = GlobalConstants.ADMIN_ROLELIST;
  showPswModal: boolean = false;

  UPDATE_ENABLE_FIELDS = ['mail', 'firstName', 'lastName', 'role'];

  ngOnInit() {
    this.disableForm();
    this.loadAdminProfile();
    this.checkLoggedAdminRole();

    if (!this.isSubAdminLogged) {
      
    }
  }

  validatePassword() {
    this.modelMessage = '';
    const { password, conPassword } = this.adminProfileForm.value;

    if (!(password && conPassword)) {
      this.modelMessage = 'Enter password and confirm password';
    }
    else if (password !== conPassword) {
      this.modelMessage = 'Password and Confirm password are not match';
    }
    else if (password?.length < 6) {
      this.modelMessage = 'Enter valid password';
    }
    else {
      this.showPswModal = false;
    }
  }

  saveNewAdminProfile() {
    this.clearMessageBanner();
    const adminProfile = this.adminProfileForm.value;
    delete adminProfile['conPassword'];
    console.log('admin profile', adminProfile);

    this._adminServ.registerNewAdmin(adminProfile).subscribe(respose => {
      console.log('respose ', respose);
      if (respose.isSuccess) {
        this.sucessMessage = respose.message;
        if (respose.adminRec?.length === 1) {
          this.adminRec = respose.adminRec;
          this.loadSavedAdminData();
        }
      } else {
        this.errorMessage.message = respose.message;
      }
    }, err => {
      console.log('ad error ', err);
      this.errorMessage.message = err.error.message;
    });
  }

  updateAdminProfile() {
    this.enableUpdateForm();
    this.showSaveCancelBtn = true;

    // const isValidUpdate = this.validateAdminUpdateForm();
    // if (isValidUpdate) {

    // }
  }

  enableUpdateForm() {
    this.UPDATE_ENABLE_FIELDS.forEach(fieldName => {
      this.adminProfileForm.get(fieldName)?.enable();
    });
  }

  cancelUpdateForm() {
    this.loadSavedAdminData();
    this.showSaveCancelBtn = false;
  }

  resetForm() {
    this.UPDATE_ENABLE_FIELDS.forEach(fieldName => {
      this.adminProfileForm.get(fieldName)?.setValue('');
    });
  }

  validateAdminUpdateForm() {
    this.errorMessage.message = '';
    const { mail, firstName, role } = this.adminProfileForm.value;

    if (!(mail && mail?.length > 5)) {
      this.errorMessage.message = 'Enter valid Email';
    } else if (!(firstName && firstName.length > 2)) {
      this.errorMessage.message = 'Enter valid First Name';
    } else if (!role) {
      this.errorMessage.message = 'Enter valid First Name';
    } else {
      return true;
    }

    return false;
  }

  loadAdminProfile() {
    const adminProfile = this._authService.getAdminFromSession();
    if (adminProfile.length === 1) {
      this.adminRec = adminProfile;
      this.loadSavedAdminData();
    }
  }

  private get subAdminRoles(): String[] {
    const rolseOfSubAdmins = ['admin2', 'admin3'];
    return rolseOfSubAdmins;
  }

  checkLoggedAdminRole() {
    const [{ role: adminRole }] = this._authService.getAdminFromSession();

    if (adminRole && this.subAdminRoles.includes(adminRole)) {
      this.isSubAdminLogged = true; // default true
      console.log('current admin role', adminRole);
    } else {
      this.isSubAdminLogged = false; // this is correct but add one more check to find super admin
    }
  }

  loadSavedAdminData() {
    try {
      const profile = this.adminRec[0];
      if (!(profile?.adminId)) {
        profile.adminId = profile?._id;
      }
      // reset and deleting unused data
      profile.password = '';
      profile.conPassword = '';
      delete profile.__v;
      delete profile._id;

      this.adminProfileForm.setValue(profile);
    } catch (error) {
      this.errorMessage.message = 'Some data missed from admin profile while loading on Form';
      console.log('error info', error)
    } finally {
      this.adminProfileForm.disable();
      Object.assign(this.admin_profile, this.adminRec[0]);
    }
  }

  clearMessageBanner() {
    /* Message variables */
    this.sucessMessage = '';
    this.errorMessage = { message: '', desc: '' };
  }

  openPasswordModal() {
    if (this.pswdBtnDesc === 'Set Password') {
      this.adminProfileForm.get('password')?.enable();
      this.adminProfileForm.get('conPassword')?.enable();
      this.showPswModal = true;
      setTimeout(() => document.getElementById('password')?.focus(), 10);
    }
  }

  enableFields() {
    this.adminProfileForm.get('firstName')?.enable();
    this.adminProfileForm.get('lastName')?.enable();
    this.adminProfileForm.get('mail')?.enable();

    if (this.isNewRequest) {
      this.adminProfileForm.get('role')?.enable();
      this.adminProfileForm.get('role')?.setValue('admin3');
      this.pswdBtnDesc = 'Set Password';
    }
  }

  disableForm() {
    this.adminProfileForm.disable();
  }

}
