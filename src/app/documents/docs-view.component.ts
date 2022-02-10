import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustServiceService } from '../services/cust-service.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-docs-view',
  templateUrl: './docs-view.component.html',
  styleUrls: ['./docs-view.component.scss']
})
export class DocsViewComponent implements OnInit {

  constructor(private _custService: CustServiceService, private router: Router, private route: ActivatedRoute, private _pdfService: DataService) { }

  docList: any[] = [
    { name: 'SFMF', link: 'sfmf', desc: 'Small and Marginal Farmer Verification Certificate' },
    { name: 'VERIFICATION', link: 'verification', desc: 'Verification Certificate' },
    { name: 'PRE', link: 'pre', desc: 'Pre Inspection Report' },
    { name: 'WORK COMPLETION', link: 'wrk-complete', desc: 'Work Completion Certificate' },
    { name: 'PMKSY', link: 'pmksy', desc: 'Pradhan Mantri Krishi Sinchayee Yojana' },
    { name: 'JVR', link: 'jvr', desc: 'Joint Verification Report' }
  ];

  applicationId: string = 'Applicant Id';
  customerName: string = 'Customer Name';

  errorMessage: string = '';

  ngOnInit() {
    const customerRecArr: any[] = this._custService.getLoadedCustomerRecord();
    if (customerRecArr.length === 1) {
      if (customerRecArr[0].applicationId) {
        this.applicationId = customerRecArr[0]?.applicationId;
        this.customerName = customerRecArr[0]?.farmerName;
        this.router.navigate(['jvr'], { relativeTo: this.route });
      } else {
        this.errorMessage = 'There were missing data about customer. Please reload the page or select customer record again.';
      }
    } else {
      this.errorMessage = 'Please Select the customer before viewing the documents.';
      this.docList = [];
    }
  }

  onActiveOutlet() {
    const emptySrc: string = '';
    this._pdfService.updateFrameSrc(emptySrc);
  }

}
