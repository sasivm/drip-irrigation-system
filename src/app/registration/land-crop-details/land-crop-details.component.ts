import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CommonList } from 'src/app/common/models/common-types';

@Component({
  selector: 'app-land-crop-details',
  templateUrl: './land-crop-details.component.html',
  styleUrls: ['./land-crop-details.component.scss']
})
export class LandCropDetailsComponent {

  totalIrrigationArea: number = 0;
  totalCropIrrigationArea: number = 0;

  primaryCropList: CommonList[] = GlobalConstants.CROP_PrimaryCropList;

  interCropList: CommonList[] = GlobalConstants.CROP_InterCropList;

  miCropList: CommonList[] = GlobalConstants.CROP_MICropList;

  cropSpacingList: CommonList[] = GlobalConstants.CROP_CropSpacingList;

  surveyDetailsForm: FormGroup = this.fb.group({
    surveyDetails: this.fb.array([
      this.surveyFormFields() // it return initial form group object to show
    ])
  });

  cropDetailsForm: FormGroup = this.fb.group({
    cropDetails: this.fb.array([
      this.cropFormFields() // it return initial form group object to show
    ])
  });

  constructor(private fb: FormBuilder) { }

  get surveyDetails(): FormArray {
    return this.surveyDetailsForm.get('surveyDetails') as FormArray;
  }

  get cropDetails(): FormArray {
    return this.cropDetailsForm.get('cropDetails') as FormArray;
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
