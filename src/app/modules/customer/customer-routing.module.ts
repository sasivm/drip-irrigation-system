import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { CustSearchComponent } from 'src/app/customer/cust-search/cust-search.component';
import { BulkRegistorComponent } from 'src/app/customer/registration/bulk-registor/bulk-registor.component';
import { RegistrationComponent } from 'src/app/customer/registration/registration.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegistrationComponent },
      { path: 'bulk-register', component: BulkRegistorComponent },
      { path: 'search', component: CustSearchComponent },
      {
        path: 'subs-calc',
        loadChildren: () => import('./subsidy/subsidy.module').then((module) => module.SubsidyModule)
      },
      {
        path: 'docs',
        loadChildren: () => import('./documents/documents.module').then((module) => module.DocumentsModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then((module) => module.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
