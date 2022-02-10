import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { DatePipe } from '@angular/common';

// screen components
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { JvrDocComponent } from './documents/jvr-doc/jvr-doc.component';

// custom modules for application

@NgModule({
  declarations: [
    AppComponent, LoginComponent, ForgetPasswordComponent, JvrDocComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule, HttpClientModule,
    AppRoutingModule, SharedModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
