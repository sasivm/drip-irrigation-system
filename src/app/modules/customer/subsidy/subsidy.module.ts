import { NgModule } from '@angular/core';

import { SubsidyRoutingModule } from './subsidy-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { SubsidyCalculatorComponent } from 'src/app/subsidy-calculator/subsidy-calculator.component';
import { ComponentACalcComponent } from 'src/app/subsidy-calculator/component-a-calc/component-a-calc.component';
import { ComponentBCalcComponent } from 'src/app/subsidy-calculator/component-b-calc/component-b-calc.component';

@NgModule({
  declarations: [SubsidyCalculatorComponent, ComponentACalcComponent, ComponentBCalcComponent],
  imports: [
    SharedModule,
    SubsidyRoutingModule
  ]
})
export class SubsidyModule { }
