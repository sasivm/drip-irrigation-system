import { Component } from '@angular/core';

@Component({
  selector: 'app-docs-view',
  templateUrl: './docs-view.component.html',
  styleUrls: ['./docs-view.component.scss']
})
export class DocsViewComponent {

  constructor() { }

  docList: any[] = [
    { name: 'SFMF', link: 'sfmf', desc: 'Small and Marginal Farmer Verification Certificate' },
    { name: 'VERIFICATION', link: 'verification', desc: 'Verification Certificate' },
    { name: 'PRE', link: 'pre', desc: 'Pre Inspection Report' },
    { name: 'WORK COMPLETION', link: 'wrk-complete', desc: 'Work Completion Certificate' },
    { name: 'PMKSY', link: 'pmksy', desc: 'Pradhan Mantri Krishi Sinchayee Yojana' },
    { name: 'JVR', link: 'jvr', desc: 'Joint Verification Report' }
  ];

}
