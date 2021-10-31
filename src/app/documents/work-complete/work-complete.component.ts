import { Component, OnInit } from '@angular/core';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TFontDictionary } from 'pdfmake/interfaces';
import { TamilFontsBase64 } from 'src/app/common/font-base64';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
import { DataService } from 'src/app/services/data.service';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-work-complete',
  templateUrl: './work-complete.component.html',
  styleUrls: ['./work-complete.component.scss']
})
export class WorkCompleteComponent implements OnInit {

  constructor(private _dataServ: DataService) { }

  ngOnInit(): void {
    this.generatePDF();
  }

  DOC_HEADER_CONTENT: Content = [
    {
      text: 'பணிநிறைவு அறிக்கை', style: ['docTamil2', 'docHeadTitle'],
      margin: [0, 0, 0, 30], // R T L B.
    }
  ];

  CompanyNameContent: Content = {
    text: [
      { text: 'Vedanta ', color: 'blue', style: 'componyNameMarker' },
      { text: 'IRRIGATION SYSTEMS', style: 'componyNameMarker' },
    ]
  };

  LINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: '', border: PDFMakeConstants.TABLE_CELL_NO_BORDER },
          { text: 'TIRUPPUR', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: ['firstLineContent', 'populatedTextEng'] },
          { text: 'மாவட்டத்தில்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textCenter'] },
          { text: 'GUDIMANGALAM', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' },
          { text: 'வட்டத்தில்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textRight'] }
        ],
      ],
      widths: ['10%', '30%', '20%', '30%', '*']
    }
  };

  LINE2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'MUKKUTU JALLIPATTI', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: ['firstLineContent', 'populatedTextEng'] },
          { text: 'கிராமத்தில் வசித்துவரும் திரு/திருமதி', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textCenter'] },
          { text: 'KANAGARAJ', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' }
        ],
      ],
      widths: ['32%', '48%', '*']
    }
  };

  LINE3_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'த.பெ/க.பெ', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
          { text: 'VEERASAMY', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: ['populatedTextEng'] },
          { text: 'ஆகிய எனக்கு', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textCenter'] },
          { text: 'MUKKUTU JALLIPATTI', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' }
        ],
      ],
      widths: ['15%', '35%', '18%', '*']
    }
  };

  LINE4_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'கிராமத்தில்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
          { text: 'GUDIMANGALAM', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: ['populatedTextEng'] },
          { text: 'வட்டாரத்தில்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textCenter'] },
          { text: '112/1C', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' },
          { text: 'சர்வே', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textRight'] },
        ],
      ],
      widths: ['15%', '30%', '17%', '30%', '*']
    }
  };

  LINE5_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'எண்களில் பாத்தியப்பட்ட', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
          { text: '1.39', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: ['populatedTextEng'] },
          { text: 'எக்டர் பரப்பளவில்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textCenter'] },
          { text: 'COCONUT', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' }
        ],
      ],
      widths: ['32%', '20%', '25%', '*']
    }
  };

  LINE6_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'பயிருக்கு', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
          { text: '1.35', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: ['populatedTextEng'] },
          { text: 'எக்டர் பரப்பளவில்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textCenter'] },
          { text: '8m*8m', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' },
          { text: 'இடைவெளியில் சொட்டு நீர்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'textRight'] }
        ],
      ],
      widths: ['13%', '13%', '25%', '20%', '*']
    }
  };

  LINE7_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'பாசனம்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
          { text: 'PMKSY', style: 'populatedTextEng', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, },
          { text: 'திட்டத்தின் கீழ் ', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
          { text: this.CompanyNameContent, border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['populatedTextEng'] },
          { text: 'நிறுவனம் மூலம் அமைக்க', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
        ],
      ], widths: ['8%', '9%', '15%', '38%', 'auto']
    }
  };

  LINE8_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'A-TPR-gdm-6518105712-2021-22', border: PDFMakeConstants.TABLE_CELL_BOTTOM_BORDER, style: 'populatedTextEng' },
          { text: 'பதிவு  எண்ணில்  விண்ணப்பித்து பணியாணை வழங்கியதின்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
        ],
      ], widths: ['43%', '*']
    }
  };

  LINE9_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'பேரில்  சொட்டு  நீர்  பாசனம்  அமைத்து  செயல்பாட்டினை முழுமையாக விளக்கி காண்பிக்கப்பட்டது.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
        ],
      ]
    }
  };

  PARA2_LINE1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['newParaghraph'],
    table: {
      body: [
        [
          { text: 'சொட்டு நீர் பாசனம் அமைந்துள்ள', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'firstLineContent'] },
          { text: this.CompanyNameContent, border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['populatedTextEng'] },
          { text: 'நிறுவனத்தால்', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
        ],
      ], widths: ['42%', '35%', '17%']
    }
  };

  PARA2_LINE2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'மூன்றாண்டுகளுக்கு  சொட்டு  நீர்  பாசன  கருவிகளுக்கு   சேவை  அளிப்பதுடன்  ஏற்படும் பழுதுகளையும் சரி', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
        ],
      ]
    }
  };

  PARA2_LINE3_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          { text: 'செய்து தரப்படும்.', border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2'] },
        ],
      ]
    }
  };

  PARA3_Line1_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['newParaghraph'],
    table: {
      body: [
        [
          {
            text: 'மூன்றாண்டுகளுக்கு ஆண்டுகளுக்கு பின்னர் பழுது ஏற்படும் பட்சத்தில் எனது சொந்த செலவில்',
            border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2', 'firstLineContent']
          }
        ]
      ], widths: ['95%']
    }
  };

  PARA3_Line2_CONTENT: Content = {
    // layout: 'noBorders',
    style: ['rowLineContentTamilDoc'],
    table: {
      body: [
        [
          {
            text: 'சரி செய்து உபயோகப்படுத்துவேன். தற்போது அமைக்கப்பட்ட சொட்டு நீர்பாசனம் நல்ல முறையில் திருப்திகரமாக இயங்கிவருகிறது.',
            lineHeight: 2,
            border: PDFMakeConstants.TABLE_CELL_NO_BORDER, style: ['docTamil2']
          },
        ]
      ]
    }
  };

  DOC_BODY_CONTENTS: Content = [
    this.LINE1_CONTENT, this.LINE2_CONTENT, this.LINE3_CONTENT, this.LINE4_CONTENT,
    this.LINE5_CONTENT, this.LINE6_CONTENT, this.LINE7_CONTENT, this.LINE8_CONTENT,
    this.LINE9_CONTENT,
    this.PARA2_LINE1_CONTENT, this.PARA2_LINE2_CONTENT, this.PARA2_LINE3_CONTENT,
    this.PARA3_Line1_CONTENT, this.PARA3_Line2_CONTENT
  ];

  DOC_FOOTER_CONTENT: Content = {
    style: 'footerSignWorkComp',
    layout: 'noBorders',
    table: {
      body: [
        [
          { text: 'நிறுவனத்தார் கையொப்பம்', alignment: 'left', style: ['docTamil2'] },
          { text: 'விவசாயி கையொப்பம்', alignment: 'right', style: ['docTamil2'] }
        ]
      ],
      widths: ['*', '*']
    }
  };

  COMPANY_MARK: Content = {
    style: 'companyMarker',
    text: [
      { text: 'Vedanta', color: 'blue' },
      { text: ' Irrigation Systems Pvt. Ltd' },
    ]
  }

  FULL_DOC_CONTENT_ARRAY: Content[] = [
    this.DOC_HEADER_CONTENT, this.DOC_BODY_CONTENTS, this.DOC_FOOTER_CONTENT, this.COMPANY_MARK
  ];

  generatePDF() {
    // this adds our base64 encoded data to the existing 'virtual file system'
    pdfFonts.pdfMake.vfs['Baloo_64'] = TamilFontsBase64.Baloo_Regular_BASE64;
    pdfFonts.pdfMake.vfs['Baloo_bold_b64'] = TamilFontsBase64.Baloo_Bold_BASE64;
    // pdfFonts.pdfMake.vfs['Baamini_b64'] = TamilFontsBase64.Baamini_BASE64;

    const pdfTamilFonts: TFontDictionary = {
      // Default font should still be available
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
      },
      // Add all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
      Baloo2: {
        normal: 'Baloo_64',
        bold: 'Baloo_bold_b64',
        italics: 'Baloo_64',
        bolditalics: 'Baloo_64'
      }
      // Baamini: {
      //   normal: 'Baamini_b64',
      //   bold: 'Baamini_b64',
      //   italics: 'Baamini_b64',
      //   bolditalics: 'Baamini_b64'
      // }
    };

    this._dataServ.createPDFTemplate(this.FULL_DOC_CONTENT_ARRAY, pdfTamilFonts);
  }

}
