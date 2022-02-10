import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { GenderList, OptionList, TableErrorMessage } from 'src/app/common/models/common-types';
import { CustomerResponse, PostMark } from 'src/app/common/models/customer';
import { CustServiceService } from 'src/app/services/cust-service.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-applicant-reg',
  templateUrl: './applicant-reg.component.html',
  styleUrls: ['./applicant-reg.component.scss']
})
export class ApplicantRegComponent implements OnInit {

  @Input() selectedStepper: Subject<any> = new Subject();

  @Input() custRecError: string = '';

  formerTypeList: OptionList[] = GlobalConstants.APPLICATION_FormerTypeList;

  departmentList: OptionList[] = GlobalConstants.APPLICATION_DepartmentList;

  miCompanyList: OptionList[] = GlobalConstants.APPLICATION_MICompanyList;

  genderList: GenderList[] = GlobalConstants.APPLICATION_GenderList;

  socialStatusList: OptionList[] = GlobalConstants.APPLICATION_SocialStatusList;

  fieldNameRef: any = {
    applicationId: 'Application Id',
    farmerType: 'Farmer Type',
    department: 'Department',
    miCompany: 'MI Company',
    district: 'District',
    block: 'Block',
    village: 'Village',
    farmerName: 'Farmer Name',
    mobileNo: 'Mobile',
    socialStatus: 'Caste',
  };

  dropDownFieldsList = ['farmerType', 'department', 'miCompany', 'socialStatus'];

  registrationForm: FormGroup = this.fb.group({
    applicationId: [''],
    aadhaarNo: [''],
    farmerType: [''],
    fatherName: [''],
    department: [''],
    miCompany: [''],
    // landOwnership: [''],
    district: [''],
    block: [''],
    village: [''],
    farmerName: [''],
    mobileNo: [''],
    gender: [''],
    socialStatus: [''],
    sfmfCertNo: [''],
    // landOwnSon: [''],
    _id: ['']
  });

  custRecFormData: any[] = [];

  ENABLED_FIELDS: string[] = ['aadhaarNo', 'gender', 'sfmfCertNo'];
  NEW_REG_FIELDS: string[] = ['applicationId', 'aadhaarNo', 'farmerType', 'fatherName', 'department', 'miCompany', 'district', 'block', 'village', 'farmerName', 'mobileNo', 'gender', 'socialStatus', 'sfmfCertNo'];
  NEW_REG_MANDATRY_FIELDS: string[] = ['applicationId', 'aadhaarNo', 'farmerType', 'fatherName', 'department', 'miCompany', 'district', 'block', 'village', 'farmerName', 'mobileNo', 'gender', 'socialStatus'];

