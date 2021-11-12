import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private fb: FormBuilder, private _adminServ: AdminService, private _authService: AuthService) { }

  loginForm: FormGroup = this.fb.group({
    mail: ['demo@gmail.com'],
    password: ['123456']
  });

  isLoading: boolean = false;

  errorMessage: string = '';

  isPwdVisible: boolean = false;

  validateAdminLogin() {
    const { mail, password } = this.loginForm.value;
    let errorMessage = '';
    if (!mail && !password) {
      errorMessage = 'Email and Password are required.';
    } else if (!mail?.trim()) {
      errorMessage = 'Email is required.';
    } else if (!password?.trim()) {
      errorMessage = 'Password is required.';
    }

    this.errorMessage = errorMessage;
    if (errorMessage) {
      return false;
    }
    const length = mail.length;
    if (length < 5 || !(mail.includes('.') && mail.includes('@'))) {
      errorMessage = 'Enter valid Email address.';
    } else if (password.length < 6) {
      errorMessage = 'Enter valid Pasword.';
    }

    this.errorMessage = errorMessage;
    if (errorMessage) {
      return false;
    }

    return true;
  }

  submitAdminLogin() {
    this.errorMessage = '';
    const isValid = this.validateAdminLogin();
    if (!isValid) {
      return;
    }

    const adminLogin = this.loginForm.value;
    this.isLoading = true;

    this._adminServ.validateAdminLogin(adminLogin).subscribe(response => {
      if (response && response.isSuccess) {
        try {
          this.validateLoginResponse(response);
          this.router.navigate(['drips/register']);
        } catch (error) {
          this.errorMessage = error + '';
        }
      } else {
        this.errorMessage = response.message;
      }
      this.isLoading = false;
    }, error => this.loginErrorHandling(error));
  }

  loginErrorHandling(error: any) {
    console.log('login error: ', error);
    if (error instanceof HttpErrorResponse) {
      const statusCode = error.status;
      if (error.ok === false && (statusCode === 0 || statusCode === 404)) {
        this.errorMessage = 'It looks like application serve is down right now. Please try again after sometimes.';
        if (statusCode === 0 && !(this.isInternetAvailable())) {
          this.errorMessage = `It seems your internet connetion is down. Please try to reload the application.`;
        }
      }
      else if (error?.error?.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = error.message
      }
    } else {
      this.errorMessage = error.message;
    }
    this.isLoading = false;
  }

  isInternetAvailable(): boolean {
    return (window.navigator.onLine)
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