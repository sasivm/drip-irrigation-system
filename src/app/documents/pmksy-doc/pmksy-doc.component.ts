import { AfterContentInit, Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TableCell } from 'pdfmake/interfaces';
import { customTableCell } from 'src/app/common/models/common-types';
import { CustServiceService } from 'src/app/services/cust-service.service';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pmksy-doc',
  templateUrl: './pmksy-doc.component.html',
  styleUrls: ['./pmksy-doc.component.scss']
})
export class PmksyDocComponent implements AfterContentInit {

  constructor(private _dataServ: DataService, private _custService: CustServiceService) { }

  PMKSY_DOC_CUSTOMER_DATA = {
    applicationId: '',
    farmerName: '',
    fatherName: '',
    village: '',
    block: '',
    district: '',
    mobileNo: '',
    gender: '',
    socialStatus: '', // Category (Gen or SC)
    farmerType: '', // Farmer Category 
    crop: '',
    totalArea: '',
    appliedArea: '', // not sure about data // Field of irrigationExtent
    irrigationType: '',
    surveyAndSubDivNo: '',
    spacing: '',
    workOrderDate: '',
    miCompany: '',
    aadhaarNo: ''
  };

  Table_Title: TableCell[] = ['', { text: 'Particulars', style: 'fillTextContent' }, ''];

  DOC_HEADER_CONTENT: Content = [];

  DOC_FOOTER_CONTENT: Content = {
    style: 'pmksyFooter',
    layout: 'noBorders',
    table: {
      body: [
        [
          { text: 'ADA / ADH' },
          { text: 'AO / HO' }
        ]
      ],
      widths: ['*', '*']
    }
  };

  COLOUMN1_CONTENT: customTableCell = {
    'APPLICATION_TYPE_01': { text: 'New Registration', style: '' },
    'TANHODA_NO_02': { text: 'TANHODA NO', style: '' },
    'F_AADHAR_NO_03': { text: 'Aadhar No', style: '' },
    'F_NAME_04': { text: 'Name', style: '' },
    'F_ADDRESS_05': { text: 'Address of the farmer', style: '' },
    'CONTACT_NO_06': { text: 'Contact no', style: '' },
    'GENDER_07': { text: 'Gender (Male or Female)', style: '' },
    'CATEGORY_08': { text: 'Category (Gen or SC)', style: '' },
    'F_CATEGORY_09': this._mergeColToCell({ text: 'Farmer Category' }, { text: '(75/100)', style: ['redText', 'boldText'] }),
    'CROP_10': { text: 'Crop', style: '' },
    'TOTAL_AREA_11': this._mergeColToCell({ text: 'Total area' }, { text: '(ha)', style: ['redText', 'boldText'] }),
    'I_EXTENT_12': this._mergeColToCell({ text: 'Irrigation extent' }, { text: '(ha)', style: ['redText', 'boldText'] }),
    'I_TYPE_13': { text: 'Irrigation Type', style: '' },
    'SURVEY_NO_14': { text: 'Survey Number', style: '' },
    'L_SPACING_15': this._mergeColToCell({ text: 'Lateral spacing' }, { text: '(m)', style: ['redText', 'boldText'] }),
    'W_ORDER_DATE_16': { text: 'Work order date', style: '' },
    'W_COMP_DATE_17': { text: 'Work completion date', style: '' },
    'INV_NO_DATE_18': { text: 'Invoice number and date', style: '' },
    'T_INV_AMT_19': this._mergeColToCell({ text: 'Total invoice amount' }, { text: '(Rs.)', style: 'boldText' }),
    'T_SUBSIDY_20': this._mergeColToCell({ text: 'Total eligible subsidy' }, { text: '(Rs.)', style: 'boldText' }),
    'SUBSIDY_RELEASED_21': this._mergeColToCell({ text: 'Subsidy already released' }, { text: '60%', style: 'boldText' }),
    'BAL_SUBSIDY_REL_22': { text: 'Balance subsidy now recommended for release', style: '' },
    'COMPANY_NAME_23': { text: 'Name of the company', style: '' }
  };

  DOC_BODY_CONTENTS: Content = [];
  FULL_DOC_CONTENT_ARRAY: Content[] = [];

  TABLE_CONTENT: Content = [];

  ngAfterContentInit() {
    /* mapping customer data to doc object */
    this.mapCustomerDataToDocObject();

    /* construct table content for bdf with doc object data */
    this.constructTableContent();
    this.constructPDFFullBody();
    this.generatePDF();
  }

  mapCustomerDataToDocObject() {
    const customerRecord = this._custService.getLoadedCustomerRecord()[0];
    if (customerRecord && customerRecord?.applicationId) {
      this._dataServ.mapCustomerDataToObject(this.PMKSY_DOC_CUSTOMER_DATA, customerRecord, true); // 3rd param for Survey and SubDiv Number

    }

    console.log('pmksy rec', this.PMKSY_DOC_CUSTOMER_DATA);
  }

