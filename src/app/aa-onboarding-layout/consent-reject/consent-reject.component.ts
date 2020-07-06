import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consent-reject',
  templateUrl: './consent-reject.component.html',
  styleUrls: ['./consent-reject.component.css',
  '../../../assets/icofont/css/aa-onboarding-common.scss']
})
export class ConsentRejectComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onOkClick(){
    this.router.navigate(['onboarding-layout']);
    sessionStorage.clear();
  }
}
