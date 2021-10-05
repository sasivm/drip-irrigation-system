import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
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

  constructor() { }

  customerRecord: any[] = [];

  ngOnInit() {
    setTimeout(() => this.checkForUserRequest(), 500);
  }

  goForwardOnStepper() {
    this.myStepper.next();
  }


  checkForUserRequest() {
    const userReqStr: string | null = sessionStorage.getItem('user-req');
    if (userReqStr) {
      this.goForwardOnStepper();
    }
  }

  selectionChange(event: StepperSelectionEvent) {
    console.log(event.selectedStep.label);
    let stepLabel = event.selectedStep.label

    if (stepLabel == "Applicant Registration") {
      // this.checkForUserRequest();
    }

  }

}