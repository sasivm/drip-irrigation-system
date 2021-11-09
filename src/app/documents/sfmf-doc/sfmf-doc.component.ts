import { AfterContentInit, Component, OnInit } from '@angular/core';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { CustServiceService } from 'src/app/services/cust-service.service';
import { DataService } from 'src/app/services/data.service';

(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sfmf-doc',
  templateUrl: './sfmf-doc.component.html',
  styleUrls: ['./sfmf-doc.component.scss']
})
export class SfmfDocComponent implements AfterContentInit {

  SFMF_DOC_CUSTOMER: any = {
    certifcateNo: '',
    farmerName: '',
    fatherName: '',
    village: '',
    block: '',
    district: '',
    category: '' // not sure about the data
  };

  DOC_HEADER_CONTENT: Content = [
    { text: 'Micro Irrigation scheme', style: 'docHeadTitle' },
    {
      text: 'Small and Marginal farmer verification certificate',
      style: ['docHeadTitle'], margin: [0, 0, 0, 50]
    }
  ];

  DOC_FOOTER_CONTENT: Content = {
    style: ['footerSignature'],
    layout: 'noBorders',
    table: {
      body: [
        [
          { text: 'AHO/AAO' }, { text: 'HO/AO' }, { text: 'ADH/ADA' },
        ]
      ],
      widths: ['*', '*', '*']
    }
  };

  LINE1_CONTENT: Content = '';

  LINE2_CONTENT: Content = '';

  LINE3_CONTENT: Content = '';

  LINE4_CONTENT: Content = '';

  LINE5_CONTENT: Content = '';

  LINE6_CONTENT: Content = '';

  BODY_CONTENT: Content[] = [];

  DOC_BODY_CONTENTS: Content[] = [];

  FULL_DOC_CONTENT_ARRAY: Content[] = [];

  constructor(private _dataServ: DataService, private _custService: CustServiceService) { }

  ngAfterContentInit() {
    /* mapping customer data to doc object */
    this.mapCustomerDataToSFMFDoc();

    /* construct line and content for bdf with doc object data */
    this.constructPDFLineContent();
    this.constructPDFFullBody();

    this.generatePDF();
  }

  generatePDF() {
    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY);
  }

  mapCustomerDataToSFMFDoc() {
    const customerRecord = this._custService.getLoadedCustomerRecord()[0];
    if (customerRecord && customerRecord?.applicationId) {
      this._dataServ.mapCustomerDataToObject(this.SFMF_DOC_CUSTOMER, customerRecord);
      console.log('sfmf rec', this.SFMF_DOC_CUSTOMER);
    }
  }

  constructPDFFullBody() {
    this.BODY_CONTENT = [
      this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
      this.LINE5_CONTENT, this.LINE6_CONTENT
    ];

    this.DOC_BODY_CONTENTS = [
      this.BODY_CONTENT
    ];

    this.FULL_DOC_CONTENT_ARRAY = [
      this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
    ];
  }

  constructPDFLineContent() {
    this.LINE1_CONTENT = {
      // layout: 'noBorders',
      style: ['rowLineContent'],
      table: {
        body: [
          [
            { text: 'This is certify that the SF/MF certificate No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
            { text: this.SFMF_DOC_CUSTOMER.certifcateNo, border: [false, false, false, true], style: 'fillTextContent' },
            { text: 'submitted', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          ],
        ],
        widths: ['60%', '25%', '15%']
      }
    };

    this.LINE2_CONTENT = {
      style: 'rowLineContent',
      table: {
        body: [
          [
            { text: 'by the farmer', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.SFMF_DOC_CUSTOMER.farmerName, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'S/O', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
            { text: this.SFMF_DOC_CUSTOMER.fatherName, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          ]
        ],
        widths: ['15%', '45%', '5%', '35%']
      }
    };

    this.LINE3_CONTENT = {
      style: 'rowLineContent',
      table: {
        body: [
          [
            { text: 'belonging to', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.SFMF_DOC_CUSTOMER.village, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'Village', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['textCenter'] },
            { text: this.SFMF_DOC_CUSTOMER.block, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          ]
        ],
        widths: ['15%', '43%', '10%', '32%']
      }
    };

    this.LINE4_CONTENT = {
      style: 'rowLineContent',
      table: {
        body: [
          [
            { text: 'Block', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.SFMF_DOC_CUSTOMER.district, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: 'District was verified with the revenue', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' }
          ]
        ],
        widths: ['10%', '*', '*']
      }
    };

    this.LINE5_CONTENT = {
      style: 'textJustify',
      table: {
        body: [
          [
            {
              text: 'department records online and found correct.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER,
              style: 'textJustify'
            },
            {
              text: 'The farmer is eligible to avail subsidy for MI', border: PDFMakeConstants.TABLE_CELL_NO_BORDER,
              style: 'textJustify'
            },
          ]
        ]
      }
    };

    this.LINE6_CONTENT = {
      style: 'rowLineContent',
      table: {
        body: [
          [
            { text: 'under', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: 'PMKSY', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: { bold: true } },
            { text: 'in', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
            { text: this.SFMF_DOC_CUSTOMER.category, border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
            { text: '(SF/MF) category.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' }
          ]
        ],
        widths: ['auto', 'auto', 'auto', '*', '25%']
      }
    };
  }
}

