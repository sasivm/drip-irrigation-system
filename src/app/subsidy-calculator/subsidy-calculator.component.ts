import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component_A } from '../common/models/table-models';

@Component({
  selector: 'app-subsidy-calculator',
  templateUrl: './subsidy-calculator.component.html',
  styleUrls: ['./subsidy-calculator.component.scss']
})
export class SubsidyCalculatorComponent implements OnInit {

  subsidyForm: FormGroup = this.fb.group({
    lateralSpace: [''],
    dripperSpace: [''],
    sysArea: [''],
    govtSubAmt: [184853],
    percentAge: [75],
    subsAmt: [0],
    gstTax: [''],
    totalSubsidy: [0]
  });

  GST_PERCET: number = 12;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.UpdateTotalSubsidy();
  }

  UpdateTotalSubsidy(): void {
    const govtSubsideyAmt = this.subsidyForm.get('govtSubAmt')?.value;
    let percentAge = this.subsidyForm.get('percentAge')?.value;
    percentAge = percentAge / 100;
    const subsidyAmt = Math.round(govtSubsideyAmt * percentAge);

    this.subsidyForm.get('subsAmt')?.setValue(subsidyAmt);

    const GST_tax = Math.round(govtSubsideyAmt * (this.GST_PERCET / 100));
    this.subsidyForm.get('gstTax')?.setValue(GST_tax);

    const totalSubsidy = Math.round(GST_tax + subsidyAmt);
    this.subsidyForm.get('totalSubsidy')?.setValue(totalSubsidy);
  }

}
