import { AfterContentInit, Component } from '@angular/core';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TableCell } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { CustServiceService } from 'src/app/services/cust-service.service';
import { DataService } from 'src/app/services/data.service';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-jvr-doc',
  templateUrl: './jvr-doc.component.html',
  styleUrls: ['./jvr-doc.component.scss']
})
export class JvrDocComponent implements AfterContentInit {

  constructor(private _dataServ: DataService, private _custService: CustServiceService) { }

  JVR_DOC_CUSTOMER_DATA = {
    applicationId: '',
    farmerName: '',
    village: '',
    block: '',
    district: '',
    surveyNo: '',
    totalArea: '',
    irrigationType: '',
    spacing: '',
    miCompany: '',
    // Emitter(LPM)
    crop: ''
  };

  DOC_HEADER_CONTENT: Content = [
    { text: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)', style: 'jvr_header_title' },
    { text: 'Joint Verification Report for Completed Field Report(DRIP)', style: 'jvr_header_title', margin: [0, 0, 0, 5] } // R T L B
  ];
  DOC_FOOTER_CONTENT: Content = [];
  DOC_BODY_CONTENTS: Content = [];
  FULL_DOC_CONTENT_ARRAY: Content[] = [];

  Table_Header_Row: TableCell[] = [
    { text: 'SI. No', style: 'fillTextContent' }, { text: 'Particulars', style: 'fillTextContent' },
    { text: 'Size', style: 'fillTextContent' }, { text: 'NO / M', style: 'fillTextContent' },
    { text: ' Total Quantity', style: 'fillTextContent' }
  ];
  TABLE_CONTENT: Content = [];
  CUSTOMER_DETAILS_SECTION: Content[] = [];
  ACKNOWLEDGE_LINES: Content[] = [
    {
      layout: 'noBorders',
      style: 'rowLineContent',
      fontSize: 10,
      table: {
        body: [
          [
            { text: '1. The above quantities are jointly verified and certified that the quantities are correct.' }
          ],
          [
            { text: '2. The above measurement have been recorded in the page no._______To_______ of M book no. __________' }
          ]
        ]
      }
    }
  ];

  ngAfterContentInit(): void {
    this.mapCustomerDataToDocObject();
    this.constructTableContent();
    this.generateFooterContent();
    this.constructPDFFullBody();
    this.generatePDF();
  }

