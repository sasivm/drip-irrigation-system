import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingComponent } from 'src/app/admin/account-setting/account-setting.component';
import { AdminProfileComponent } from '../../admin/admin-profile/admin-profile.component';
import { AdminSearchComponent } from '../../admin/admin-search/admin-search.component';
import { PermissionManagerComponent } from '../../admin/permission-manager/permission-manager.component';

const routes: Routes = [
  {
    path: '', component: AccountSettingComponent, children: [
      { path: '', redirectTo: '/account', pathMatch: 'full' }, //to view working profile scr
      { path: 'account', component: AdminProfileComponent },
      { path: 'search', component: AdminSearchComponent },
      { path: 'edit', component: AccountSettingComponent },
      { path: 'new-reg', component: AdminProfileComponent },
      { path: 'sub-manage', component: AdminSearchComponent },
      { path: 'per-manage', component: PermissionManagerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
