import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CustTableComponent } from '../../customer/cust-table/cust-table.component';
import { CustSearchComponent } from '../../customer/cust-search/cust-search.component';
import { ApplicantRegComponent } from '../../customer/registration/applicant-reg/applicant-reg.component';
import { BulkRegistorComponent } from '../../customer/registration/bulk-registor/bulk-registor.component';
import { LandCropDetailsComponent } from '../../customer/registration/land-crop-details/land-crop-details.component';
import { MiLandDetailsComponent } from '../../customer/registration/mi-land-details/mi-land-details.component';
import { RegTypeComponent } from '../../customer/registration/reg-type/reg-type.component';
import { RegistrationComponent } from '../../customer/registration/registration.component';
import { UploadCustDataComponent } from '../../customer/registration/upload-cust-data/upload-cust-data.component';

import { LoggedMenuInfoComponent } from 'src/app/admin/logged-menu-info/logged-menu-info.component';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { ToolbarComponent } from 'src/app/sidenav/toolbar/toolbar.component';

@NgModule({
  declarations: [
    CustTableComponent, RegistrationComponent, RegTypeComponent,
    ApplicantRegComponent, BulkRegistorComponent, CustSearchComponent,
    LandCropDetailsComponent, MiLandDetailsComponent, UploadCustDataComponent,
    SidenavComponent, ToolbarComponent, LoggedMenuInfoComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
