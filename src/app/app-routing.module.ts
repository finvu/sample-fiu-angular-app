import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanEligibilityComponent } from './aa-onboarding-layout/loan-eligibility/loan-eligibility.component';
import { LoanSuccessComponent } from './aa-onboarding-layout/loan-success/loan-success.component';
import { LoanFailureComponent } from './aa-onboarding-layout/loan-failure/loan-failure.component';
import { ConsentRejectComponent } from './aa-onboarding-layout/consent-reject/consent-reject.component'

const appRoutes: Routes = [
  { path: '', redirectTo: 'onboarding-layout', pathMatch: 'full' },
  { path: 'loan-eligibility', component: LoanEligibilityComponent },
  { path: 'loan-success', component: LoanSuccessComponent },
  { path: 'loan-failure', component: LoanFailureComponent },
  { path: 'consent-reject', component: ConsentRejectComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
