import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PmksyDocComponent } from '../../../documents/pmksy-doc/pmksy-doc.component';
import { PreDocComponent } from '../../../documents/pre-doc/pre-doc.component';
import { SfmfDocComponent } from '../../../documents/sfmf-doc/sfmf-doc.component';
import { VerificationDocComponent } from '../../../documents/verification-doc/verification-doc.component';
import { WorkCompleteComponent } from 'src/app/documents/work-complete/work-complete.component';
import { DocsViewComponent } from 'src/app/documents/docs-view.component';
import { JvrDocComponent } from 'src/app/documents/jvr-doc/jvr-doc.component';
import { RouterConstants } from 'src/app/common/router-constants';

const routes: Routes = [
  {
    path: RouterConstants.EMPTY_PATH, component: DocsViewComponent, children: [
      { path: RouterConstants.SFMF_DOC, component: SfmfDocComponent },
      { path: RouterConstants.VERIFICATION_DOC, component: VerificationDocComponent },
      { path: RouterConstants.PRE_DOC, component: PreDocComponent },
      { path: RouterConstants.WORK_COMP_DOC, component: WorkCompleteComponent },
      { path: RouterConstants.PMKSY_DOC, component: PmksyDocComponent },
      { path: RouterConstants.JVR_DOC, component: JvrDocComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
