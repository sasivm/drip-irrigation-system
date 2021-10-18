import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { CommonList, OptionList, TableErrorMessage } from 'src/app/common/models/common-types';
import { CustomerResponse, MILandRecord } from 'src/app/common/models/customer';
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
    cropLandType: [''],
    _id: ['']
  });

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  enableNextBtn: boolean = false;

  constructor(private fb: FormBuilder, private _custService: CustServiceService) { }

  ngOnInit() {
    this.selectedStepper.subscribe(data => {
      if (data.isCustRecReq && data.stepName === CustomerConstants.STEPPER_LABLES.step3Label) {
        const customerRec: any[] = this._custService.getLoadedCustomerRecord();
        console.log('cust rec', customerRec);
        if (customerRec.length === 1) {
          const miLandRec: MILandRecord = customerRec[0].miLandRec;
          miLandRec._id = customerRec[0]._id;
          this.loadLandDetails(miLandRec);
          this.sucessMessage = 'Mi Land deatils Loaded Successfully';
          if (miLandRec?.cropLandType) {
            this.nextBtnSelected();
          }
        }
      }
    });
  }

  loadLandDetails(landRecord: MILandRecord) {
    console.log('mi rec', landRecord);
    this.miLandForm.patchValue(landRecord);
    if (landRecord.cropLandType) {
      this.enableNextBtn = true;
    }
  }

  submitLandForm() {
    this.clearMesgBanner();
    this.enableNextBtn = false;

    const miLandRec = this.miLandForm.value;
    console.log(miLandRec);

    this._custService.updateMILandRecord(miLandRec).subscribe((response: CustomerResponse) => {
      if (response.isSuccess) {
        this.sucessMessage = response.message;
      } else {
        this.errorMessage.message = 'Failed during updation';
        this.errorMessage.desc = response.message;
      }
    }, err => {
      console.log('error : ', err)
      this.errorMessage.message = 'Failed during updation';
      this.errorMessage.desc = err?.error;
    }, () => this.enableNextBtn = true);
  }

  nextBtnSelected() {
    this.selectedStepper.next({
      isCompleted: true,
      stepName: CustomerConstants.STEPPER_LABLES.step3Label
    });
  }

  clearMesgBanner() {
    this.sucessMessage = '';
    this.errorMessage = { message: '', desc: '' };
  }

  resetFormData() {
    this.miLandForm.get('cropLandType')?.reset('');
  }

}
