import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerConstants } from 'src/app/common/customer-constant';
import { CustServiceService } from 'src/app/services/cust-service.service';

@Component({
  selector: 'app-reg-type',
  templateUrl: './reg-type.component.html',
  styleUrls: ['./reg-type.component.scss']
})
export class RegTypeComponent {

  @Input() selectedStepper: Subject<any> = new Subject();
  constructor(private custServ: CustServiceService) { }

  newRegBtnSelected() {
    this.custServ.removeCustomerRecordAndReqFromSession();
    this.selectedStepper.next({
      isCompleted: true,
      isNewBtnClicked: true,
      stepName: CustomerConstants.STEPPER_LABLES.step1Label
    });
  }
}
