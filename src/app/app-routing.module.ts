import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { RouterConstants } from './common/router-constants';

import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: RouterConstants.EMPTY_PATH, redirectTo: RouterConstants.EMPTY_REDIRECT_PATH, pathMatch: RouterConstants.PATH_MATCH_FULL }, //to view working scr
  { path: RouterConstants.LOGIN, component: LoginComponent },
  { path: RouterConstants.FORGET_PASSWORD, component: ForgetPasswordComponent },
  {
    path: RouterConstants.DRIP_MODEULE, canActivateChild: [AuthGuard],
    loadChildren: () => import('./modules/customer/customer.module').then((module) => module.CustomerModule)
  },
  { path: RouterConstants.INVALID_PATH_WILDCARD, redirectTo: RouterConstants.EMPTY_REDIRECT_PATH}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
