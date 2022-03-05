import { NgModule } from '@angular/core';

import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { DocsViewComponent } from 'src/app/documents/docs-view.component';
import { PmksyDocComponent } from 'src/app/documents/pmksy-doc/pmksy-doc.component';
import { PreDocComponent } from 'src/app/documents/pre-doc/pre-doc.component';
import { SfmfDocComponent } from 'src/app/documents/sfmf-doc/sfmf-doc.component';
import { VerificationDocComponent } from 'src/app/documents/verification-doc/verification-doc.component';
import { WorkCompleteComponent } from 'src/app/documents/work-complete/work-complete.component';
import { JvrDocComponent } from 'src/app/documents/jvr-doc/jvr-doc.component';

@NgModule({
  declarations: [
    DocsViewComponent, SfmfDocComponent, VerificationDocComponent,
    PreDocComponent, WorkCompleteComponent, PmksyDocComponent, JvrDocComponent
  ],
  imports: [
    SharedModule,
    DocumentsRoutingModule
  ]
})
export class DocumentsModule { }
