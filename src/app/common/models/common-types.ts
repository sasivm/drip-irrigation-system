import { TableCell } from "pdfmake/interfaces";

export interface CommonList {
    value: number;
    option: string;
}

export interface OptionList {
    value: string;
    option: string;
}

export interface GenderList {
    value: string;
    option: string;
}

export interface TableErrorMessage {
    message: string,
    desc: string
}

export interface StepperStepState {
    step1: boolean,
    step2: boolean,
    step3: boolean,
    step4: boolean,
}

export interface customTableCell {
    [key: string]: TableCell
}