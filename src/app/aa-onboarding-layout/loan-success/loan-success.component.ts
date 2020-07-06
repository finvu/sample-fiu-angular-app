import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-success',
  templateUrl: './loan-success.component.html',
  styleUrls: ['./loan-success.component.css',
  '../../../assets/icofont/css/aa-onboarding-common.scss']
})
export class LoanSuccessComponent implements OnInit {

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