import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegistrationComponent } from './registration/registration.component';
import { QuotationComponent } from './quotation/quotation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerateFormsComponent } from './generate-forms/generate-forms.component';
import { LoginComponent } from './login/login.component';
import { LandCropDetailsComponent } from './registration/land-crop-details/land-crop-details.component';
import { MiLandDetailsComponent } from './registration/mi-land-details/mi-land-details.component';
import { UploadCustDataComponent } from './registration/upload-cust-data/upload-cust-data.component';
import { SubsidyCalculatorComponent } from './subsidy-calculator/subsidy-calculator.component';
import { ComponentBCalcComponent } from './subsidy-calculator/component-b-calc/component-b-calc.component';
import { ComponentACalcComponent } from './subsidy-calculator/component-a-calc/component-a-calc.component';
import { DocsViewComponent } from './documents/docs-view.component';
import { SfmfDocComponent } from './documents/sfmf-doc/sfmf-doc.component';
import { VerificationDocComponent } from './documents/verification-doc/verification-doc.component';
import { BulkRegistorComponent } from './registration/bulk-registor/bulk-registor.component';
import { RegTypeComponent } from './registration/reg-type/reg-type.component';
import { CustTableComponent } from './cust-table/cust-table.component';
import { ApplicantRegComponent } from './registration/applicant-reg/applicant-reg.component';
import { ErrorMsgComponent } from './common/error-msg/error-msg.component';
import { CustSearchComponent } from './cust-search/cust-search.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    RegistrationComponent,
    QuotationComponent,
    DashboardComponent,
    GenerateFormsComponent,
    LoginComponent,
    LandCropDetailsComponent,
    MiLandDetailsComponent,
    UploadCustDataComponent,
    SubsidyCalculatorComponent,
    ComponentBCalcComponent,
    ComponentACalcComponent,
    DocsViewComponent,
    SfmfDocComponent,
    VerificationDocComponent,
    BulkRegistorComponent,
    RegTypeComponent,
    CustTableComponent,
    ApplicantRegComponent,
    ErrorMsgComponent,
    CustSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule, HttpClientModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatListModule, MatTabsModule, MatRadioModule, MatCheckboxModule, MatStepperModule,
    MatTableModule, MatPaginatorModule, MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
