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

  /**
      *set the sourceObject properies value from customerRecord
      *It will automatically update properies sourceObject. No values retured.

      If 3rd parameter true, it sets Survey Number and SubDivision Number in surveyAndSubDivNo on sourceObject,
      If false it will not add surveyAndSubDivNo property
     */
  mapCustomerDataToObject(sourceObject: any, customerRecord: any, isSurveyDivNumNeed: boolean = false) {
    for (const dataProp in sourceObject) {
      if (customerRecord?.hasOwnProperty(dataProp)) {
        sourceObject[dataProp] = customerRecord[dataProp];
      } else {
        if (customerRecord?.hasOwnProperty('surveyCropRec')) { // looking for data inside survey details
          if (customerRecord.surveyCropRec?.hasOwnProperty(dataProp)) {
            sourceObject[dataProp] = customerRecord.surveyCropRec[dataProp];
          }
        }
      }
    }

    if (isSurveyDivNumNeed) {
      if (!(customerRecord?.surveyCropRec?.surveyAndSubDivNo)) {
        console.log('Getting surveyAndSubDivNo from surveyNo + SubDivNo');
        const surveyAndDivNumberStr = this.surveyAndDivNoFromCustomerObject(customerRecord);
        if (surveyAndDivNumberStr) {
          sourceObject['surveyAndSubDivNo'] = surveyAndDivNumberStr; // Default sets to surveyAndSubDivNo
        }
      }
    }
  }

  /**
    Genreates Survey Number and SubDivision Number from surveyCropRec proprty in given object
    else it will return null.
    */
  surveyAndDivNoFromCustomerObject(customerRecord: any): string | null {
    if (customerRecord?.hasOwnProperty('surveyCropRec') && customerRecord.surveyCropRec?.hasOwnProperty('surveyNo')) {
      const surveyNoArray: any[] = customerRecord.surveyCropRec.surveyNo;
      const subDivNoArray: any[] = customerRecord.surveyCropRec.subDivisionNo;

      let surveyAndSubDivNoStr: string = '';
      const arrayLength = (surveyNoArray.length >= subDivNoArray.length) ? surveyNoArray.length : subDivNoArray.length;

      for (let i = 0; i < arrayLength; i++) {
        if (surveyNoArray[i]) {
          surveyAndSubDivNoStr += surveyNoArray[i];
          if (subDivNoArray[i]) {
            surveyAndSubDivNoStr += `/${subDivNoArray[i]}`;
          }
        } else if (subDivNoArray[i]) {
          surveyAndSubDivNoStr += subDivNoArray[i];
        }

        if (i !== (arrayLength - 1)) {
          surveyAndSubDivNoStr += ', ';
        }
      }

      return surveyAndSubDivNoStr;
    } else {
      // If Survey Crop deatils not found return null
      return null;
    }
  }

  updateFrameSrc(result: string) {
    const pdfFrameEle: HTMLIFrameElement | null = document.getElementById('printPdf') as HTMLIFrameElement;
    pdfFrameEle.src = result;
  }
}
