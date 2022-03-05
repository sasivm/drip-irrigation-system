import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingComponent } from 'src/app/admin/account-setting/account-setting.component';
import { RouterConstants } from 'src/app/common/router-constants';
import { AdminProfileComponent } from '../../admin/admin-profile/admin-profile.component';
import { AdminSearchComponent } from '../../admin/admin-search/admin-search.component';

const routes: Routes = [
  {
    path: RouterConstants.EMPTY_PATH, component: AccountSettingComponent, children: [
      { path: RouterConstants.EMPTY_PATH, redirectTo: '/account', pathMatch: RouterConstants.PATH_MATCH_FULL }, //to view working profile scr
      { path: RouterConstants.ADMIN_ACCOUNT, component: AdminProfileComponent },
      { path: RouterConstants.ADMIN_SEARCH, component: AdminSearchComponent },
      { path: RouterConstants.ADMIN_REGISTATION, component: AdminProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
