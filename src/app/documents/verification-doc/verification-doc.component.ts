import { AfterContentInit, Component } from '@angular/core';
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { DataService } from 'src/app/services/data.service';
import { CustServiceService } from 'src/app/services/cust-service.service';
import { CUstomeFontsBase64 } from 'src/app/common/font-base64';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-verification-doc',
  templateUrl: './verification-doc.component.html',
  styleUrls: ['./verification-doc.component.scss']
})
export class VerificationDocComponent implements AfterContentInit {

  constructor(private _dataServ: DataService, private _custService: CustServiceService) { }

  VERFIY_DOC_CUSTOMER_DATA: any = {
    farmerName: '',
    fatherName: '',
    village: '',
    block: '',
    district: '',
    category: '', // not sure about the data and does need (specify) of %
    totalArea: '',
    alreadyAppliedArea: '', // not sure about the data
    alreadyAppliedSurveyNo: '', // not sure about the data
    alreadyAppliedYear: '', // not sure about the data
    appliedArea: '',
    surveyAndSubDivNo: '', // surveyNo and subDivisionNo comes as array and convet to string
    eligibleArea: '', // not sure about the data
  };

  DOC_HEADER_CONTENT: Content = [
    {
      text: 'VERFICATION CERTIFICATE', style: ['docHeadTitle'],
      margin: [0, 0, 0, 30] // R T L B
    }
  ];

  DOC_FOOTER_CONTENT: Content = {
    style: 'footerSignature',
    layout: 'noBorders',
    table: {
      body: [
        [
          { text: 'AHO/AAO' }, { text: 'HO/AO' }, { text: 'ADH/ADA' }
        ]
      ],
      widths: ['*', '*', '*']
    }
  };

  LINE1_CONTENT: Content = '';

  LINE2_CONTENT: Content = '';

  LINE3_CONTENT: Content = '';

