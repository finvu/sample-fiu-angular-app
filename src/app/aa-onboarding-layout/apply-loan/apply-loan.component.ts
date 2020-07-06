import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ConfigService } from 'src/app/services/config/config-service';
import { ConsentRequest } from 'src/app/services/consent-request/consent-request';
import { ConsentRequestService } from 'src/app/services/consent-request/consent-request.service';
import { UserLoginService } from 'src/app/services/user-login/user-login.service';
import { UserLogin } from 'src/app/services/user-login/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css',
              '../../../assets/icofont/css/aa-onboarding-common.scss']          
})
export class ApplyLoanComponent implements OnInit {
  
  loginPageUrl: String;
  fiuDemoPageUrl: String;
  registerPageUrl: String;
  response: any;
  from: Date;
  consentDetail: any;
  userPostfixName = "@finvu";
  public values = null;
  loanAmount: any;
  public amount: any;
  fiuId = "fiu@bajajfinance";
  authorizationToken: any;
  applyLoanForm: FormGroup;
  custId: string;
  loginFlag: boolean = true;

  constructor(public formBuilder: FormBuilder, public configService: ConfigService, 
              public router: Router, public consentRequestService: ConsentRequestService, 
              public userLoginService: UserLoginService) { 

    this.loginPageUrl = this.configService.loginPageUrl;
    this.fiuDemoPageUrl = this.configService.fiuDemoPageUrl;
    this.registerPageUrl = this.configService.registerPageUrl;

    this.applyLoanForm = formBuilder.group({
      'name': [null, Validators.compose( [Validators.required, Validators.pattern(".*\\S.*[a-zA-z]")])],
      'mobile': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'loanAmount':[null, Validators.compose( [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])],
      'aaId': [null, Validators.compose( [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])]
    });
  }

  ngOnInit() {
    sessionStorage.clear();
    this.authorizationTokenLogin();
  }
  
  authorizationTokenLogin() {
    
    const userLogin: UserLogin = {
      userId:  'finvudemo',
      password: "7777"
    }
    
    this.userLoginService.userLogin(userLogin).subscribe(data =>{
      console.log("UserLogin Response: ", JSON.stringify(data['body']));
      this.response = data['body'];
      this.authorizationToken = this.response['token'];
      sessionStorage.setItem('authorizationToken', this.authorizationToken);
    })
  }

  fiuConsentRequest() {

    if(sessionStorage.getItem("authorizationToken") != null) {
     
      this.getCustId(this.loginFlag);
      var fromDate = new Date();
      var fromYear = fromDate.getFullYear()
      var fromMonth = fromDate.getMonth()
      var fromDay = fromDate.getDay()
      var fromHour = fromDate.getHours()
      var fromMinute = fromDate.getMinutes()
      var fromSeconds = fromDate.getSeconds()
      var fromMilliseconds = fromDate.getMilliseconds()

      const consentRequest: ConsentRequest = {
       
        custId: this.custId,
        consentPurposeCode: "101",
        consentDescription: "Applying for Wealth management service",
        dateTimeRangeFrom: new Date(fromYear - 1, fromMonth, fromDay, fromHour, fromMinute, fromSeconds, fromMilliseconds).toISOString(),
        dateTimeRangeTo: new Date()
      }
      
      console.log("FIU Consent Request: ",consentRequest);
      sessionStorage.setItem('custId', this.custId);

      this.consentRequestService.createFIUConsentRequest(consentRequest).subscribe(data =>{
          console.log("FIU Consent Response: ", JSON.stringify(data['body']));
          this.response = data['body'];
          sessionStorage.setItem('consentResponse', this.response['encryptedConsentRequest']);
          sessionStorage.setItem('consentHandleId', this.response['consentHandleId']);
          console.log(sessionStorage.getItem('consentResponse'));
          console.log(sessionStorage.getItem('consentHandleId'));
      })
    } else {
      this.router.navigate(['/onboarding-layout']);
      console.log("Authorization token is null");
      sessionStorage.clear();
    }
}
 
  getCustId(loginFlag) {
    if(loginFlag){
      if(this.applyLoanForm.get('aaId').value.includes('@finvu')) {
          this.custId = this.applyLoanForm.get('aaId').value
      } else {
        this.custId = this.applyLoanForm.get('aaId').value + this.userPostfixName
      }
    } else {
      this.custId = '@finvu';
    } 
  }

  submitForm() {
      this.markFormTouched(this.applyLoanForm);
      if (this.applyLoanForm.valid) {
        // You will get form value if your form is valid
        var formValues = this.applyLoanForm.getRawValue;
        this.onNextClick();
      } else {
      }
  };

  markFormTouched(group: FormGroup | FormArray) {
      Object.keys(group.controls).forEach((key: string) => {
        const control = group.controls[key];
        if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control);}
        else { control.markAsTouched(); };
      });
  };

  onNextClick(){
    this.loginFlag = true;
    this.fiuConsentRequest();
    if(sessionStorage.getItem("authorizationToken") != null) {
      setTimeout(() => {
        window.location.href = this.loginPageUrl.toString()+"?ecreq="+sessionStorage.getItem("consentResponse")+ "&" +"chid="+ sessionStorage.getItem('consentHandleId')+ "&" +"cburl="+this.fiuDemoPageUrl + "&" +"fid="+this.fiuId  + "&" +"cid="+ sessionStorage.getItem('custId');
      }, 400);
      this.applyLoanForm.get('name').reset();
      this.applyLoanForm.get('mobile').reset();
      this.applyLoanForm.get('loanAmount').reset();
      this.applyLoanForm.get('aaId').reset();
    } else {
      alert("Authorization token is null");
      console.log("Authorization token is null");
      sessionStorage.clear();
      this.applyLoanForm.get('name').reset();
      this.applyLoanForm.get('mobile').reset();
      this.applyLoanForm.get('loanAmount').reset();
      this.applyLoanForm.get('aaId').reset();
      this.authorizationTokenLogin();
    }
  }

  navigate() {
    this.loginFlag = false;
    this.fiuConsentRequest();
    if(sessionStorage.getItem("authorizationToken") != null) { 
      setTimeout(() => {
          window.location.href = this.registerPageUrl.toString()+"?ecreq="+sessionStorage.getItem("consentResponse")+ "&" +"chid="+ sessionStorage.getItem('consentHandleId')+ "&" +"cburl="+this.fiuDemoPageUrl + "&" +"fid="+this.fiuId;
      }, 400);
      this.applyLoanForm.get('name').reset();
      this.applyLoanForm.get('mobile').reset();
      this.applyLoanForm.get('loanAmount').reset();
      this.applyLoanForm.get('aaId').reset();
    } else {
      this.router.navigate(['/onboarding-layout']);
      alert("Authorization token is null");
      console.log("Authorization token is null");
      sessionStorage.clear();
      this.applyLoanForm.get('name').reset();
      this.applyLoanForm.get('mobile').reset();
      this.applyLoanForm.get('loanAmount').reset();
      this.applyLoanForm.get('aaId').reset();
    }
  }

  appendUserName(event) {
    event = event.replace(this.userPostfixName, "")
    this.values = event + this.userPostfixName;
  }

  addCommas(event) {
    this.loanAmount = this.applyLoanForm.get('loanAmount').value;
    console.log("LoanAmount: ", this.loanAmount);
    this.amount = this.loanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log("Formated number",this.amount);
    this.applyLoanForm.get('loanAmount').setValue(this.amount);
    sessionStorage.setItem('loanAmount', this.amount);
  }
}
