import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './admin/account-setting/account-setting.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminSearchComponent } from './admin/admin-search/admin-search.component';
import { PermissionManagerComponent } from './admin/permission-manager/permission-manager.component';
import { AuthGuard } from './auth.guard';
import { CustSearchComponent } from './cust-search/cust-search.component';
import { DocsViewComponent } from './documents/docs-view.component';
import { PmksyDocComponent } from './documents/pmksy-doc/pmksy-doc.component';
import { PreDocComponent } from './documents/pre-doc/pre-doc.component';
import { SfmfDocComponent } from './documents/sfmf-doc/sfmf-doc.component';
import { VerificationDocComponent } from './documents/verification-doc/verification-doc.component';
import { WorkCompleteComponent } from './documents/work-complete/work-complete.component';
import { LoginComponent } from './login/login.component';
import { BulkRegistorComponent } from './registration/bulk-registor/bulk-registor.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SubsidyCalculatorComponent } from './subsidy-calculator/subsidy-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //to view working scr
  { path: 'login', component: LoginComponent },
  {
    path: 'drips', component: SidenavComponent, canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegistrationComponent },
      { path: 'bulk-register', component: BulkRegistorComponent },
      { path: 'search', component: CustSearchComponent },
      { path: 'subs-calc', component: SubsidyCalculatorComponent },
      {
        path: 'docs', component: DocsViewComponent, children: [
          { path: 'sfmf', component: SfmfDocComponent },
          { path: 'verification', component: VerificationDocComponent },
          { path: 'pre', component: PreDocComponent },
          { path: 'wrk-complete', component: WorkCompleteComponent },
          { path: 'pmksy', component: PmksyDocComponent }
        ]
      },
      {
        path: 'admin', component: AccountSettingComponent, children: [
          { path: '', redirectTo: '/account', pathMatch: 'full' }, //to view working profile scr
          { path: 'account', component: AdminProfileComponent },
          { path: 'search', component: AdminSearchComponent },
          { path: 'edit', component: AccountSettingComponent },
          { path: 'new-reg', component: AdminProfileComponent },
          { path: 'sub-manage', component: AdminSearchComponent },
          { path: 'per-manage', component: PermissionManagerComponent }
        ]
      }
    ]
  },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
