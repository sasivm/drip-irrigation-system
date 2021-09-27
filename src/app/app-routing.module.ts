import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsViewComponent } from './documents/docs-view.component';
import { GenerateFormsComponent } from './generate-forms/generate-forms.component';
import { RegistrationComponent } from './registration/registration.component';
import { SubsidyCalculatorComponent } from './subsidy-calculator/subsidy-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, //to view working scr
  { path: 'register', component: GenerateFormsComponent },
  { path: 'subs-calc', component: SubsidyCalculatorComponent },
  { path: 'docs', component: DocsViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
