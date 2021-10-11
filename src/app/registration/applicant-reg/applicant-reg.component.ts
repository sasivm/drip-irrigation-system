import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { CommonList, GenderList, OptionList, StepperStepState, TableErrorMessage } from 'src/app/common/models/common-types';
import { ApplicantReqData, CustomerResponse } from 'src/app/common/models/customer';
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

  registeredByList: OptionList[] = GlobalConstants.APPLICATION_RegisteredByList;

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
    registeredBy: [''],
    department: [''],
    miCompany: [''],
    landOwnership: [''],
    district: [''],
    block: [''],
    village: [''],
    farmerName: [''],
    mobileNo: [''],
    gender: [''],
    socialStatus: [''],
    landOwnSon: [''],
    _id: ['']
  });

  custRecFormData: any[] = [];

  ENABLED_FIELDS: string[] = ['aadhaarNo', 'landOwnership', 'landOwnSon', 'gender'];
  NEW_REG_FIELDS: string[] = ['applicationId', 'aadhaarNo', 'farmerType', 'registeredBy', 'department', 'miCompany',
    'landOwnership', 'district', 'block', 'village', 'farmerName', 'mobileNo', 'gender', 'socialStatus', 'landOwnSon'];
  NEW_REG_MANDATRY_FIELDS: string[] = ['applicationId', 'aadhaarNo', 'farmerType', 'registeredBy', 'department', 'miCompany',
    'landOwnership', 'district', 'block', 'village', 'farmerName', 'mobileNo', 'gender', 'socialStatus', 'landOwnSon'];

  isNewRegForm: boolean = true;

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  errorMessageList: string[] = [];
  enableNextBtn: boolean = false;

  isNewReqDataLoaded: boolean = false;

  constructor(private fb: FormBuilder, private _custService: CustServiceService, private _dataServ: DataService) { }

  ngOnInit() {
    this.selectedStepper.subscribe(data => {
      this.isNewRegForm = !(data.isCustRecReq);
      if (!this.isNewRegForm && data.stepName === CustomerConstants.STEPPER_LABLES.step2Label) {
        console.log('loading cust req data');
        this.registrationForm.reset();
        this.disableFullForm();
        console.log('data chanaging in applicant reg', data);
        if (this.custRecFormData.length === 0) { // only if record not stored in session
          this.checkForUserRequest();
        }
      } else {
        if(!this.isNewReqDataLoaded) {
          this.loadInitDataForNewReq();
          console.log('loading new data');
          this.isNewReqDataLoaded = true;
        }
      }
    });
  }

  loadInitDataForNewReq() {
    const initData: any = {
      farmerType: 'SF / MF',
      registeredBy: 'MI Company',
      department: 'Agriculture',
      miCompany: 'Vedanta Irrigation system Pvt Ltd.',
      district: 'Tiruppur',
      gender: 'M',
      socialStatus: 'Others'
    };
    this.registrationForm.patchValue(initData);
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

  checkForUserRequest() {
    const userReqStr: string | null = sessionStorage.getItem('user-req');
    if (userReqStr) {
      const userReqObject: ApplicantReqData = JSON.parse(userReqStr);
      this.getApplicantDetails(userReqObject.applicationId);
    }
  }

  changeStepState(state: boolean) {
    const stepState: StepperStepState | null = this._dataServ.getCompletionState();
    if (stepState) {
      stepState.step2 = state;
      this._dataServ.setCompletionState(stepState);
    }
  }

  getApplicantDetails(applicationId: string) {
    this._custService.getCustomerData(applicationId).subscribe((data: CustomerResponse) => {
      if (data && data.isSuccess && data.custRec.length > 0) {
        console.log(data.custRec);
        this.custRecFormData = data.custRec;
        this.storeCustomerDetailsOnSession();
      } else if (!data || !data.isSuccess) {
        this.errorMessage.message = 'Error occured while getting data';
        console.log('Res is not scuccess', data.message);
        this.errorMessage.desc = data.message;
      }
    }, err => {
      console.log('cust error occured', err);
      console.log('err message');
      console.log(err.message);
      this.errorMessage.message = 'Error occured while getting data';
      this.errorMessage.desc = err.message;
    }, () => {
      // this.goForwardOnStepper();
    });
  }

  storeCustomerDetailsOnSession() {
    if (this.custRecFormData.length === 1) {
      sessionStorage.setItem('cust-rec', JSON.stringify(this.custRecFormData[0]));
      this.loadInitUserData();
    }
  }

  loadInitUserData() {
    const custRecord: string | null = this._custService.getCustomerRecordFromSession();
    if (custRecord) {
      this.custRecFormData = [JSON.parse(custRecord)];
      this.registrationForm.patchValue(this.custRecFormData[0]);
      if (this.custRecFormData.length > 0) {
        this.sucessMessage = 'Customer data loaded successfully';
      } else {
        // this.errorMessage.message = 'customer data not loaded';
      }
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

    const updateableFields = this.registrationForm.value; // Gives only enabled field values
    updateableFields['_id'] = this.registrationForm.get('_id')?.value;
    console.log(updateableFields);

    this.updateCustomerRecord(updateableFields);
  }

  updateCustomerRecord(prepareReq: any) {
    this._custService.updateCustomer(prepareReq).subscribe((response: CustomerResponse) => {
      console.log(response);
      console.log('updated successfully');
      if (response.isSuccess) {
        this.sucessMessage = response.message;
        this.enableNextBtn = true;
        this.changeStepState(true);
      } else {
        this.errorMessage.message = 'Failed during updating customer details';
        this.errorMessage.desc = response.message;
      }
    }, err => {
      console.log('Error in update');
      console.log(err);
      this.errorMessage.message = err.message;
      this.errorMessage.desc = err.error ?? '';
    });
  }

}