  constructTableContent() {
    this.generateCustomerSection();
    this.TABLE_CONTENT = {
      fontSize: 10,
      style: 'textCenter',
      margin: [0, 5, 0, 5], // R T L B
      table: {
        body: [
          this.Table_Header_Row,
          [{ text: '1' }, { text: 'Filter (Sand / Disc / Screen)' }, { text: '50/40/30/25/20m3/I' }, { text: 'No' }, { text: '' }],
          [{ text: '2' }, { text: 'Ventury & manifold' }, { text: '1.5 / 2 / 2.5"' }, { text: 'No' }, { text: '' }],
          [{ text: '3' }, { text: 'Air release Valve' }, { text: '1.5 / 2 / 2.5"' }, { text: 'No' }, { text: '' }],
          [{ text: '4' }, { text: 'Non Return Valve' }, { text: '1.5 / 2 / 2.5"' }, { text: 'No' }, { text: '' }],
          [{ text: '5' }, { text: 'By-pass Assembly' }, { text: '1.5 / 2 / 2.5"' }, { text: 'No' }, { text: '' }],
          [{ text: '6' }, { text: 'PVC Pipe' }, { text: '90 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '7' }, { text: 'PVC Pipe' }, { text: '75 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '8' }, { text: 'PVC Pipe' }, { text: '63 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '9' }, { text: 'PVC Pipe' }, { text: '50 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '10' }, { text: 'Lateral' }, { text: '16 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '11' }, { text: 'Emitting Pipe' }, { text: '16 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '12' }, { text: 'Emitting Pipe' }, { text: '12 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '13' }, { text: 'Lateral' }, { text: '12 mm' }, { text: 'M' }, { text: '' }],
          [{ text: '14' }, { text: 'Emitter / Dripper' }, { text: '2/4/8' }, { text: 'No' }, { text: '' }],
          [{ text: '15' }, { text: 'Control Valve' }, { text: '50 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '16' }, { text: 'Control Valve' }, { text: '63 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '17' }, { text: 'Control Valve' }, { text: '75 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '18' }, { text: 'Control Valve' }, { text: '90 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '19' }, { text: 'Flush Valve' }, { text: '75 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '20' }, { text: 'Flush Valve' }, { text: '63 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '21' }, { text: 'Flush Valve' }, { text: '50 mm' }, { text: 'No' }, { text: '' }],
          [{ text: '22' }, { text: 'Throttle Valve' }, { text: '1.5 / 2 / 2.5"' }, { text: 'No' }, { text: '' }],
          [{ text: '23' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }],
          [{ text: '24' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }],
          [{ text: '25' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]
        ],
        widths: ['10%', '30%', '25%', '15%', '*']
      }
    };
  }

  generateFooterContent() {
    this.DOC_FOOTER_CONTENT = [
      {
        style: 'pmksyFooter',
        layout: 'noBorders',
        fontSize: 10,
        margin: [0, 30, 0, 0],// R T L B
        table: {
          body: [
            [
              { text: 'JE/AE (AED)' },
              { text: 'ADA/ADH' },
              { text: 'AO/HO' },
              { text: 'AAO/AHO' }
            ]
          ],
          widths: ['*', '*', '*', '*']
        }
      },
      {
        style: 'pmksyFooter',
        layout: 'noBorders',
        fontSize: 10,
        margin: [0, 40, 0, 0],// R T L B
        table: {
          body: [
            [{ text: 'FARMER REPRESENT' }, { text: 'MI FIRM' , margin: [0, 0 , 30, 0]}],
            [{ text: '' }, { text: this.JVR_DOC_CUSTOMER_DATA.miCompany.toUpperCase() , fontSize: 9, margin: [0, 0 , 30, 0]}]
          ],
          widths: ['*', '*']
        }
      }
    ];
  }

  generateCustomerSection() {
    this.CUSTOMER_DETAILS_SECTION = [
      {
        layout: 'noBorders',
        style: 'rowLineContent',
        fontSize: 9,
        table: {
          body: [
            [
              { text: 'Farmer Name', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.farmerName}`, style: ['jvr_rightColumnTxt', 'boldText'] },
              { text: 'Reg.no', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.applicationId}`, style: ['jvr_rightColumnTxt', 'boldText'] }
            ],
            [
              { text: 'Village', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.village}`, style: 'jvr_rightColumnTxt' },
              { text: 'Irrigation System', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.irrigationType}`, style: 'jvr_rightColumnTxt' }
            ],
            [
              { text: 'Taluk', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.block}`, style: 'jvr_rightColumnTxt' },
              { text: 'Lateral Spacing', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.spacing}`, style: 'jvr_rightColumnTxt' }
            ],
            [
              { text: 'District', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.district}`, style: 'jvr_rightColumnTxt' },
              { text: 'Emitter(LPM)', style: 'jvr_leftColumnTxt' }, { text: `:   `, style: 'jvr_rightColumnTxt' }
            ],
            [
              { text: 'Survey Number', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.surveyNo}`, style: 'jvr_rightColumnTxt' },
              { text: 'Irrigation Source', style: 'jvr_leftColumnTxt' }, { text: `:   `, style: 'jvr_rightColumnTxt' }
            ],
            [
              { text: 'Area', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.totalArea}`, style: 'jvr_rightColumnTxt' },
              { text: 'Crop', style: 'jvr_leftColumnTxt' }, { text: `:   ${this.JVR_DOC_CUSTOMER_DATA.crop}`, style: 'jvr_rightColumnTxt' }
            ],
            [
              { text: 'Date of Inspection', style: 'jvr_leftColumnTxt' }, { text: ': ', }, { text: '' }, { text: '' }
            ],
          ],
          widths: ['20%', '30%', '20%', '30%']
        }
      }
    ]
  }

  mapCustomerDataToDocObject() {
    const customerRecord = this._custService.getLoadedCustomerRecord()[0];
    if (customerRecord && customerRecord?.applicationId) {
      this._dataServ.mapCustomerDataToObject(this.JVR_DOC_CUSTOMER_DATA, customerRecord); // 3rd param for Survey and SubDiv Number
    }

    this.JVR_DOC_CUSTOMER_DATA.surveyNo = this.getFirstSurveyAndDivNumber(customerRecord);
    console.log('jvr rec', this.JVR_DOC_CUSTOMER_DATA);
  }

  getFirstSurveyAndDivNumber(customerRecord: any) {
    if (customerRecord && customerRecord?.surveyCropRec && customerRecord?.surveyCropRec.surveyAndSubDivNo) {
      const subDivArray = customerRecord?.surveyCropRec.surveyAndSubDivNo.split(',');
      return subDivArray[0] ?? '';
    }

    return '';
  }

  generatePDF() {
    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY);
  }

  constructPDFFullBody() {
    this.DOC_BODY_CONTENTS = [this.CUSTOMER_DETAILS_SECTION, this.TABLE_CONTENT, this.ACKNOWLEDGE_LINES];

    this.FULL_DOC_CONTENT_ARRAY = [
      this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
    ];
  }

}