  generatePDF() {
    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY);
  }

  constructPDFFullBody() {
    this.DOC_BODY_CONTENTS = [this.TABLE_CONTENT];

    this.FULL_DOC_CONTENT_ARRAY = [
      this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
    ];
  }

  constructTableContent() {
    const { fatherName, village, block, district } = this.PMKSY_DOC_CUSTOMER_DATA;
    let FARMER_FULL_ADDRESS = '';
    if (fatherName && village && block && district) {
      FARMER_FULL_ADDRESS = `S/o, ${fatherName}, ${village}, ${block}, ${district}.`;
    }

    this.DOC_HEADER_CONTENT = [
      { text: `Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) - ${this.getPMKSYYear(this.PMKSY_DOC_CUSTOMER_DATA.applicationId)}`, style: 'docHeadTitle_Normal' },
      { text: 'Abstract', style: ['docHeadTitle_Normal', 'redText'], margin: [0, 0, 0, 30] }// R T L B
    ];

    this.TABLE_CONTENT = {
      // style: ['rowLineContent'],
      fontSize: 10,
      margin: [40, 0, 0, 0],
      table: {
        body: [
          this.Table_Title,
          [1, this.COLOUMN1_CONTENT.APPLICATION_TYPE_01, { text: 'New Registration', style: 'AbstractCol3' }],
          [2, this.COLOUMN1_CONTENT.TANHODA_NO_02, { text: this.PMKSY_DOC_CUSTOMER_DATA.applicationId, style: ['AbstractCol3', 'redText'] }],
          [3, this.COLOUMN1_CONTENT.F_AADHAR_NO_03, { text: this.PMKSY_DOC_CUSTOMER_DATA.aadhaarNo, style: 'AbstractCol3' }],
          [4, this.COLOUMN1_CONTENT.F_NAME_04, { text: this.PMKSY_DOC_CUSTOMER_DATA.farmerName, style: ['AbstractCol3', 'boldText'] }],
          [5, this.COLOUMN1_CONTENT.F_ADDRESS_05, { text: FARMER_FULL_ADDRESS, style: 'AbstractCol3' }],
          [6, this.COLOUMN1_CONTENT.CONTACT_NO_06, { text: this.PMKSY_DOC_CUSTOMER_DATA.mobileNo, style: 'AbstractCol3' }],
          [7, this.COLOUMN1_CONTENT.GENDER_07, { text: this.PMKSY_DOC_CUSTOMER_DATA.gender, style: 'AbstractCol3' }],
          [8, this.COLOUMN1_CONTENT.CATEGORY_08, { text: this.PMKSY_DOC_CUSTOMER_DATA.socialStatus, style: 'AbstractCol3' }],
          [9, this.COLOUMN1_CONTENT.F_CATEGORY_09, { text: this.PMKSY_DOC_CUSTOMER_DATA.farmerType, style: 'AbstractCol3' }],
          [10, this.COLOUMN1_CONTENT.CROP_10, { text: this.PMKSY_DOC_CUSTOMER_DATA.crop, style: 'AbstractCol3' }],
          [11, this.COLOUMN1_CONTENT.TOTAL_AREA_11, { text: this.PMKSY_DOC_CUSTOMER_DATA.totalArea, style: 'AbstractCol3' }],
          [12, this.COLOUMN1_CONTENT.I_EXTENT_12, { text: this.PMKSY_DOC_CUSTOMER_DATA.appliedArea, style: 'AbstractCol3' }],
          [13, this.COLOUMN1_CONTENT.I_TYPE_13, { text: this.PMKSY_DOC_CUSTOMER_DATA.irrigationType, style: 'AbstractCol3' }],
          [14, this.COLOUMN1_CONTENT.SURVEY_NO_14, { text: this.PMKSY_DOC_CUSTOMER_DATA.surveyAndSubDivNo, style: 'AbstractCol3' }],
          [15, this.COLOUMN1_CONTENT.L_SPACING_15, { text: this.PMKSY_DOC_CUSTOMER_DATA.spacing, style: 'AbstractCol3' }],
          [16, this.COLOUMN1_CONTENT.W_ORDER_DATE_16, { text: this.PMKSY_DOC_CUSTOMER_DATA.workOrderDate, style: 'AbstractCol3' }],
          [17, this.COLOUMN1_CONTENT.W_COMP_DATE_17, { text: '', style: 'AbstractCol3' }],
          [18, this.COLOUMN1_CONTENT.INV_NO_DATE_18, { text: '', style: 'AbstractCol3' }],
          [19, this.COLOUMN1_CONTENT.T_INV_AMT_19, { text: '', style: 'AbstractCol3' }],
          [20, this.COLOUMN1_CONTENT.T_SUBSIDY_20, { text: '', style: 'AbstractCol3' }],
          [21, this.COLOUMN1_CONTENT.SUBSIDY_RELEASED_21, { text: '', style: 'AbstractCol3' }],
          [22, this.COLOUMN1_CONTENT.BAL_SUBSIDY_REL_22, { text: '', style: 'AbstractCol3' }],
          [23, this.COLOUMN1_CONTENT.COMPANY_NAME_23, { text: this.PMKSY_DOC_CUSTOMER_DATA.miCompany.toUpperCase(), style: 'columnCompanyMark' }]
        ], widths: ['3%', '45%', '40%']
      }
    };
  }

  _mergeColToCell(colSpan1: TableCell, colSpan2: TableCell): Content {
    const mergedCell: Content = {
      layout: 'noBorders',
      table: {
        body: [[colSpan1, colSpan2]]
      }
    };

    return mergedCell;
  }

  getPMKSYYear(applicationId: string) {
    const appId = applicationId.trim();
    const result = appId.slice(-7);
    return result;
  }
}
