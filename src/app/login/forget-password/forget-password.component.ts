import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private fb: FormBuilder) { }

  errorMessageList: string[] = [];

  forgetPasswordForm: FormGroup = this.fb.group({
    email: [''],
    firstName: [''],
    quez: ['']
  });

  validateRequest() {
    this.errorMessageList = [];
    const { email, firstName, quez } = this.forgetPasswordForm.value;
    if (!email || email.length < 5 || !email.includes('.') || !email.includes('@')) {
      this.errorMessageList.push('Enter valid mail id');
    }

    if (!firstName || firstName.length < 3) {
      this.errorMessageList.push('Enter valid First name');
    }

    if (!quez || !(quez.length === 5)) {
      this.errorMessageList.push('Enter valid answer for question');
    }

    if (this.errorMessageList.length > 0) {
      return;
    } else {

    }
  }

}
