import { Component } from '@angular/core';
import { TableErrorMessage } from '../models/common-types';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent {

  constructor() { }

  /* Message variables */
  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

}
