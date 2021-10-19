import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SubsCalcConstants } from 'src/app/common/calculator-constants';
import { Component_A } from 'src/app/common/models/table-models';

@Component({
  selector: 'app-component-a-calc',
  templateUrl: './component-a-calc.component.html',
  styleUrls: ['./component-a-calc.component.scss']
})
export class ComponentACalcComponent implements OnInit {

  dataSource: Component_A[] = SubsCalcConstants.CONTROLUNIT_DATASOURCE;

  displayedColumns: string[] = SubsCalcConstants.DISPLAY_COLUMNS;

  selectedRowIdx: number = 0;

  controlUnitForm: FormGroup = this.fb.group({
    unitItems: this.fb.array([]),
    totalAmt: [0]
  });

  get unitItemsFormArray(): FormArray {
    return this.controlUnitForm.get(this.FORMARRAY_FORM_NAME) as FormArray;
  }

  FORMARRAY_FORM_NAME: string = SubsCalcConstants.CONTROL_UNIT_FORMARRAY_FORM_NAME
  FORMARRAY_FIELD_TOATL: string = SubsCalcConstants.CONTROL_UNIT_FORMARRAY_FIELD_TOATL
  FORMARRAY_FIELD_QTY: string = SubsCalcConstants.CONTROL_UNIT_FORMARRAY_FIELD_QTY
  TOTAL_AMT_FIELD: string = SubsCalcConstants.CONTROL_UNIT_TOTAL_AMT_FIELD

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadFieldUnits();
  }

  updateTotalUnit(idx: number): void {
    const unitFormControls = this.unitItemsFormArray.controls;

    const qty: number = unitFormControls[idx].get(this.FORMARRAY_FIELD_QTY)?.value;
    const price: number = this.dataSource[idx].unitRate;
    const qty_amt_total = qty * price;

    const unitTotalControl = unitFormControls[idx].get(this.FORMARRAY_FIELD_TOATL);
    const prevUnitTotalAmt = unitTotalControl?.value;
    unitTotalControl?.setValue(qty_amt_total);

    this.updateTotalItemsAmt(prevUnitTotalAmt, qty_amt_total);
  }

  updateTotalItemsAmt(prevTotal: number, newTotal: number) {
    /*
    below code will first subtract privous amt of items and qty total (row wise) from Total Form amount and
    adds new qty and item to Total Form amount (Full amount).
    */
    const totalAmtControl = this.controlUnitForm.get(this.TOTAL_AMT_FIELD);

    const currTotal = totalAmtControl?.value;
    const totalAmount = ((currTotal - prevTotal) + newTotal);

    totalAmtControl?.setValue(totalAmount);
  }

  getTotalOfItems(idx: number) {
    const totalValue = this.unitItemsFormArray.controls[idx].get(this.FORMARRAY_FIELD_TOATL)?.value;
    return totalValue;
  }

  loadFieldUnits() {
    const fieldControl = this.unitItemsFormArray;
    for (let i = 0; i < this.dataSource.length; i++) {
      const fieldFromGroup: FormGroup = this.setUnitFieldsFormArray();
      fieldControl.push(fieldFromGroup);
    }
  }

  setUnitFieldsFormArray() {
    const fields: FormGroup = this.fb.group({
      qty: [0],
      total: [0]
    });
    return fields;
  }

}
