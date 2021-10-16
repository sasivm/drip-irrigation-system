import { Injectable } from '@angular/core';
import { StepperStepState } from '../common/models/common-types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  updateFrameSrc(result: string) {
    const pdfFrameEle: HTMLIFrameElement | null = document.getElementById('printPdf') as HTMLIFrameElement;
    pdfFrameEle.src = result;
  }
}
