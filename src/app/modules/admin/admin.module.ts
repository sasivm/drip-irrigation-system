import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingComponent } from 'src/app/admin/account-setting/account-setting.component';
import { AdminProfileComponent } from 'src/app/admin/admin-profile/admin-profile.component';
import { AdminSearchComponent } from 'src/app/admin/admin-search/admin-search.component';
import { PermissionManagerComponent } from 'src/app/admin/permission-manager/permission-manager.component';

@NgModule({
  declarations: [
    AdminSearchComponent,
    AccountSettingComponent,
    AdminProfileComponent,
    PermissionManagerComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
