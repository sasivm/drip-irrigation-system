import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Injectable({
    providedIn: 'root'
})
export class ExcelReaderService {

    XLSX_ParsingType: any = { type: 'binary' };
    JSON_ParsingType: any = { header: 1 };

    jsonExcelArr: any[][] = [];

    constructor() { }

    async checkExcelFile(fileEvent: any) {
        const target: DataTransfer = <DataTransfer>(fileEvent.target);
        const uploadedFileCount = target.files.length;

        if (uploadedFileCount > 1) {
            throw new Error('Cannot use multiple files');
        } else if (uploadedFileCount === 0) {
            throw new Error('Please upload a file');
        }

        try {
            const jsonExcelArr = await this.readExcel(target.files[0]);
            return jsonExcelArr;
        } catch (err) {
            throw err;
        }
    }

    readExcel(excelFile: File) {
        console.log('file-name', excelFile.name);
        console.log('size', excelFile.size);
        return new Promise<AOA>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                const bstr: string = event.target.result;
                try {
                    const workbook: XLSX.WorkBook = XLSX.read(bstr, this.XLSX_ParsingType);
                    const workSheetName: string = workbook.SheetNames[0];
                    const workSheet: XLSX.WorkSheet = workbook.Sheets[workSheetName];
                    const ExcelJSON = <AOA>(XLSX.utils.sheet_to_json(workSheet, this.JSON_ParsingType));
                    resolve(ExcelJSON);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsBinaryString(excelFile);
        });
    }

}
