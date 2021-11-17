import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private fb: FormBuilder, private _adminServ: AdminService,
    private _authService: AuthService, private route: ActivatedRoute) { }

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

  // constants details variables
  private readonly NEW_REG_PARAM_NAME: string = 'new';
  readonly PASSWORD_DESCRIPTION = GlobalConstants.PROFILE_PASSWORD_DESCRIPTION;

  readonly adminRoleList: OptionList[] = GlobalConstants.ADMIN_ROLELIST;
  private readonly UPDATE_ENABLE_FIELDS = ['mail', 'firstName', 'lastName', 'role'];
  private readonly subAdminRoles: String[] = ['admin2', 'admin3'];

  // Logged admin info
  isSubAdminLogged: boolean = true; // true - default
  adminRec: any[] = [];

  // page info
  isNewRegRequest: boolean = false; // false
  isRecordUpdation: boolean = false; // the state of form (new or updaing record)

  admin_profile: any = {};
  showSaveCancelBtn: boolean = false;

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };
  modelMessage: string = '';
  showPswModal: boolean = false;

  ngOnInit() {
    this.disableForm();
    this.checkLoggedAdminRole();

    this.checkForNewReg(); // works only if it is syncourounus code
  }

  newRegFormScreen() {
    this.isRecordUpdation = false;
    this.isNewRegRequest = true;
    this.adminRec = [];
    this.admin_profile = {};
    // this.enableNewRegFields();
  }

  checkForNewReg() {
    this.route.queryParamMap.subscribe(paramMap => {
      this.regResetFullForm();
      this.clearMessageBanner();

      const isNewReg = paramMap.get(this.NEW_REG_PARAM_NAME);

      if (isNewReg === 'true') {
        this.newRegFormScreen();
      } else {
        this.loadAdminProfile();
      }
    });
  }

  submitPasswordModel() {
    this.modelMessage = '';

    const isValidPassword = this.validatePassword();
    if (isValidPassword) {
      this.showPswModal = false;
    }
  }

  validatePassword() {
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
      return true;
    }

    return false;
  }

  newAdminRegesitation() {
    this.clearMessageBanner();
    this.enableUpdateForm();
    this.enableNewRegFields();
    this.showSaveCancelBtn = true;
  }

  saveNewAdminProfile() {
    const adminProfile = this.adminProfileForm.value;
    delete adminProfile['conPassword'];
    console.log('admin profile', adminProfile);

    this._adminServ.registerNewAdmin(adminProfile).subscribe(respose => {
      this.saveSuccessResponse(respose);
    }, err => {
      console.log('add error ', err);
      this.errorMessage.message = err.error.message;
    });
  }

  saveSuccessResponse(respose: any) {
    this.showSaveCancelBtn = false;

    if (respose.isSuccess) {
      this.sucessMessage = respose.message;
      if (respose.adminRec?.length === 1) {
        this.adminRec = respose.adminRec;
        // this._authService.storeAdminOnSession(respose.adminRec); // maybe we will get reponse if we update  new admin
        this.loadSavedAdminData();
      }
    } else {
      this.errorMessage.message = respose.message;
    }
  }

  saveUpdatedAdminProfile() {
    const updateFields = ['adminId', 'mail', 'firstName', 'lastName', 'role'];
    const adminProfile: any = {};
    for (let field of updateFields) {
      adminProfile[field] = this.adminProfileForm.get(field)?.value;
    }

    adminProfile['_id'] = adminProfile['adminId'];
    delete adminProfile['adminId'];
    console.log('admin profile', adminProfile);
    this._adminServ.updateAdminDetails(adminProfile).subscribe(res => {
      this.saveSuccessResponse(res);
    }, err => {
      console.log('update error ', err);
      this.errorMessage.message = err.error?.message || err?.message;
    });
  }

  submitAdminProfile() {
    this.clearMessageBanner();
    const isFormValid = this.validateAdminUpdateForm();

    if (isFormValid) {
      if (this.isRecordUpdation) {
        this.saveUpdatedAdminProfile();
      } else {
        this.saveNewAdminProfile();
      }
    }
  }

  updateAdminForm() {
    this.enableUpdateForm();
    this.showSaveCancelBtn = true;
    this.isRecordUpdation = true;
  }

  enableUpdateForm() {
    this.UPDATE_ENABLE_FIELDS.forEach(fieldName => {
      this.adminProfileForm.get(fieldName)?.enable();
    });
  }

  cancelEditForm() {
    this.clearMessageBanner();
    this.regResetFullForm();
    this.showSaveCancelBtn = false;

    if (this.adminRec.length) {
      this.loadSavedAdminData();
    }

    this.disableForm();
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
      this.errorMessage.message = 'Enter valid Role for Admin';
    } else if (!this.isRecordUpdation) {
      const isValidPassword = this.validatePassword();
      if (!isValidPassword) {
        this.errorMessage.message = 'Enter valid Password.';
      } else {
        return true;
      }
    } else {
      return true; // if it's update then pass not required
    }

    return false;
  }

  loadAdminProfile() {
    const adminProfile = this._authService.getAdminFromSession();
    if (adminProfile.length === 1) {
      this.isRecordUpdation = true;
      this.adminRec = adminProfile;
      this.loadSavedAdminData();
    }
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
    if (this.showSaveCancelBtn) {
      this.adminProfileForm.get('password')?.enable();
      this.adminProfileForm.get('conPassword')?.enable();
      this.showPswModal = true;
      setTimeout(() => document.getElementById('password')?.focus(), 10);
    }
  }

  enableNewRegFields() {
    this.adminProfileForm.get('firstName')?.enable();
    this.adminProfileForm.get('lastName')?.enable();
    this.adminProfileForm.get('mail')?.enable();

    if (this.isNewRegRequest) {
      this.adminProfileForm.get('role')?.enable();
      this.adminProfileForm.get('role')?.setValue('admin3');
    }
  }

  disableForm() {
    this.adminProfileForm.disable();
  }

  regResetFullForm() {
    this.adminProfileForm.reset();
  }

}
