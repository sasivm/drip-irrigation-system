import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() navbarRef: any = null;

  app_title: string = 'Drip Irrigation System';

  constructor() { }
}
