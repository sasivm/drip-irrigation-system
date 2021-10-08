
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/app.global-constant';
import { ExcelFileConstants } from '../common/excelFile-constant';
import { TableErrorMessage } from '../common/models/common-types';
import { CustServiceService } from '../services/cust-service.service';
import { CustTableBulkService } from '../services/cust-table-bulk.service';

@Component({
  selector: 'app-cust-table',
  templateUrl: './cust-table.component.html',
  styleUrls: ['./cust-table.component.scss']
})
export class CustTableComponent implements AfterViewInit, OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: any;

  @Input() custDataArray: any[] = [];

  constructor(private _bulkService: CustTableBulkService, private _custService: CustServiceService, private router: Router) { }

  COL_NAME_TO_FIELD_NAME: any = ExcelFileConstants.EXCEL_FILE_COL_AND_FIELD_MAP;

  dummyData = [
    [
      "Srl No",
      "Year",
      "Application Id",
      "Farmer Name",
      "Father Name",
      "Caste",
      "Mobile",
      "Work Order Date",
      "Work Order No",
      "District",
      "Block",
      "Village",
      "Crop",
      "Spacing",
      "Survey No / Subdivision No",
      "Total Area (Ha)",
      "Applied Area (Ha)",
      "Department",
      "Irrigation Type",
      "Sprinkler Type",
      "Sprinkler Spacing",
      "Sugar Mill",
      "Sugar Drip Type",
      "Sugar Well Type",
      "MI Company",
      "MI Referrence No",
      "Dealer Name",
      "Farmer Type",
      "Quotation Subsidy Amount (Rs) 100%",
      "Farmer Contribution (Rs) 25%",
      "Invoice Date",
      "Invoice Amount (Rs) 100%",
      "State Restricted Amount (Rs) 100%",
      "First Fund Released (Lakhs)",
      "Proceeding No",
      "First Fund UTR No",
      "First Fund UTR Date",
      "AE Restricted Amount (Rs) 100%",
      "Bank Gaurantee Deducted (%)",
      "Bank Gaurantee Deducted Amount",
      "Second Fund Released (Lakhs)",
      "Second Fund UTR No",
      "Second Fund UTR Date",
      "Total Fund Released (Lakhs)",
      "Current Status",
      "Current Status Date",
      "Current Status Remarks"
    ],
    [
      1,
      "2021-2022",
      "A-TPR-gdm-6815035675-2021-22",
      "Selvaraj",
      "Mayilsamy",
      "Other Caste",
      9976542473,
      null,
      null,
      "Tiruppur",
      "Gudimangalam",
      "Moongiltholuvu",
      "maize",
      "<1.2m*0.6m",
      "",
      1.69,
      1.6,
      "Agriculture",
      "Drip",
      null,
      null,
      null,
      null,
      null,
      "Vedanta Irrigation system Pvt Ltd.",
      "VED-gdm-4-2021",
      "Sakthi Velavan Agencies",
      "SF / MF",
      171739.51,
      294,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "Pre Inspection Approved",
      "17-08-2021 02:37:05 PM",
      "Approved"
    ],
    [
      2,
      "2021-2022",
      "A-TPR-gdm-4121435605-2021-22",
      "SAKTHIVEL AND PECHIAMMAL",
      "KALIYAPPAGOUNDER",
      "Other Caste",
      6379768677,
      44406,
      "TPR/gdm/408337/2021-22",
      "Tiruppur",
      "Gudimangalam",
      "Thottampatti",
      "maize",
      "1.2m*0.6m",
      "192/3C , 192/3E",
      1.09,
      1.04,
      "Agriculture",
      "Drip",
      null,
      null,
      null,
      null,
      null,
      "Vedanta Irrigation system Pvt Ltd.",
      21,
      "Bharathi Drips",
      "SF / MF",
      117164.08,
      34368.22,
      44435,
      117164.08,
      0,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "First Fund Release Recommended by District Office",
      "13-09-2021 01:27:30 PM",
      "REVERTED WRONGLY ENTERED BVL AREA"
    ]
  ];

  custDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ExcelFileConstants.CUST_TABLE_VISIBLE_HEADERS;

  sucessMessage: string = '';
  errorMessage: TableErrorMessage = {
    message: '',
    desc: ''
  };

  ngOnInit() {
    // this.custDataArray = this.dummyData;
    this.loadCustomerDetailsToTable();
  }

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
        if (survey_no !== null && survey_no !== undefined && survey_no !== NaN && survey_no !== '' && survey_no !== ' ') {
          surveyNoList.push(survey_no);
        }
        if (sub_div !== null && sub_div !== undefined && sub_div !== NaN && sub_div !== '' && sub_div !== ' ') {
          subDivList.push(sub_div);
        }
      }


      const miLandRec: any = {};
      miLandRec['cropType'] = custRec.department;
      miLandRec['miType'] = custRec.irrigationType;

      const surveyCropRec: any = {};
      surveyCropRec['surveyNo'] = surveyNoList;
      surveyCropRec['subDivisionNo'] = subDivList;
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
      this._bulkService.sendBulkCustData(custRequest).subscribe((data: any) => {
        if (data.isSuccess) {
          this.sucessMessage = data.message;
        } else {
          this.errorMessage.message = data.message;
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
