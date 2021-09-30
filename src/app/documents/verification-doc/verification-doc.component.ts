import { Component } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-verification-doc',
  templateUrl: './verification-doc.component.html',
  styleUrls: ['./verification-doc.component.scss']
})
export class VerificationDocComponent {

  constructor() { }

  exportPdf() {
    this.generatePDF();
  }

  DOC_HEADER_CONTENT: Content = [
    {
      text: 'VERFICATION CERTIFICATE',
      style: 'titleHeader'
    }
  ];

  LINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'The documents submitted by the farmer', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
          { text: 'TN-920200624788', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
        ],
      ],
      widths: ['60%', '40%']
    }
  };

  DOC_BODY_CONTENTS: Content = [
    this.LINE1_CONTENT
  ];

  FULL_DOC_CONTENT_ARRAY: Content[] = [
    this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS
  ];

  generatePDF() {
    let docDefinition: TDocumentDefinitions = {
      content: this.FULL_DOC_CONTENT_ARRAY,
      styles: {
        titleHeader: {
          alignment: 'center',
          fontSize: 18
        },
        fillTextContent: {
          alignment: 'center',
          bold: true
        },
        rowLineContent: {
          margin: [0, 5]
        },
        firstLineContent: {
          alignment: 'right',
        }
      }
    };

    _pdfMake.createPdf(docDefinition).open();
  }

}
