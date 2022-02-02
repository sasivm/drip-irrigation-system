import { AfterContentInit, Component } from '@angular/core';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { CustServiceService } from 'src/app/services/cust-service.service';
import { DataService } from 'src/app/services/data.service';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pre-doc',
  templateUrl: './pre-doc.component.html',
  styleUrls: ['./pre-doc.component.scss']
})
export class PreDocComponent implements AfterContentInit {

  constructor(private _dataServ: DataService, private _custService: CustServiceService) { }

  PRE_DOC_CUSTOMER_DATA = {
    farmerName: '',
    fatherName: '',
    village: '',
    block: '',
    district: '',
    surveyAndSubDivNo: '', // surveyNo and subDivisionNo comes as array and convet to string
    appliedArea: '',
    PMKSYYear: 'PMKSY 2020 - 2021', // not sure about the data
    preInspectedDate: '', // not sure about the data
    miCompany: ''
  };

  DOC_HEADER_CONTENT: Content = [
    {
      text: 'Pre Inspection Report', style: ['docHeadTitle'],
      margin: [0, 0, 0, 30] // R T L B
    }
  ];

  LINE1_CONTENT: Content = [];

  LINE2_CONTENT: Content = [];

  LINE3_CONTENT: Content = [];

  LINE4_CONTENT: Content = [];

  LINE5_CONTENT: Content = [];

  LINE6_CONTENT: Content = [];

  LINE7_CONTENT: Content = [];

  DOC_BODY_CONTENTS: Content[] = [];
  DOC_FOOTER_CONTENT: Content[] = [];
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
      this._dataServ.mapCustomerDataToObject(this.PRE_DOC_CUSTOMER_DATA, customerRecord, true);
    }
    console.log('Pre doc', this.PRE_DOC_CUSTOMER_DATA);
  }

  constructPDFFullBody() {
    this.DOC_BODY_CONTENTS = [
      this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
      this.LINE5_CONTENT, this.LINE6_CONTENT, this.LINE7_CONTENT
    ];

    this.FULL_DOC_CONTENT_ARRAY = [
      this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
    ];
  }

  constructPDFLineForDataContent() {
    this.LINE1_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'This is to certify that the field of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
            { text: 'Mr/Ms.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
            { text: this.PRE_DOC_CUSTOMER_DATA.farmerName, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
          ],
        ],
        widths: ['40%', '10%', '50%']
      }
    };

    this.LINE2_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'S/o', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.PRE_DOC_CUSTOMER_DATA.fatherName, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'belongs to', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
            { text: this.PRE_DOC_CUSTOMER_DATA.village, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
          ],
        ],
        widths: ['5%', '40%', '13%', '42%']
      }
    };

    this.LINE3_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'Village,', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.PRE_DOC_CUSTOMER_DATA.block, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Block and', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
            { text: this.PRE_DOC_CUSTOMER_DATA.district, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'District', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['10%', '35%', '15%', '33%', '10%']
      }
    };

    this.LINE4_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'bearing the survey No / Sub division. No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.PRE_DOC_CUSTOMER_DATA.surveyAndSubDivNo, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'applied for Micro', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' }
          ],
        ],
        widths: ['45%', '35%', '25%']
      }
    };

    this.LINE5_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'Drip for an area of,', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.PRE_DOC_CUSTOMER_DATA.appliedArea, border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['textCenter', 'boldText'] },
            { text: 'Under', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
            { text: this.PRE_DOC_CUSTOMER_DATA.PMKSYYear, border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['textCenter', 'boldText'] },
            { text: 'is Pre inspected on ', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['23%', '15%', '10%', '30%', '25%']
      }
    };

    this.LINE6_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: this.PRE_DOC_CUSTOMER_DATA.preInspectedDate, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'with the Irrigation system layout and quotation prepared by the firm,', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ],
        ],
        widths: ['25%', '75%']
      }
    };

    this.LINE7_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: this.PRE_DOC_CUSTOMER_DATA.miCompany.toUpperCase(), border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' }
          ],
        ]
      }
    };

    this.DOC_FOOTER_CONTENT = [
      { text: '', style: 'preFooter' },
      {
        layout: 'noBorders',
        table: {
          body: [
            [
              { text: '' }, { text: 'Block officer', alignment: 'center' }
            ]
          ], widths: ['50%', '50%']
        }
      },
      {
        layout: 'noBorders',
        table: {
          body: [
            [
              { text: '' }, { text: 'Department of Agriculture / Horticulture', alignment: 'center' }
            ]
          ], widths: ['50%', '50%']
        }
      },
      {
        // layout: 'noBorders',
        table: {
          body: [[
            { text: '', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.PRE_DOC_CUSTOMER_DATA.block, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Block', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ]], widths: ['55%', '30%', '15%']
        }
      },
      {
        // layout: 'noBorders',
        table: {
          body: [[
            { text: '', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.PRE_DOC_CUSTOMER_DATA.district, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'District', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
          ]], widths: ['55%', '30%', '15%']
        }
      }
    ];
  }

  generatePDF() {
    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY);
  }

}
