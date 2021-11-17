import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PmksyDocComponent } from '../../../documents/pmksy-doc/pmksy-doc.component';
import { PreDocComponent } from '../../../documents/pre-doc/pre-doc.component';
import { SfmfDocComponent } from '../../../documents/sfmf-doc/sfmf-doc.component';
import { VerificationDocComponent } from '../../../documents/verification-doc/verification-doc.component';
import { WorkCompleteComponent } from 'src/app/documents/work-complete/work-complete.component';
import { DocsViewComponent } from 'src/app/documents/docs-view.component';

const routes: Routes = [
  {
    path: '', component: DocsViewComponent, children: [
      { path: 'sfmf', component: SfmfDocComponent },
      { path: 'verification', component: VerificationDocComponent },
      { path: 'pre', component: PreDocComponent },
      { path: 'wrk-complete', component: WorkCompleteComponent },
      { path: 'pmksy', component: PmksyDocComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
