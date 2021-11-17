import { Component } from '@angular/core';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent {

  newAdminQueryParam: any = {
    new: true
  };

  constructor() { }

}
