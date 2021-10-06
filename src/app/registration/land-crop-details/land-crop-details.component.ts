import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { CommonList } from 'src/app/common/models/common-types';
import { CustServiceService } from 'src/app/services/cust-service.service';

@Component({
  selector: 'app-land-crop-details',
  templateUrl: './land-crop-details.component.html',
  styleUrls: ['./land-crop-details.component.scss']
})
export class LandCropDetailsComponent implements OnInit {

  @Input() selectedStepper: Subject<any> = new Subject();

  totalCropIrrigationArea: number = 0;

  primaryCropList: CommonList[] = GlobalConstants.CROP_PrimaryCropList;

  interCropList: CommonList[] = GlobalConstants.CROP_InterCropList;

  miCropList: CommonList[] = GlobalConstants.CROP_MICropList;

  cropSpacingList: CommonList[] = GlobalConstants.CROP_CropSpacingList;

  surveyDetailsForm: FormGroup = this.fb.group({
    surveyDetails: this.fb.array([
      // this.surveyFormFields() // it return initial form group object to show
    ]),
    totalIrrigationArea: [0]
  });

  cropDetailsForm: FormGroup = this.fb.group({
    cropDetails: this.fb.array([
      // this.cropFormFields() // it return initial form group object to show
    ])
  });

  get surveyDetails(): FormArray {
    return this.surveyDetailsForm.get('surveyDetails') as FormArray;
  }

  get cropDetails(): FormArray {
    return this.cropDetailsForm.get('cropDetails') as FormArray;
  }

  constructor(private fb: FormBuilder, private _custService: CustServiceService) { }

  ngOnInit() {
    this.selectedStepper.subscribe(data => {
      if (data.isCustRecReq && data.stepName === CustomerConstants.STEPPER_LABLES.step4Label) {
        console.log('data chanaging in land/crop', data);
        const customerRec: any[] = this._custService.getLoadedCustomerRecord();
        console.log('cust rec', customerRec);
        if (customerRec.length === 1) {
          const surveyCropRec: any = customerRec[0].surveyCropRec;
          this.loadSurveyLandDetails(surveyCropRec);
        }
      }
    });
  }

  loadSurveyLandDetails(surveyRec: any) {
    console.log('survey rec');
    console.log(surveyRec);
    const surveyFormControls = this.surveyDetails.controls;

    const surveyList: any[] = surveyRec.surveyNo;
    const SubdivisionList: any[] = surveyRec.subDivisionNo;

    for (let i = 0; i < surveyList.length; i++) {
      surveyFormControls.push(this.surveyFormFields());
      surveyFormControls[i].get('surveyNo')?.setValue(surveyList[i]);
      surveyFormControls[i].get('subDivisionNo')?.setValue(SubdivisionList[i]);
    }

    const totalArea: number = surveyRec.totalArea;
    this.surveyDetailsForm.get('totalIrrigationArea')?.setValue(totalArea);
  }

  AddLandDetails() {
    const newSurveyGroup: FormGroup = this.surveyFormFields();
    this.surveyDetails.push(newSurveyGroup);
  }

  removeSurveyField(index: number): void {
    this.surveyDetails.removeAt(index);
  }

  surveyFormFields(): FormGroup {
    return this.fb.group({
      surveyNo: [''],
      subDivisionNo: [''],
      totalLandArea: [''],
      plannedMIArea: ['']
    });
  }

  AddCropFieldDetails() {
    const newCropFields: FormGroup = this.cropFormFields();
    this.cropDetails.push(newCropFields);
  }

  removeCropFieldDetails(index: number): void {
    this.cropDetails.removeAt(index);
  }

  cropFormFields(): FormGroup {
    return this.fb.group({
      primaryCrop: [-1],
      interCrop: [-1],
      miCrop: [-1],
      cropSpacing: [-1],
      miAreaSplitup: []
    });
  }
  
}
