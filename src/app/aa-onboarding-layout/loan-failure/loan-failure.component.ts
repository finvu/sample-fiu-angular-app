import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-failure',
  templateUrl: './loan-failure.component.html',
  styleUrls: ['./loan-failure.component.css',
              '../../../assets/icofont/css/aa-onboarding-common.scss']
})
export class LoanFailureComponent implements OnInit {

  loanAmount: String;

  constructor(public router: Router) { }

  ngOnInit() {
    this.loanAmount = sessionStorage.getItem('loanAmount');
  }

  onOkClick(){
    this.router.navigate(['onboarding-layout']);
    sessionStorage.clear();
  }
}