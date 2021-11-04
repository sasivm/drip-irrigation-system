import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() isUserLogged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  validateLogin() {
    this.router.navigate(['/register']);
    this.isUserLogged.emit(true);
  }

}
