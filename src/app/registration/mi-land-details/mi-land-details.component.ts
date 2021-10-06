import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { CommonList, OptionList } from 'src/app/common/models/common-types';
import { MILandRecord } from 'src/app/common/models/customer';
import { CustServiceService } from 'src/app/services/cust-service.service';

@Component({
  selector: 'app-mi-land-details',
  templateUrl: './mi-land-details.component.html',
  styleUrls: ['./mi-land-details.component.scss']
})
export class MiLandDetailsComponent implements OnInit {

  @Input() selectedStepper: Subject<any> = new Subject();

  cropTypeList: OptionList[] = GlobalConstants.CROP_CropTypeList;

  cropLandTypeList: OptionList[] = GlobalConstants.CROP_CropLandTypeList;

  miTypeList: OptionList[] = GlobalConstants.CROP_MITypeList;

  miLandForm: FormGroup = this.fb.group({
    cropType: [{ value: '', disabled: true }],
    miType: [{ value: '', disabled: true }],
    cropLandType: ['']
  });

  constructor(private fb: FormBuilder, private _custService: CustServiceService) { }

  ngOnInit() {
    this.selectedStepper.subscribe(data => {
      if (data.isCustRecReq && data.stepName === CustomerConstants.STEPPER_LABLES.step3Label) {
        const customerRec: any[] = this._custService.getLoadedCustomerRecord();
        console.log('cust rec', customerRec);
        if (customerRec.length === 1) {
          const miLandRec: MILandRecord = customerRec[0].miLandRec;
          this.loadLandDetails(miLandRec);
        }
      }
    });
  }

  loadLandDetails(landRecord: MILandRecord) {
    console.log('mi rec', landRecord);
    this.miLandForm.patchValue(landRecord);
  }

  submitLandForm() {
    console.log(this.miLandForm.value);
  }

  resetFormData() {
    this.miLandForm.get('cropLandType')?.reset('');
  }

}
