import { Injectable } from '@angular/core';

import * as _pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { PDFMakeConstants } from 'src/app/common/pdfMake-constants';
(_pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  createPDFTemplate(docContentArray: Content[], font: TFontDictionary | undefined = undefined) {
    const docDefinition: TDocumentDefinitions = {
      content: docContentArray,
      styles: PDFMakeConstants.DOC_STYLES
    };

    const documentPDF: _pdfMake.TCreatedPdf = _pdfMake.createPdf(docDefinition, undefined, font);
    documentPDF.getDataUrl(this.updateFrameSrc);
  }

  updateFrameSrc(result: string) {
    const pdfFrameEle: HTMLIFrameElement | null = document.getElementById('printPdf') as HTMLIFrameElement;
    pdfFrameEle.src = result;
  }
}
