import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from '../common/app.global-constant';
import { CommonList } from '../common/models/common-types';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formerTypeList: CommonList[] = GlobalConstants.APPLICATION_FormerTypeList;

  registeredByList: CommonList[] = GlobalConstants.APPLICATION_RegisteredByList;

  departmentList: CommonList[] = GlobalConstants.APPLICATION_DepartmentList;

  miCompanyList: CommonList[] = GlobalConstants.APPLICATION_MICompanyList;

  genderList: CommonList[] = GlobalConstants.APPLICATION_GenderList;

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
    gender: ['Select Gender'],
    rationCardNo: [''],
    socialStatus: ['Select Caste'],
    landOwnSon: ['']
  });

  savedFormData: any = {};

  MISSED_FIELDS: string[] = ['aadhaarNo', 'landOwnership', 'landOwnSon', 'gender'];
  REG_GENDER_FIELD: string = 'gender';

  formStateEnabled: boolean = true;

  constructor(private fb: FormBuilder) { }

  createNewUserDetails(user_details: any[], fieldInfo: Map<string, number>) {
    const newDetails: any = {};
    for (const controlName in this.fieldNameRef) {
      const excelColName = this.fieldNameRef[controlName];
      if (fieldInfo.has(excelColName)) {
        const dataIndex: number = fieldInfo.get(excelColName) || -1;
        if (dataIndex >= 0) {
          newDetails[controlName] = user_details[dataIndex];
        }
      }
    }
    console.log(newDetails);
    newDetails[this.REG_GENDER_FIELD] = 1;
    this.registrationForm.patchValue(newDetails);
  }

  ngOnInit(): void {
    this.loadInitUserData();
  }

  loadInitUserData() {
    const str = localStorage.getItem('user-data') || '';
    const userRecord: any[] = JSON.parse(str);

    const header: string[] = userRecord.shift();
    const fieldInfo: Map<string, number> = this.findFieldIndex(header);
    const user_details = userRecord[1];

    this.createNewUserDetails(user_details, fieldInfo);
    this.saveInitForm();
    this.disableFullForm();
  }

  saveInitForm() {
    this.savedFormData = this.registrationForm.getRawValue();
  }

  findFieldIndex(header: string[]) {
    const fieldIdxInfo: Map<string, number> = new Map();
    header.forEach((field: string, idx: number) => {
      fieldIdxInfo.set(field, idx);
    });
    return fieldIdxInfo;
  }

  setFormInitState(): void {
    this.registrationForm.setValue(this.savedFormData);
  }

  resetFormData(): void {
    this.setFormInitState();
  }

  get isFullFormEnabled(): boolean {
    const isEnabled = this.registrationForm.disabled;
    console.log(this.registrationForm);
    
    return isEnabled;
  }

  enableFullForm(): void {
    this.registrationForm.enable();
    this.formStateEnabled = true;
  }

  disableFullForm(): void {
    this.setFormInitState();

    this.registrationForm.disable();
    for (let fieldName of this.MISSED_FIELDS) {
      this.registrationForm.get(fieldName)?.enable();
    }
    this.formStateEnabled = false;
  }

  submitApplicantForm() {
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.getRawValue());    
  }

}