import { Injectable } from '@angular/core';
import { StepperStepState } from '../common/models/common-types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCompletionState() {
    const local: string = sessionStorage.getItem('stepperState') || 'null';
    const state: StepperStepState | null = JSON.parse(local) || null;
    return state;
  }

  setCompletionState(state: StepperStepState) {
    const stateStr: string = JSON.stringify(state);
    sessionStorage.setItem('stepperState', stateStr);
  }
}
