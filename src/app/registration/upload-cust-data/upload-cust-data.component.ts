import { Component, Output, EventEmitter } from '@angular/core';
import { GlobalConstants } from 'src/app/common/app.global-constant';
import { ExcelReaderService } from 'src/app/services/excel-reader.services';

@Component({
  selector: 'app-upload-cust-data',
  templateUrl: './upload-cust-data.component.html',
  styleUrls: ['./upload-cust-data.component.scss']
})
export class UploadCustDataComponent {

  @Output() excelData: EventEmitter<any[]> = new EventEmitter<any[]>();

  excelArray: any[][] = [];
  errorMessage: string = '';
  errorDefInticator: string = 'Error Ocuured while parsing Excel';

  successMesage: string = '';

  constructor(private _excelReader: ExcelReaderService) { }

  uploadedFile(uploadedFileEvent: any) {
    this.errorMessage = '';
    this.successMesage = '';
    console.log(uploadedFileEvent);
    /* wire up file reader */
    this._excelReader.checkExcelFile(uploadedFileEvent).then(data => {
      this.excelArray = data;
      console.log('Successfully data extracted');
      this.successMesage = GlobalConstants.FILE_UPLOAD_SUCCESS_MESSAGE;
      console.log('send to parent', this.excelArray);

      if (this.excelArray.length < 2) {
        this.errorMessage = GlobalConstants.FILE_UPLOAD_NO_DATA;
        return;
      } else {
        this.excelData.emit(this.excelArray);
      }

    }).catch((error: Error) => {
      const errMessage = error.message;
      if (errMessage !== GlobalConstants.FILE_UPLOAD_CANCEL_ERROR_MESSAGE) {
        this.errorMessage = errMessage;
        console.log('Error Ocuured while parsing Excel');
      }
      console.log(errMessage);
    });
  }

  saveDetails(userData: any[]) {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }

}
