import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustSearchComponent } from './cust-search/cust-search.component';
import { DocsViewComponent } from './documents/docs-view.component';
import { BulkRegistorComponent } from './registration/bulk-registor/bulk-registor.component';
import { RegistrationComponent } from './registration/registration.component';
import { SubsidyCalculatorComponent } from './subsidy-calculator/subsidy-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, //to view working scr
  { path: 'register', component: RegistrationComponent },
  { path: 'register/bulk-register', component: BulkRegistorComponent },
  { path: 'search', component: CustSearchComponent },
  { path: 'subs-calc', component: SubsidyCalculatorComponent },
  { path: 'docs', component: DocsViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
