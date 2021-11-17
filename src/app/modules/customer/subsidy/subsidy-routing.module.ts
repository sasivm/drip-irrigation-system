import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubsidyCalculatorComponent } from 'src/app/subsidy-calculator/subsidy-calculator.component';

const routes: Routes = [
  { path: '', component: SubsidyCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubsidyRoutingModule { }
