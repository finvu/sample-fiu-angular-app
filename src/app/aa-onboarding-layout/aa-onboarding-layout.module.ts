import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AaOnboardingLayoutRoutingModule } from './aa-onboarding-layout-routing.module';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { LoanEligibilityComponent } from './loan-eligibility/loan-eligibility.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoanSuccessComponent } from './loan-success/loan-success.component';
import { LoanFailureComponent } from './loan-failure/loan-failure.component';
import { ConsentRejectComponent } from './consent-reject/consent-reject.component';

@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    CommonModule,
    AaOnboardingLayoutRoutingModule,
    ReactiveFormsModule,
    SelectModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  declarations: [ApplyLoanComponent, LoanEligibilityComponent, LoanSuccessComponent, 
                LoanFailureComponent, ConsentRejectComponent]
})
export class AaOnboardingLayoutModule { }
