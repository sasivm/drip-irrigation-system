import { Component, OnInit } from '@angular/core';
import { ExcelReaderService } from 'src/app/services/excel-reader.services';

@Component({
  selector: 'app-upload-cust-data',
  templateUrl: './upload-cust-data.component.html',
  styleUrls: ['./upload-cust-data.component.scss']
})
export class UploadCustDataComponent implements OnInit {

  excelArray: any = [];

  constructor(private _excelReader: ExcelReaderService) { }

  ngOnInit(): void {
  }

  uploadedFile(uploadedFileEvent: any) {
    console.log(uploadedFileEvent);
    /* wire up file reader */
    this._excelReader.checkExcelFile(uploadedFileEvent).then(data => {
      this.excelArray = data;
      console.log('Successfully data extracted');
      console.log(this.excelArray);
      // this.saveDetails(this.excelArray);
    }).catch(error => {
      console.log('Error Ocuured while parsing Excel');
      console.log(error);
    });
  }

  saveDetails(userData: any[]) {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }

  startNewRegistration() {
    this.saveDetails([]);
  }

}
