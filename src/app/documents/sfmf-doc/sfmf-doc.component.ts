import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, Content, StyleDictionary, Style, Table, ContentTable } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sfmf-doc',
  templateUrl: './sfmf-doc.component.html',
  styleUrls: ['./sfmf-doc.component.scss']
})
export class SfmfDocComponent implements OnInit {

  DOC_STYLE_HEADER_TITLE_NAME: string = 'docHeadTitle';
  DOC_STYLE_NORMAL_LINE_NAME: string = 'normalTextLine';
  DOC_STYLE_FILL_TEXT_NAME: string = 'fillTextContent';

  TABLE_CELL_NO_BORDER: boolean[] = [false, false, false, false];
  TABLE_CELL_BOTTOM_BORDER: boolean[] = [false, false, false, true];
  TABLE_CELL_FULL_BORDER: boolean[] = [true, true, true, true];


  DOC_HEADER_CONTENT: Content = [
    {
      text: 'Micro Irrigation scheme',
      style: this.DOC_STYLE_HEADER_TITLE_NAME,
    },
    {
      text: 'Small and Marginal farmer verification certificate',
      style: this.DOC_STYLE_HEADER_TITLE_NAME,
      margin: [0, 0, 0, 50]
    }
  ];

  DOC_FOOTER_CONTENT: Content = {
    style: ['footerSignature'],
    layout: 'noBorders',
    table: {
      body: [
        [
          { text: 'AHO/AAO' },
          { text: 'HO/AO' },
          { text: 'ADH/ADA' },
        ]
      ],
      widths: ['*', '*', '*']
    }
  };

  LINE6_CONTENT: Content = {
    style: 'rowLineContent',
    table: {
      body: [
        [
          { text: 'subsidy for MI under', border: this.TABLE_CELL_NO_BORDER },
          { text: 'PMKSY', border: this.TABLE_CELL_NO_BORDER, style: { bold: true } },
          { text: 'in', border: this.TABLE_CELL_NO_BORDER },
          { text: '', border: this.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: '(SF/MF) category.', border: this.TABLE_CELL_NO_BORDER, style: 'textCenter' }
        ]
      ],
      widths: ['auto', 'auto', 'auto', '*', '25%']
    }
  };

  LINE5_CONTENT: Content = {
    style: { alignment: 'justify' },
    table: {
      body: [
        [
          {
            text: 'department records online and found correct.', border: this.TABLE_CELL_NO_BORDER,
            style: { alignment: 'justify' }
          },
          {
            text: 'The farmer is eligible to avail', border: this.TABLE_CELL_NO_BORDER,
            style: { alignment: 'justify' }
          },
        ]
      ]
    }
  };

  LINE4_CONTENT: Content = {
    style: 'rowLineContent',
    table: {
      body: [
        [
          { text: 'Block', border: this.TABLE_CELL_NO_BORDER },
          { text: 'TIRUPPUR', border: this.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'District was verified with the revenue', border: this.TABLE_CELL_NO_BORDER, style: 'textCenter' }
        ]
      ],
      widths: ['10%', '*', '*']
    }
  };

  LINE3_CONTENT: Content = {
    style: 'rowLineContent',
    table: {
      body: [
        [
          { text: 'belonging to', border: this.TABLE_CELL_NO_BORDER },
          { text: 'VAGATHOLUVU', border: this.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Village', border: this.TABLE_CELL_NO_BORDER, style: ['textCenter'] },
          { text: 'GUDIMANGALAM', border: this.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
        ]
      ],
      widths: ['15%', '43%', '10%', '32%']
    }
  };

  LINE2_CONTENT: Content = {
    style: 'rowLineContent',
    table: {
      body: [
        [
          { text: 'by the farmer', border: this.TABLE_CELL_NO_BORDER },
          { text: 'RANGANATHAN AND PUNITHAMANI', border: this.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'S/O', border: this.TABLE_CELL_NO_BORDER, style: 'textCenter' },
          { text: 'NARAYANASAMY', border: this.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
        ]
      ],
      widths: ['15%', '45%', '5%', '35%']
    }
  };

  LINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'This is certify that the SF/MF certificate No', border: this.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
          { text: 'TN-920200624788', border: [false, false, false, true], style: 'fillTextContent' },
          { text: 'submitted', border: this.TABLE_CELL_NO_BORDER },
        ],
      ],
      widths: ['60%', '25%', '15%']
    }
  };

  BODY_CONTENT: Content[] = [
    this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
    this.LINE5_CONTENT, this.LINE6_CONTENT
  ];

  DOC_STYLES: StyleDictionary = {
    docHeadTitle: {
      fontSize: 16,
      alignment: 'center',
      decoration: 'underline',
      bold: true,
      margin: [0, 0, 0, 0]
    },
    firstLineContent: {
      alignment: 'right',
    },
    fillTextContent: {
      alignment: 'center',
      bold: true
    },
    rowLineContent: {
      margin: [0, 5]
    },
    textCenter: {
      alignment: 'center'
    },
    textJustify: {
      alignment: 'justify'
    },
    footerSignature: {
      alignment: 'center',
      bold: true,
      fontSize: 16,
      margin: [0, 140]
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  downloadPDFFile() {
    this.generatePDF();
  }

  DOC_BODY_CONTENTS = [
    this.BODY_CONTENT
  ];

  FULL_DOC_CONTENT_ARRAY: Content[] = [
    this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
  ];

  generatePDF() {
    let docDefinition: TDocumentDefinitions = {
      content: this.FULL_DOC_CONTENT_ARRAY,
      styles: this.DOC_STYLES
    };

    pdfMake.createPdf(docDefinition).open();
  }

}

