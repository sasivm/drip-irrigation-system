import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { CustomerConstants } from '../common/customer-constant';
import { TableErrorMessage } from '../common/models/common-types';
import { ApplicantReqData, CustomerResponse } from '../common/models/customer';
import { CustServiceService } from '../services/cust-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('stepper') private myStepper!: MatStepper;

  isCustRecordReq: boolean = false;

  constructor() { }

  selectedStepperSubject: Subject<any> = new Subject();

  customerRecord: any[] = [];

  stepperLabels: any = CustomerConstants.STEPPER_LABLES;

  ngOnInit() {    
    setTimeout(() => this.checkForUserRequest(), 500);
  }

  goForwardOnStepper() {
    this.myStepper.next();
  }

  checkForUserRequest() {
    const userReqStr: string | null = sessionStorage.getItem('user-req');
    this.isCustRecordReq = !!userReqStr;
    if (this.isCustRecordReq) {
      this.goForwardOnStepper();
    }
  }

  selectionChange(event: StepperSelectionEvent) {
    console.log(event);
    const stepLabel = event.selectedStep.label;

    if (this.isCustRecordReq) {
      this.selectedStepperSubject.next({
        isCustRecReq: this.isCustRecordReq,
        stepName: stepLabel
      });
      if (stepLabel == "Applicant Registration") {
        // this.checkForUserRequest();

      }
    }

  }

}