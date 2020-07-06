import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';

const routes: Routes = [
  { path: 'onboarding-layout', component: ApplyLoanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AaOnboardingLayoutRoutingModule { }
