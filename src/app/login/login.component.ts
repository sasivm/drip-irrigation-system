import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableErrorMessage } from '../common/models/common-types';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() isUserLogged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private fb: FormBuilder, private _adminServ: AdminService, private _authService: AuthService) { }

  loginForm: FormGroup = this.fb.group({
    mail: ['demo@gmail.com'],
    password: ['123456']
  });

  errorMessage: string = '';

  isPwdVisible: boolean = false;

  validateLogin() {
    this.errorMessage = '';
    const adminLogin = this.loginForm.value;
    console.log('login', adminLogin);

    this._adminServ.validateAdminLogin(adminLogin).subscribe(response => {
      if (response && response.isSuccess) {
        try {
          this.validateLoginResponse(response);
          this.isUserLogged.emit(true);
          this.router.navigate(['drips/register']);
        } catch (error) {
          this.errorMessage = error + '';
        }
      } else {
        this.errorMessage = response.message;
      }
    }, error => {
      console.log('login error ', error);
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = error.message;
      }
    });
  }

  validateLoginResponse(response: any) {
    const adminRecord = response?.adminRec ?? null;
    if (adminRecord?.length === 1 && adminRecord[0]._id) {
      this._authService.storeAdminOnSession(adminRecord);
      this._authService.storeAuthTokenOnSession(response?.token);
    } else {
      console.log('admin record is not passed');
    }
  }
}