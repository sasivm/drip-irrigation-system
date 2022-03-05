import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { CustSearchComponent } from 'src/app/customer/cust-search/cust-search.component';
import { BulkRegistorComponent } from 'src/app/customer/registration/bulk-registor/bulk-registor.component';
import { RegistrationComponent } from 'src/app/customer/registration/registration.component';
import { RouterConstants } from 'src/app/common/router-constants';

const routes: Routes = [
  {
    path: RouterConstants.EMPTY_PATH, component: SidenavComponent, children: [
      { path: RouterConstants.EMPTY_PATH, redirectTo: RouterConstants.REGISTERATION, pathMatch: RouterConstants.PATH_MATCH_FULL },
      { path: RouterConstants.REGISTERATION, component: RegistrationComponent },
      { path: RouterConstants.BULK_REGISTERATION, component: BulkRegistorComponent },
      { path: RouterConstants.CUST_SEARCH, component: CustSearchComponent },
      {
        path: RouterConstants.DOCS_MODEULE,
        loadChildren: () => import('./documents/documents.module').then((module) => module.DocumentsModule)
      },
      {
        path: RouterConstants.ADMIN_MODEULE,
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