  LINE4_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          {
            text: 'District has been verified and the following are ensured.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER,
            style: 'subLineBefore'
          }
        ],
      ]
    }
  };

  SUBLINE1_CONTENT: Content = '';

  SUBLINE2_CONTENT: Content = '';

  SUBLINE3_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '3.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'The Farmer has not installed Micro irrigation system Drip during the past seven years.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ]
    }
  };

  SUBLINE4_1_CONTENT: Content = '';

  SUBLINE4_2_CONTENT: Content = '';

  SUBLINE4_3_CONTENT: Content = '';

  SUBLINE5_1_CONTENT: Content = '';

  SUBLINE5_2_CONTENT: Content = '';

  SUBLINE6_CONTENT: Content = '';

  SUBLINE7_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '7.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'There is no duprication or repetition of farmer, survey number, Ml firm or the Department', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['auto', 'auto']
    }
  };

  DOC_BODY_CONTENTS: Content = [];

  FULL_DOC_CONTENT_ARRAY: Content[] = [];

  ngAfterContentInit() {
    /* mapping customer data to doc object */
    this.mapCustomerDataToDocObject();

    /* construct line and content for bdf with doc object data */
    this.constructPDFLineForDataContent();
    this.constructPDFFullBody();

    this.generatePDF();
  }

  mapCustomerDataToDocObject() {
    const customerRecord = this._custService.getLoadedCustomerRecord()[0];
    if (customerRecord && customerRecord?.applicationId) {
      this._dataServ.mapCustomerDataToObject(this.VERFIY_DOC_CUSTOMER_DATA, customerRecord, true); // 3rd param for Survey and SubDiv Number

    }
    this.VERFIY_DOC_CUSTOMER_DATA.category = customerRecord['farmerType']; // not sure about data

    console.log('verification rec', this.VERFIY_DOC_CUSTOMER_DATA);
  }

  exportPdf() {
    this.generatePDF();
  }

  constructPDFLineForDataContent() {
    this.LINE1_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'The documents submitted by the farmer', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.farmerName, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
          ],
        ],
        widths: ['50%', '50%']
      }
    };

    this.LINE2_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'S/o', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.fatherName, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.village, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
          ],
        ],
        widths: ['5%', '45%', '5%', '45%']
      }
    };

    this.LINE3_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'Village', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.block, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Block', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.district, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
          ],
        ],
        widths: ['10%', '40%', '10%', '40%']
      }
    };

    this.SUBLINE1_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: '1.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['boldText'] },
            { text: 'The farmer belongs to', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.category, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Category (Specify)', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['auto', '25%', '30%', '30%']
      }
    };

    this.SUBLINE2_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: '2.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
            { text: 'The land holding of the farmer is', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.totalArea, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Ha', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['auto', '38%', '30%', '10%']
      }
    };

    this.SUBLINE4_1_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: '4.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
            { text: 'Farmer has already installed Micro irrigation system Drip in an area of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.alreadyAppliedArea, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          ]
        ], widths: ['auto', 'auto', '*']
      }
    };

    this.SUBLINE4_2_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: '.Ha in the survey No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.alreadyAppliedSurveyNo, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'during the year', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.alreadyAppliedYear, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER }
          ]
        ], widths: ['auto', '30%', 'auto', '25%']
      }
    };

    this.SUBLINE4_3_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            {
              text: '(Fill only if farmer already installed)', border: PDFMakeConstants.TABLE_CELL_NO_BORDER,
              style: 'boldText'
            },
          ]
        ]
      }
    };

    this.SUBLINE5_1_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: '5.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
            { text: 'The farmer has applied MI for an area of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.appliedArea, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Ha for the S.No and sub survey', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['auto', '45%', '15%', '*']
      }
    };

    this.SUBLINE5_2_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.surveyAndSubDivNo, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          ],
        ],
        widths: ['auto', '45%']
      }
    };

    this.SUBLINE6_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: '6.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
            { text: 'Eligible area for availing Ml system', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.VERFIY_DOC_CUSTOMER_DATA.eligibleArea, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Ha', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['auto', 'auto', '20%', 'auto']
      }
    };
  }

  constructPDFFullBody() {
    this.DOC_BODY_CONTENTS = [
      this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
      this.SUBLINE1_CONTENT, this.SUBLINE2_CONTENT, this.SUBLINE3_CONTENT, this.SUBLINE4_1_CONTENT, this.SUBLINE4_2_CONTENT,
      this.SUBLINE4_3_CONTENT, this.SUBLINE5_1_CONTENT, this.SUBLINE5_2_CONTENT, this.SUBLINE6_CONTENT, this.SUBLINE7_CONTENT
    ];

    this.FULL_DOC_CONTENT_ARRAY = [
      this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
    ];
  }

  generatePDF() {
    // this adds our base64 encoded data to the existing 'virtual file system'
    pdfFonts.pdfMake.vfs['TimesNewRoman_b64'] = CUstomeFontsBase64.TimesNewRoman_BASE64;
    pdfFonts.pdfMake.vfs['Baamini_b64'] = CUstomeFontsBase64.Baamini_BASE64;
    pdfFonts.pdfMake.vfs['Baloo_64'] = CUstomeFontsBase64.Baloo_Regular_BASE64;
    pdfFonts.pdfMake.vfs['Baloo_bold_b64'] = CUstomeFontsBase64.Baloo_Bold_BASE64;

    const pdfCustomFonts: TFontDictionary = {
      // Default font should still be available
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
      },
      // Add all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
      TimesNewRoman: {
        normal: 'TimesNewRoman_b64',
        bold: 'TimesNewRoman_b64',
        italics: 'TimesNewRoman_b64',
        bolditalics: 'TimesNewRoman_b64'
      },
      Baloo2: {
        normal: 'Baloo_64',
        bold: 'Baloo_bold_b64',
        italics: 'Baloo_64',
        bolditalics: 'Baloo_64'
      },
      Baamini: {
        normal: 'Baamini_b64',
        bold: 'Baamini_b64',
        italics: 'Baamini_b64',
        bolditalics: 'Baamini_b64'
      }
    };

    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY, pdfCustomFonts);

    // this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY);
  }

}
