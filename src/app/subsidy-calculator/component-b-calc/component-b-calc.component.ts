import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SubsCalcConstants } from 'src/app/common/calculator-constants';
import { Component_B } from 'src/app/common/models/table-models';

@Component({
  selector: 'app-component-b-calc',
  templateUrl: './component-b-calc.component.html',
  styleUrls: ['./component-b-calc.component.scss']
})
export class ComponentBCalcComponent implements OnInit {

  dataSource: Component_B[] = SubsCalcConstants.FIELDUNIT_DATASOURCE;

  displayedColumns: string[] = SubsCalcConstants.DISPLAY_COLUMNS;

  FORMARRAY_FORM_NAME: string = SubsCalcConstants.FIELD_UNIT_FORMARRAY_FORM_NAME
  FORMARRAY_ITEM_QUANTITY: string = SubsCalcConstants.FIELD_UNIT_FORMARRAY_ITEM_QUANTITY
  FORMARRAY_ITEM_TOTAL: string = SubsCalcConstants.FIELD_UNIT_FORMARRAY_ITEM_TOTAL
  FORMGROUP_TOTAL: string = SubsCalcConstants.FIELD_UNIT_FORMGROUP_TOTAL

  filedUnitFrom: FormGroup = this.fb.group({
    fieldItemArray: this.fb.array([]),
    totalFrmAmount: [0]
  });

  selectedRowIdx: number = -1;

  get fieldItemFromArray() {
    return this.filedUnitFrom.get(this.FORMARRAY_FORM_NAME) as FormArray;
  }

  totalFieldValue(idx: number) {
    return this.fieldItemFromArray.controls[idx].get(this.FORMARRAY_ITEM_TOTAL)?.value
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadFiledUnitsFormArrayControls();
  }

  loadFiledUnitsFormArrayControls() {
    const tableLength: number = this.dataSource.length;

    for (let i = 0; i < tableLength; i++) {
      const filedItemFormGroup: FormGroup = this.getUnitItemArrayFormGroup();
      this.fieldItemFromArray.push(filedItemFormGroup);
    }
  }

  updateUnitTotal(index: number) {
    const qty: number = this.fieldItemFromArray.controls[index].get(this.FORMARRAY_ITEM_QUANTITY)?.value;
    const unitRate: number = this.dataSource[index].unitRate;
    const qtyRowTotalAmt = qty * unitRate;

    const ROW_TOTAL_FIELD_CONTROL = this.fieldItemFromArray.controls[index].get(this.FORMARRAY_ITEM_TOTAL);
    // console.log(ROW_TOTAL_FIELD_CONTROL?);

    const prevRowAmt = ROW_TOTAL_FIELD_CONTROL?.value;
    ROW_TOTAL_FIELD_CONTROL?.setValue(qtyRowTotalAmt);

    this.updateTotalFromAmount(prevRowAmt, qtyRowTotalAmt);
  }

  updateTotalFromAmount(prevRowTotal: number, newRowTotal: number) {
    /*
    below code will first subtract privous amt of items and qty total (row wise) from Total Form amount and
    adds new qty and item to Total Form amount (Full amount).
    */
    const Total_Field_Control = this.filedUnitFrom.get(this.FORMGROUP_TOTAL);
    const currTotal = Total_Field_Control?.value;
    const newFormTotalAmt: number = ((currTotal - prevRowTotal) + newRowTotal);
    Total_Field_Control?.setValue(newFormTotalAmt);
  }

  getTotalFormAmount(): number {
    return this.filedUnitFrom.get(this.FORMGROUP_TOTAL)?.value;
  }

  getUnitItemArrayFormGroup(): FormGroup {
    const unitFields: FormGroup = this.fb.group({
      qty: [0],
      total: [0]
    });
    return unitFields;
  }

}
