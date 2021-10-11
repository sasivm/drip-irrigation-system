import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { CustomerConstants } from '../common/customer-constant';
import { StepperStepState, TableErrorMessage } from '../common/models/common-types';
import { ApplicantReqData, CustomerResponse } from '../common/models/customer';
import { CustServiceService } from '../services/cust-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild(MatStepper) private myStepper!: MatStepper;

  isCustRecordReq: boolean = false;

  constructor(private _dataServ: DataService) { }

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
    const stepLabel = event.selectedStep.label;

    const stepState: StepperStepState | null = this._dataServ.getCompletionState();

    if (stepLabel === this.stepperLabels.step1Label) {
      event.selectedStep.completed = true;
      return;
    } else if (stepLabel === this.stepperLabels.step2Label) {
      if (stepState) {
        event.selectedStep.completed = stepState.step2;
      } else {
        event.selectedStep.completed = false;
      }

      this.selectedStepperSubject.next({
        isCustRecReq: this.isCustRecordReq,
        stepName: stepLabel
      });
      return;
    }

    if (!stepState) {
      event.selectedStep.completed = false;
      return;
    }

    /* moves to selected step only if prev step is completed(true) */

    if (stepLabel === this.stepperLabels.step3Label) {
      if (stepState) {
        event.selectedStep.completed = stepState.step3;
      }
    } else if (stepLabel === this.stepperLabels.step4Label) {
      if (stepState) {
        event.selectedStep.completed = stepState.step4;
      }
    }

    // if (this.isCustRecordReq) {
    this.selectedStepperSubject.next({
      isCustRecReq: this.isCustRecordReq,
      stepName: stepLabel
    });
    // }
  }

}