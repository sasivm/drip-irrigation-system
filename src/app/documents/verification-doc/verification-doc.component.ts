import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { style } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-verification-doc',
  templateUrl: './verification-doc.component.html',
  styleUrls: ['./verification-doc.component.scss']
})
export class VerificationDocComponent implements AfterContentInit {

  constructor(private _dataServ: DataService) { }

  ngAfterContentInit() {
    this.generatePDF();
  }

  exportPdf() {
    this.generatePDF();
  }

  DOC_HEADER_CONTENT: Content = [
    {
      text: 'VERFICATION CERTIFICATE', style: ['docHeadTitle'],
      margin: [0, 0, 0, 30] // R T L B
    }
  ];

  LINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'The documents submitted by the farmer', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
          { text: 'RANGANATHAN AND PUNITHAMANI', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
        ],
      ],
      widths: ['50%', '50%']
    }
  };

  LINE2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'S/o', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'NARAYANASAMY', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
          { text: 'VAGATHOLUVU', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
        ],
      ],
      widths: ['5%', '45%', '5%', '45%']
    }
  };

  LINE3_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'Village', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'GUDIMANGALAM', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Block', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
          { text: 'TIRUPPUR', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
        ],
      ],
      widths: ['10%', '40%', '10%', '40%']
    }
  };

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

  SUBLINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '1.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['boldText'] },
          { text: 'The farmer belongs to', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'SF/MF(100%)', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Category (Specify)', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['auto', '25%', '30%', '30%']
    }
  };

  SUBLINE2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '2.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'The land holding of the farmer is', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '1.17.0 HA', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Ha', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['auto', '38%', '30%', '10%']
    }
  };

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

  SUBLINE4_1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '4.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'Farmer has already installed Micro irrigation system Drip in an area of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '   ', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
        ]
      ], widths: ['auto', 'auto', '*']
    }
  };

  SUBLINE4_2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '.Ha in the survey No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '   ', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'during the year', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER }
        ]
      ], widths: ['auto', '30%', 'auto', '25%']
    }
  };

  SUBLINE4_3_CONTENT: Content = {
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

  SUBLINE5_1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '5.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'The farmer has applied MI for an area of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '1.17.0 HA', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Ha for the S.No and sub survey', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['auto', '45%', '15%', '*']
    }
  };

  SUBLINE5_2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '230/D2, 231/D2,D1H', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
        ],
      ],
      widths: ['auto', '45%']
    }
  };

  SUBLINE6_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '6.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'Eligible area for availing Ml system', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '1.17.0 HA', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Ha', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['auto', 'auto', '20%', 'auto']
    }
  };

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

  DOC_FOOTER_CONTENT: Content = {
    style: 'footerSignature',
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

  DOC_BODY_CONTENTS: Content = [
    this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
    this.SUBLINE1_CONTENT, this.SUBLINE2_CONTENT, this.SUBLINE3_CONTENT, this.SUBLINE4_1_CONTENT, this.SUBLINE4_2_CONTENT,
    this.SUBLINE4_3_CONTENT, this.SUBLINE5_1_CONTENT, this.SUBLINE5_2_CONTENT, this.SUBLINE6_CONTENT, this.SUBLINE7_CONTENT
  ];

  FULL_DOC_CONTENT_ARRAY: Content[] = [
    this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
  ];

  generatePDF() {
    let docDefinition: TDocumentDefinitions = {
      content: this.FULL_DOC_CONTENT_ARRAY,
      styles: PDFMakeConstants.DOC_STYLES
    };

    const documentPDF: _pdfMake.TCreatedPdf = _pdfMake.createPdf(docDefinition);
    documentPDF.getDataUrl(this._dataServ.updateFrameSrc);
  }


}
