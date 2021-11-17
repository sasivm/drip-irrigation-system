import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private _adminServ: AdminService,
    private _authService: AuthService, private route: ActivatedRoute) { }

  loginForm: FormGroup = this.fb.group({
    mail: ['admin.sasikumar.drip@gmail.com'],
    password: ['admin@123#']
  });

  isLoading: boolean = false;
  showPswModal: boolean = false;

  errorMessage: string = '';

  isPwdVisible: boolean = false;

  logoutMessage: string = 'You successfully logged out now.';

  isLoggedOut: boolean = false;

  ngOnInit() {
    const isUserLoggedOut = this.route.snapshot.queryParamMap.get('loggedOut');
    if (isUserLoggedOut) {
      this.isLoggedOut = (isUserLoggedOut === 'true');
    }

    if (!this.isLoggedOut && environment.envName === 'prod') {
      this.showPswModal = true;
    }
  }

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
    this.isLoggedOut = false;

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
          this.isLoggedOut = true; // just showing message while lazy loading
          this.logoutMessage = 'Login verified successfully';
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