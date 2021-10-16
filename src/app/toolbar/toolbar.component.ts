import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() navbarRef: any = null;

  app_title: string = 'Drip Irrigation System | BHARATHI DRIPS';

  constructor() { }

  ngOnInit() {
    this.app_title += ` - (${environment?.envName})`;
  }
}
