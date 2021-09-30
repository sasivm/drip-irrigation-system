
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelFileConstants } from '../common/excelFile-constant';

@Component({
  selector: 'app-cust-table',
  templateUrl: './cust-table.component.html',
  styleUrls: ['./cust-table.component.scss']
})
export class CustTableComponent implements AfterViewInit, OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: any;

  @Input() custDataArray: any[] = [];

  constructor() { }

  COL_NAME_TO_FIELD_NAME: any = ExcelFileConstants.EXCEL_FILE_COL_AND_FIELD_MAP;

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ExcelFileConstants.CUST_TABLE_VISIBLE_HEADERS;

  ngOnInit() {
    this.loadCustomerDetailsToTable();
  }

  ngAfterViewInit() {
    this.custDataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('...Change detected');
    this.custDataSource = new MatTableDataSource();

    const custDataChange: SimpleChange = changes.custDataArray;
    if (custDataChange.currentValue) {
      this.custDataArray = custDataChange.currentValue;
      this.loadCustomerDetailsToTable();
    }
    
    this.custDataSource.paginator = this.paginator;
  }

  loadCustomerDetailsToTable() {

    for (let i = 1; i < this.custDataArray.length; i++) {
      const custRecord: any[] = this.custDataArray[i];
      const custRecObject: any = {};
      for (let j = 0; j < custRecord.length; j++) {
        custRecObject[ExcelFileConstants.EXCEL_HEADERS_FIELD_NAME[j]] = custRecord[j];
      }
      this.custDataSource.data.push(custRecObject);
      // console.log('customer obj', custRecObject);
    }

    // console.log('heders', this.displayedColumns);
    // console.log('data', this.custDataSource.data);
    // console.log('Excel Array', this.custDataArray);

  }

  selectedRow(idx: number) {
    console.log(this.custDataSource.data[idx]);
  }

}
