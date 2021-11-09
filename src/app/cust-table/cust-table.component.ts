
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/app.global-constant';
import { ExcelFileConstants } from '../common/excelFile-constant';
import { TableErrorMessage } from '../common/models/common-types';
import { BulkCustomerResponse } from '../common/models/customer';
import { CustServiceService } from '../services/cust-service.service';
import { CustTableBulkService } from '../services/cust-table-bulk.service';

@Component({
  selector: 'app-cust-table',
  templateUrl: './cust-table.component.html',
  styleUrls: ['./cust-table.component.scss']
})
export class CustTableComponent implements AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator: any;

  @Input() custDataArray: any[] = [];

  constructor(private _bulkService: CustTableBulkService, private _custService: CustServiceService, private router: Router,
    private datepipe: DatePipe) { }

  COL_NAME_TO_FIELD_NAME: any = ExcelFileConstants.EXCEL_FILE_COL_AND_FIELD_MAP;

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ExcelFileConstants.CUST_TABLE_VISIBLE_HEADERS;

  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  ngAfterViewInit() {
    this.custDataSource.paginator = this.paginator;
  }

  saveCustRecReq(applicationId: string) {
    const isReqSaved: boolean = this._custService.setCustomerReqOnSession(applicationId);
    if (isReqSaved) {
      this.router.navigate(['/register']);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('...Change detected');
    this.custDataSource = new MatTableDataSource();

    const custDataChange: SimpleChange = changes.custDataArray;
    if (custDataChange.currentValue) {
      this.custDataArray = custDataChange.currentValue;
      this.loadCustomerDetailsToTable();

      this.resetMessages();
    }

    this.custDataSource.paginator = this.paginator;
  }

  loadCustomerDetailsToTable() {

    for (let i = 1; i < this.custDataArray.length; i++) {
      const custRecord: any[] = this.custDataArray[i];
      const custRecObject: any = {};
      for (let j = 0; j < custRecord.length; j++) {
        const fieldName = ExcelFileConstants.EXCEL_HEADERS_FIELD_NAME[j];
        custRecObject[fieldName] = custRecord[j];
      }

      let date = custRecObject['workOrderDate'] ?? '';
      if (date) {
        date = ((date - 25569) * 24 * 60 * 60 * 1000);
        date = this.datepipe.transform(date, 'dd-MM-yyyy');
      }
      custRecObject['workOrderDate'] = date;

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

  prepareCustomerRecords() {
    const surveyListsSplitExp: string = ' , ';
    const surveyDivsionSplitExp: string = '/';

    const custReqArr: any[] = [];
    for (let i = 0; i < this.custDataSource.data.length; i++) {
      const custRec = { ...this.custDataSource.data[i] };

      const subDivList: any[] = [];
      const surveyNoList: any[] = [];
      const surveyList = custRec.surveyNo.split(surveyListsSplitExp);

      for (let j = 0; j < surveyList.length; j++) {
        const [survey_no, sub_div] = surveyList[j].split(surveyDivsionSplitExp);
        if (survey_no && survey_no?.trim()) {
          surveyNoList.push(survey_no);
        }
        if (sub_div && sub_div?.trim()) {
          subDivList.push(sub_div);
        }
      }

      const miLandRec: any = {};
      miLandRec['cropType'] = custRec.department;
      miLandRec['miType'] = custRec.irrigationType;

      const surveyCropRec: any = {};
      surveyCropRec['surveyNo'] = surveyNoList;
      surveyCropRec['subDivisionNo'] = subDivList;
      surveyCropRec['surveyAndSubDivNo'] = custRec.surveyNo;
      surveyCropRec['totalArea'] = custRec.totalArea;
      surveyCropRec['appliedArea'] = custRec.appliedArea;
      surveyCropRec['crop'] = custRec.crop;
      surveyCropRec['spacing'] = custRec.spacing;

      custRec['miLandRec'] = miLandRec;
      custRec['surveyCropRec'] = surveyCropRec;

      custReqArr.push(custRec);
    }
    return custReqArr;
  }

  bulkRegister() {
    if (this.custDataSource.data.length > 0) {
      this.resetMessages();
      const custRequest: any[] = this.prepareCustomerRecords();
      this._bulkService.sendBulkCustData(custRequest).subscribe((data: BulkCustomerResponse) => {
        if (data.isSuccess) {
          this.sucessMessage = data.message;
        } else {
          const resposeMessage: string = data.message || 'Failed while saving...'
          this.errorMessage.message = resposeMessage;

          if (data.invalidRecordAt > 0) {
            this.errorMessage.desc = `Record at ${data.invalidRecordAt} is not valid...`;
          }
        }
      }, err => {
        console.log('Error from api', err);
        this.errorMessage.message = err.message;
      });
    } else {
      this.errorMessage.message = GlobalConstants.CUST_TABLE_EMPTY;
    }
  }

  resetMessages() {
    this.errorMessage = { message: '', desc: '' };
    this.sucessMessage = '';
  }

}
