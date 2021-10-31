import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustSearchComponent } from './cust-search/cust-search.component';
import { DocsViewComponent } from './documents/docs-view.component';
import { PreDocComponent } from './documents/pre-doc/pre-doc.component';
import { SfmfDocComponent } from './documents/sfmf-doc/sfmf-doc.component';
import { VerificationDocComponent } from './documents/verification-doc/verification-doc.component';
import { WorkCompleteComponent } from './documents/work-complete/work-complete.component';
import { BulkRegistorComponent } from './registration/bulk-registor/bulk-registor.component';
import { RegistrationComponent } from './registration/registration.component';
import { SubsidyCalculatorComponent } from './subsidy-calculator/subsidy-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, //to view working scr
  { path: 'register', component: RegistrationComponent },
  { path: 'register/bulk-register', component: BulkRegistorComponent },
  { path: 'search', component: CustSearchComponent },
  { path: 'subs-calc', component: SubsidyCalculatorComponent },
  {
    path: 'docs', component: DocsViewComponent, children: [
      { path: 'sfmf', component: SfmfDocComponent },
      { path: 'verification', component: VerificationDocComponent },
      { path: 'pre', component: PreDocComponent },
      { path: 'wrk-complete', component: WorkCompleteComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
