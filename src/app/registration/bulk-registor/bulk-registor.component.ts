import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-registor',
  templateUrl: './bulk-registor.component.html',
  styleUrls: ['./bulk-registor.component.scss']
})
export class BulkRegistorComponent {

  constructor() { }

  customerData: any[] = [];

  loadExcelData(data: any[]) {
    this.customerData = data;
    console.log('cust data reached parent...');
  }

}