  isNewRegForm: boolean = true;

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };
  errorMessageList: string[] = [];

  deletionWarningMsg: string = 'Are you sure you want to delete the record ?';
  showModal: boolean = false;

  enableNextBtn: boolean = false;

  isNewReqDataLoaded: boolean = false;

  postMarkSection: PostMark = {
    createdBy: '',
    createdAt: '',
    updatedBy: '',
    updatedAt: ''
  };

  enableSaveCancelBtn: boolean = false;

  constructor(private fb: FormBuilder, private _custService: CustServiceService, private _dataServ: DataService) { }

  ngOnInit() {
    this.selectedStepper.subscribe(data => {
      if (this.checkIsNewRegistration(data)) {
        this.custRecFormData = [];
        this.isNewRegForm = true;
        this.loadFormAsNewReg();
        this.selectedStepper.next({
          isCustRecReq: false,
          stepName: CustomerConstants.STEPPER_LABLES.step3Label
        });
        return; // stop if only new reg request
      } else {
        if (this.custRecFormData.length === 0) { // only if first time coming to screen get data from backend
          this.isNewRegForm = !(data?.isCustRecReq);
          if (!this.isNewRegForm && data.stepName === CustomerConstants.STEPPER_LABLES.step2Label) {
            this.registrationForm.reset();
            this.disableFullForm();
            this.checkForUserRequest();
          }
        } else {
          // dont write code here again this will be exceuted after clicking NEXT btn
        }
      }
    });
  }

  checkIsNewRegistration(data: any): boolean {
    if (data && data?.isNewBtnClicked && data?.stepName === CustomerConstants.STEPPER_LABLES.step1Label) {
      return true;
    }

    return false;
  }

  loadFormAsNewReg() {
    if (!this.isNewReqDataLoaded) { // if we come back frm step 3 or 4 to we should populate entered values
      this.registrationForm.reset();
      this.clearMesgBanner();
      this.enableFullForm();
      this.loadInitDataForNewRegistraion();
      console.log('new reg default data loaded...');
      this.isNewReqDataLoaded = true;
    }
  }

  selectedAction(action: string) {
    this.clearMesgBanner();

    switch (action) {
      case 'update':
        this.updateFormState();
        break;
      case 'new':
        this.submitNewApplication();
        break;
      default:
        console.log('Action not defined :', action);
        break;
    }
  }

  submitNewApplication() {
    if (this.isNewRegForm) {
      const isFormValid = this.validateForm();
      if (isFormValid) {

      }
    }
  }

  updateFormState() {
    this.enableSaveCancelBtn = true;
    this.enableOptionalFields();

    if (!this.custRecFormData[0]?.gender) {
      this.registrationForm.get('gender')?.setValue('M');
    }
    document.getElementById('aadhaarNo')?.focus();
  }

  cancelFormAction() {
    this.clearMesgBanner();
    this.enableSaveCancelBtn = false;

    this.resetFormData();
    this.registrationForm.patchValue(this.custRecFormData[0]);
    this.disableFullForm();
  }

  get clipboardCopy() {
    return this.registrationForm.get('applicationId')?.value;
  }

  private readonly NEW_REG_CUST__INITIAL_DATA = {
    farmerType: 'SF / MF',
    department: 'Agriculture',
    miCompany: 'Vedanta Irrigation system Pvt Ltd.',
    district: 'Tiruppur',
    gender: 'M',
    socialStatus: 'Other Caste'
  };

  loadInitDataForNewRegistraion() {
    this.registrationForm.patchValue(this.NEW_REG_CUST__INITIAL_DATA);
    this.registrationForm.get('applicationId')?.disable();
  }

  validateForm(): boolean {
    this.errorMessageList = [];

    if (this.isNewRegForm) {
      const reqFieldCount: number = this.NEW_REG_MANDATRY_FIELDS.length;
      for (let i = 0; i < reqFieldCount; i++) {
        const fieldName: string = this.NEW_REG_MANDATRY_FIELDS[i];
        const value = this.registrationForm.get(fieldName)?.value;
        if (!value) {
          const errorMsg: string = `${fieldName} is required`;
          this.errorMessageList.push(errorMsg);
        }
      }
    }

    if (this.errorMessageList.length > 0) {

      return false;
    }

    return true;
  }

  deleteCustRecord() {
    this.showModal = false;
    this.clearMesgBanner();
    const applicationId = this.registrationForm.get('applicationId')?.value;

    if (applicationId) {
      this._custService.deleteCustomerRecord(applicationId).subscribe(res => {
        if (res && res.isSuccess) {
          this.sucessMessage = res.message;
          this.custRecFormData = [];
          this._custService.removeCustomerRecordAndReqFromSession();

          this.registrationForm.reset();
          this.isNewRegForm = true;
          this.enableNextBtn = false;
          this.updatePostMark();
        } else {
          this.errorMessage.message = 'There were error while deleting record.';
          this.errorMessage.desc = res.message;
        }
      }, error => {
        console.log('deletion error: ', error);
        const errorMessage = 'There were error while deleting record.';
        if (error instanceof HttpErrorResponse) {
          if (error?.error?.message) {
            this.errorMessage.message = error.error.message;
          } else {
            this.errorMessage.message = errorMessage;
            this.errorMessage.desc = error.message;
          }
        } else {
          this.errorMessage.message = errorMessage;
          this.errorMessage.desc = error.message;
        }
      });
    } else {
      this.errorMessage.message = 'Application Id is missing in form.';
    }
  }

  checkForUserRequest() {
    const applicationId: string | null = this._custService.getRequestedCustApplictionIdFromSession();
    if (applicationId) {
      this.getApplicantDetails(applicationId);
    }
  }

  getApplicantDetails(applicationId: string) {
    this._custService.getCustomerData(applicationId).subscribe((data: CustomerResponse) => {
      if (data && data.isSuccess && data.custRec.length > 0) {
        console.log(data.custRec);
        this.custRecFormData = data.custRec;
        this._custService.setCustomerRecordOnSession(this.custRecFormData);
        this.loadSavedCustomerData();
      } else if (!data || !data.isSuccess) {
        this.errorMessage.message = data.message || 'Error occured while getting data';
        console.log('Res is not scuccess', data.message);
        this.isNewRegForm = true;
      }
    }, err => {
      console.log('cust error occured', err);
      console.log('err message');
      console.log(err.message);
      this.errorMessage.message = 'Error occured while getting data';
      this.errorMessage.desc = err.message;
      this.isNewRegForm = true;
    }, () => {
      // this.goForwardOnStepper();
    });
  }

  loadSavedCustomerData() {
    const custRecord: any[] = this._custService.getLoadedCustomerRecord();
    if (custRecord.length === 1 && custRecord[0]._id) {
      this.custRecFormData = custRecord;

      this.registrationForm.patchValue(this.custRecFormData[0]);
      this.updatePostMark(this.custRecFormData[0]);
      this.sucessMessage = 'Customer data loaded successfully';

      if (this.custRecFormData[0]?.isCompleted) {
        this.enableNextBtn = true;
        // this.nextBtnSelected();
      }
    } else {
      this.errorMessage.message = `Error While loading customer data '_id not found`;
    }
  }

  updatePostMark(custRec: any = {}) {
    this.postMarkSection = {
      createdBy: custRec?.createdBy ?? '',
      createdAt: custRec?.createdAt ?? '',
      updatedBy: custRec?.updatedBy ?? '',
      updatedAt: custRec?.updatedAt ?? ''
    }
  }

  findFieldIndex(header: string[]) {
    const fieldIdxInfo: Map<string, number> = new Map();
    header.forEach((field: string, idx: number) => {
      fieldIdxInfo.set(field, idx);
    });
    return fieldIdxInfo;
  }

  resetFormData(): void {
    if (this.isNewRegForm) {
      for (let field of this.NEW_REG_FIELDS) {
        this.registrationForm.controls[field]?.reset('');
      }
    } else {
      for (let fieldName of this.ENABLED_FIELDS) {
        this.registrationForm.controls[fieldName]?.reset('');
      }
    }

    this.clearMesgBanner();
  }

  clearMesgBanner() {
    this.sucessMessage = '';
    this.errorMessage = { message: '', desc: '' };
    this.errorMessageList = [];
  }

  enableFullForm(): void {
    this.registrationForm.enable();
  }

  disableFullForm(): void {
    this.registrationForm.disable();
  }

  enableOptionalFields() {
    for (let fieldName of this.ENABLED_FIELDS) {
      this.registrationForm.get(fieldName)?.enable();
    }
  }

  submitApplicantForm() {
    this.clearMesgBanner();
    const isValidForm: boolean = this.validateForm();
    console.log(isValidForm);
    if (!isValidForm) {
      return;
    }
    this.enableNextBtn = false;
    const updateableFields = this.registrationForm.value; // Gives only enabled field values
    updateableFields['_id'] = this.registrationForm.get('_id')?.value;
    console.log(updateableFields);

    this.updateCustomerRecord(updateableFields);
  }

  // have to change network call
  saveCustomerRecord(prepareReq: any) {
    this._custService.updateCustomer(prepareReq).subscribe((response: CustomerResponse) => {
      console.log(response);
      console.log('saved successfully');
      this.recordSavedSuccess(response);
    }, err => {
      console.log('Error while saving');
      console.log(err);
      this.saveRecordErrorHandling(err);
    });
  }

  recordSavedSuccess(response: any) {
    if (response.isSuccess) {
      this.sucessMessage = response.message;
      this.custRecFormData = response.custRec;
      this._custService.setCustomerRecordOnSession(response.custRec);
      if (response.custRec[0]?.isCompleted) {
        this.enableNextBtn = true;
        // this.nextBtnSelected();
      }
      this.updatePostMark(this.custRecFormData[0]);
      this.disableFullForm();
      this.enableSaveCancelBtn = false;
    } else {
      this.errorMessage.message = 'Failed during updating customer details';
      this.errorMessage.desc = response.message;
    }
  }

  updateCustomerRecord(prepareReq: any) {
    this._custService.updateCustomer(prepareReq).subscribe((response: CustomerResponse) => {
      console.log(response);
      console.log('updated successfully');
      this.recordSavedSuccess(response);
    }, err => {
      console.log('Error in update');
      console.log(err);
      this.saveRecordErrorHandling(err);
    }, () => this.enableNextBtn = true);
  }

  saveRecordErrorHandling(error: any) {
    this.errorMessage.message = error.message;
    this.errorMessage.desc = error.error ?? '';
  }

  nextBtnSelected() {
    console.log('next btn clicked');
    this.selectedStepper.next({
      isCompleted: true,
      stepName: CustomerConstants.STEPPER_LABLES.step2Label
    });
  }

}
