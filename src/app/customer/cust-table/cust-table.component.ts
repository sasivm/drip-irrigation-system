
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterConstants } from 'src/app/common/router-constants';
import { GlobalConstants } from '../../common/app.global-constant';
import { ExcelFileConstants } from '../../common/excelFile-constant';
import { TableErrorMessage } from '../../common/models/common-types';
import { BulkCustomerResponse } from '../../common/models/customer';
import { CustServiceService } from '../../services/cust-service.service';
import { CustTableBulkService } from '../../services/cust-table-bulk.service';

@Component({
  selector: 'app-cust-table',
  templateUrl: './cust-table.component.html',
  styleUrls: ['./cust-table.component.scss']
})
export class CustTableComponent implements AfterViewInit, OnChanges, OnInit {

  @ViewChild(MatPaginator) paginator: any;

  @Input() custDataArray: any[] = [];
  checkBoxArrayList: boolean[] = new Array(this.custDataArray.length).fill(false);
  selectedRecords: any[] = [];

  constructor(private _bulkService: CustTableBulkService, private _custService: CustServiceService, private router: Router,
    private datepipe: DatePipe, private route: ActivatedRoute) { }

  COL_NAME_TO_FIELD_NAME: any = ExcelFileConstants.EXCEL_FILE_COL_AND_FIELD_MAP;

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [];

  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  loadSpinner: boolean = false;

  ngOnInit() {
    this.displayedColumns = ['action', ...ExcelFileConstants.CUST_TABLE_VISIBLE_HEADERS];
  }

  ngAfterViewInit() {
    this.custDataSource.paginator = this.paginator;
  }

  saveCustRecReq(applicationId: string) {
    const isReqSaved: boolean = this._custService.setCustomerReqOnSession(applicationId);
    if (isReqSaved) {
      this.router.navigate([RouterConstants.BACK_TO_REGISTATION], { relativeTo: this.route });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('...Change detected');
    this.custDataSource = new MatTableDataSource();

    const custDataChange: SimpleChange = changes.custDataArray;
    if (custDataChange.currentValue) {
      this.custDataArray = custDataChange.currentValue;
      this.checkBoxArrayList = new Array((this.custDataArray.length - 1)).fill(false); // excluding header
      this.selectedRecords = [];
      this.loadCustomerDetailsToTable();
      this.resetMessages();
    }
    this.custDataSource.paginator = this.paginator;
  }

  setCheckBoxIdx(event: any, idx: number) {
    const isChecked = !!(event?.target && event.target?.checked);
    this.checkBoxArrayList[idx] = isChecked;
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
    }
  }

  getCustomerSelectedRecords(checkedList: boolean[]) {
    const result: any[] = [];
    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i] === true) {
        result.push(this.custDataSource.data[i]);
      }
    }
    return result;
  }

  prepareCustomerRecords(recordsList: any[]) {
    const surveyListsSplitExp: string = ' , ';
    const surveyDivsionSplitExp: string = '/';

    const custReqArr: any[] = [];
    for (let i = 0; i < recordsList.length; i++) {
      const custRec = { ...recordsList[i] };

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

  submitRecords(type: string = 'ALL') {
    if (this.custDataSource.data.length > 0) {
      this.loadSpinner = true;
      this.resetMessages();

      let custRequest: any[] = [];
      if (type === 'ALL') {
        custRequest = this.prepareCustomerRecords(this.custDataSource.data);
      } else {
        this.selectedRecords = this.getCustomerSelectedRecords(this.checkBoxArrayList);
        custRequest = this.prepareCustomerRecords(this.selectedRecords);
      }

      if (custRequest.length === 0) {
        return;
      }

      this._bulkService.sendBulkCustData(custRequest).subscribe((data: BulkCustomerResponse) => {
        if (data.isSuccess) {
          // this.displayedColumns.unshift('action');
          this.sucessMessage = data.message;
        } else {
          const resposeMessage: string = data.message || 'Failed while saving...'
          this.errorMessage.message = resposeMessage;

          if (data.invalidRecordAt > 0) {
            let invalid_appId = '';
            if (type === 'ALL') {
              invalid_appId = this.custDataSource.data[data.invalidRecordAt].applicationId;
            } else {
              invalid_appId = this.selectedRecords[data.invalidRecordAt - 1].applicationId;
            }
            this.errorMessage.desc = `Applicant Id ${invalid_appId} is already exist...`;
          }
        }
        this.loadSpinner = false;
      }, err => {
        console.log('Error from api', err);
        this.errorMessage.message = err.message;
        this.loadSpinner = false;
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
