import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { StepperStepState } from 'src/app/common/models/common-types';
import { CustServiceService } from 'src/app/services/cust-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild(MatStepper) private myStepper!: MatStepper;

  constructor(private _custServc: CustServiceService) { }

  selectedStepperSubject: Subject<any> = new Subject();

  customerRecord: any[] = [];

  completedState: StepperStepState = {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  };

  stepperLabels = CustomerConstants.STEPPER_LABLES;

  ngOnInit() {
    this.selectedStepperSubject.subscribe(data => {
      const moveToNext: boolean = data.isNext ?? false;
      if (data.stepName === CustomerConstants.STEPPER_LABLES.step2Label) {
        console.log('Reg event triggered');
        if (data?.isCompleted) {
          console.log('next step', data?.isCompleted);
          this.completedState.step2 = true;
        }
      }
      else if (data.stepName === CustomerConstants.STEPPER_LABLES.step3Label) {
        console.log('Reg event triggered');
        if (data?.isCompleted) {
          console.log('next step', data?.isCompleted);
          this.completedState.step3 = true;
        }
      }
    });

    setTimeout(() => this.checkForUserRequest(), 0);
  }

  goForwardOnStepper() {
    setTimeout(() => this.myStepper.next(), 0);
  }

  checkForUserRequest() {
    const applicationId: string | null = this._custServc.getRequestedCustApplictionIdFromSession();
    if (applicationId) {
      this.goForwardOnStepper();
    }
  }

  checkForCompleteionState() {
    const customerRecArr: any[] = this._custServc.getLoadedCustomerRecord();
    if (customerRecArr.length === 1) {
      const custRec = customerRecArr[0];
      if (custRec?.isCompleted) {
        this.completedState.step2 = true;
      }

      if (custRec?.miLandRec?.cropLandType) {
        this.completedState.step3 = true;
      }
    }
  }

  selectionChange(event: StepperSelectionEvent) {
    const stepLabel = event.selectedStep.label;
    const isCustApp_IdRequested: boolean = !!(this._custServc.getRequestedCustApplictionIdFromSession());

    console.log('selected Step :', stepLabel, 'cust-re', isCustApp_IdRequested);

    const selectedStepState = {
      isCustRecReq: isCustApp_IdRequested,
      stepName: stepLabel
    };

    if (stepLabel === CustomerConstants.STEPPER_LABLES.step2Label) {
      this.selectedStepperSubject.next(selectedStepState);
    } else if (stepLabel === CustomerConstants.STEPPER_LABLES.step3Label) {
      this.selectedStepperSubject.next(selectedStepState);
    } else if (stepLabel === CustomerConstants.STEPPER_LABLES.step4Label) {
      this.selectedStepperSubject.next(selectedStepState);
    }
  }

}