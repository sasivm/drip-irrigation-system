import { Component } from '@angular/core';

@Component({
  selector: 'app-docs-view',
  templateUrl: './docs-view.component.html',
  styleUrls: ['./docs-view.component.scss']
})
export class DocsViewComponent {

  constructor() { }

  docList: any[] = [
    { name: 'SFMF', desc: 'Small and Marginal Farmer Verification Certificate' },
    { name: 'VERIFICATION', desc: 'verification Certificate' },
    { name: 'PRE', desc: 'Pre Inspection Report' },
    { name: 'WORK COMPLETION', desc: 'Work Completion Certificate' },
    { name: 'ABSTRACT', desc: 'Abstract' },
    { name: 'JVR', desc: 'Joint Verification Report' }
  ];

}
