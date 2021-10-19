import { AfterContentInit, Component } from '@angular/core';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { DataService } from 'src/app/services/data.service';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pre-doc',
  templateUrl: './pre-doc.component.html',
  styleUrls: ['./pre-doc.component.scss']
})
export class PreDocComponent implements AfterContentInit {

  constructor(private _dataServ: DataService) { }

  DOC_HEADER_CONTENT: Content = [
    {
      text: 'Pre Inspection Report', style: ['docHeadTitle'],
      margin: [0, 0, 0, 30] // R T L B
    }
  ];

  LINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'This is to certify that the field of', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'firstLineContent' },
          { text: 'Mr/Ms.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'boldText' },
          { text: 'RANGANATHAN AND PUNITHAMANI', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
        ],
      ],
      widths: ['40%', '10%', '50%']
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
          { text: 'belongs to', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
          { text: 'VAGATHOLUVU', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' }
        ],
      ],
      widths: ['5%', '40%', '13%', '42%']
    }
  };

  LINE3_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'Village,', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'GUDIMANGALAM', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Block and', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
          { text: 'TIRUPPUR', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'District', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['10%', '35%', '15%', '33%', '10%']
    }
  };

  LINE4_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'bearing the survey No / Sub division. No', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '230/D2, 231/D2,D1H', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'applied for Micro', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' }
        ],
      ],
      widths: ['45%', '35%', '25%']
    }
  };

  LINE5_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'Drip for an area of,', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: '1.17.0 HA', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['textCenter', 'boldText'] },
          { text: 'Under', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: 'textCenter' },
          { text: 'PMKSY 2020 - 2021', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['textCenter', 'boldText'] },
          { text: 'is Pre inspected on ', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['23%', '15%', '10%', '30%', '25%']
    }
  };

  LINE6_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: '20-July-2022', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'with the Irrigation system layout and quotation prepared by the firm,', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ],
      widths: ['25%', '75%']
    }
  };

  LINE7_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContent'],
    table: {
      body: [
        [
          { text: 'Vedanta Irrigation Systems Pvt. Ltd.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ],
      ]
    }
  };

  DOC_BODY_CONTENTS: Content = [
    this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
    this.LINE5_CONTENT, this.LINE6_CONTENT, this.LINE7_CONTENT
  ];

  DOC_FOOTER_CONTENT: Content[] = [
    {
      text: '', style: 'preFooter'
    },
    {
      layout: 'noBorders',
      table: {
        body: [[
          { text: '' },
          { text: 'Block officer', alignment: 'center' }
        ]],
        widths: ['50%', '50%']
      }
    },
    {
      layout: 'noBorders',
      table: {
        body: [[
          { text: '' },
          { text: 'Department of Agriculture / Horticulture', alignment: 'center' }
        ]],
        widths: ['50%', '50%']
      }
    },
    {
      // layout: 'noBorders',
      table: {
        body: [[
          { text: '', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'GUDIMANGALAM', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'Block', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ]],
        widths: ['55%', '30%', '15%']
      }
    },
    {
      // layout: 'noBorders',
      table: {
        body: [[
          { text: '', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'TIRUPPUR', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'fillTextContent' },
          { text: 'District', border: PDFMakeConstants.TABLE_CELL_NO_BORDER }
        ]],
        widths: ['55%', '30%', '15%']
      }
    }
  ];

  FULL_DOC_CONTENT_ARRAY: Content[] = [
    this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT
  ];

  ngAfterContentInit() {
    this.generatePDF();
  }

  generatePDF() {
    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY);
  }

}
