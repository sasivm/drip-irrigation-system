import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatListModule, MatTabsModule, MatRadioModule, MatCheckboxModule, MatStepperModule,
    MatTableModule, MatPaginatorModule, MatTooltipModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatMenuModule, ClipboardModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatListModule, MatTabsModule, MatRadioModule, MatCheckboxModule, MatStepperModule,
    MatTableModule, MatPaginatorModule, MatTooltipModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatMenuModule, ClipboardModule,
  ]
})
export class MaterialModule { }
