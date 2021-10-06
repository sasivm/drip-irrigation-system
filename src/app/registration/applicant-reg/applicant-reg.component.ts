import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { CommonList, GenderList, TableErrorMessage } from 'src/app/common/models/common-types';
import { ApplicantReqData, CustomerResponse } from 'src/app/common/models/customer';
import { CustServiceService } from 'src/app/services/cust-service.service';

@Component({
  selector: 'app-applicant-reg',
  templateUrl: './applicant-reg.component.html',
  styleUrls: ['./applicant-reg.component.scss']
})
export class ApplicantRegComponent implements OnInit {

  @Input() selectedStepper: Subject<any> = new Subject();

  @Input() custRecError: string = '';

  formerTypeList: CommonList[] = GlobalConstants.APPLICATION_FormerTypeList;

  registeredByList: CommonList[] = GlobalConstants.APPLICATION_RegisteredByList;

  departmentList: CommonList[] = GlobalConstants.APPLICATION_DepartmentList;

  miCompanyList: CommonList[] = GlobalConstants.APPLICATION_MICompanyList;

  genderList: GenderList[] = GlobalConstants.APPLICATION_GenderList;

  socialStatusList: CommonList[] = GlobalConstants.APPLICATION_SocialStatusList;

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
    farmerType: ['Select Farmer Type'],
    registeredBy: ['Self / Farmer'],
    department: ['Select Department'],
    miCompany: ['Select MI Company'],
    landOwnership: [''],
    district: [''],
    block: [''],
    village: [''],
    farmerName: [''],
    mobileNo: [''],
    gender: ['M'],
    rationCardNo: [''],
    socialStatus: ['Select Caste'],
    landOwnSon: [''],
    _id: ['']
  });

  custRecFormData: any[] = [];

  ENABLED_FIELDS: string[] = ['aadhaarNo', 'landOwnership', 'landOwnSon', 'gender'];

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  constructor(private fb: FormBuilder, private _custService: CustServiceService) { }

  ngOnInit() {
    this.selectedStepper.subscribe(data => {
      if (data.isCustRecReq && data.stepName === CustomerConstants.STEPPER_LABLES.step2Label) {
        this.disableFullForm();
        console.log('data chanaging in applicant reg', data);
        if (this.custRecFormData.length === 0) { // only if record not stored in session
          this.checkForUserRequest();
        }
      }
    });
  }

  checkForUserRequest() {
    const userReqStr: string | null = sessionStorage.getItem('user-req');
    if (userReqStr) {
      const userReqObject: ApplicantReqData = JSON.parse(userReqStr);
      this.getApplicantDetails(userReqObject.applicationId);
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
    for (let fieldName of this.ENABLED_FIELDS) {
      this.registrationForm.controls[fieldName]?.reset();
    }
    this.clearMesgBanner();
  }

  clearMesgBanner() {
    this.sucessMessage = '';
    this.errorMessage = { message: '', desc: '' };
  }

  get isFullFormEnabled(): boolean {
    const isEnabled = this.registrationForm.disabled;
    console.log(this.registrationForm);

    return isEnabled;
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

    const updateableFields = this.registrationForm.value; // Gives only enabled field values
    updateableFields['_id'] = this.registrationForm.get('_id')?.value;
    console.log(updateableFields);
    this._custService.updateCustomer(updateableFields).subscribe((response: CustomerResponse) => {
      console.log(response);
      console.log('updated successfully');
      if (response.isSuccess) {
        this.sucessMessage = response.message;
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
