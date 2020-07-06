import { Component, OnInit } from '@angular/core';
import { ConsentRequestService } from '../../../app/services/consent-request/consent-request.service';
import { FiRequestSummary } from 'src/app/services/firequest/firequest-summary';
import { FiRequestService } from 'src/app/services/firequest/firequest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-eligibility',
  templateUrl: './loan-eligibility.component.html',
  styleUrls: ['./loan-eligibility.component.css',
  '../../../assets/icofont/css/aa-onboarding-common.scss']
})
export class LoanEligibilityComponent implements OnInit {

  consentHandleId: String;
  custId: String;
  consentId: String;
  sessionId:String;
  dateTimeRangeFrom: Date;
  dateTimeRangeTo: Date;
  fiStartDate: Date;
  consentStartDate: Date;
  STATUS_CHECK_TIME_OUT : number = 15; 

  constructor(public consentRequestService: ConsentRequestService, private fiRequestService: FiRequestService, 
              public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log("UserId Extracted from URL: ",params['UserId']); 
      this.custId = params['UserId'];
    });

    this.consentStartDate = new Date();
    this.onCheckStatus();
   }

  onCheckStatus() {
    
    if(sessionStorage.getItem("authorizationToken") != null) {
      this.consentHandleId = sessionStorage.getItem('consentHandleId');
      
      this.consentRequestService.checkConsentStatus(this.consentHandleId, this.custId).subscribe(data => {
          var checkStatusResponse = data["body"];
          console.log("onCheckStatus method response",JSON.stringify(checkStatusResponse));
          if(checkStatusResponse['consentStatus'] == "ACCEPTED")
          {
              this.consentId = checkStatusResponse['consentId']
              console.log("consentId", this.consentId);
              
              this.consentRequestService.getConsentDetails(this.consentHandleId).subscribe(data => {
                  var consentDetailsResponse = data['body'];
                  console.log("callFiRequest getConsentDetails method response",JSON.stringify(consentDetailsResponse));
                  this.consentId = consentDetailsResponse['requestConsentId'];
                  this.dateTimeRangeFrom = consentDetailsResponse['dateTimeRangeFrom'];
                  this.dateTimeRangeTo = consentDetailsResponse['dateTimeRangeTo'];

                  if(consentDetailsResponse != null){
                      this.callFiRequest(this.consentId, this.dateTimeRangeFrom, this.dateTimeRangeTo);
                  }else{
                    alert("Something went wrong inside onCheckStatus() -> getConsentDetails() response")
                  }
              });
          }else if(checkStatusResponse['consentStatus'] == "PENDING"){
            console.log("Consent status is pending");

            var startDate = this.consentStartDate;
            var endDate   = new Date();
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
            console.log("Consent status check time out seconds : " + seconds) ;
          
            if(seconds < this.STATUS_CHECK_TIME_OUT){
              console.log("check consent status ");
              this.onCheckStatus();;
            } else {
              console.log("time out");
              this.router.navigate(['loan-failure']);
            }
          } else if(checkStatusResponse['consentStatus'] == "REJECTED") {
            this.router.navigate(['consent-reject']);
          }
          else{
            alert("Something went wrong")
          }
      })
    } else {
      this.router.navigate(['/onboarding-layout']);
      console.log("Authorization token is null");
    }
  }

  callFiRequest(consentId, dateTimeRangeFrom, dateTimeRangeTo) {

    if(sessionStorage.getItem("authorizationToken") != null) {
      const fiRequestSummary: FiRequestSummary = {
        custId: this.custId,
        consentId: consentId,
        consentHandleId: this.consentHandleId,
        dateTimeRangeFrom: dateTimeRangeFrom,
        dateTimeRangeTo: dateTimeRangeTo
      }
      console.log("FiRequestSummary: ", fiRequestSummary);

      this.fiRequestService.createFiRequest(fiRequestSummary).subscribe(data => {
        var fiRequestResponse = data['body'];
        console.log("FIRequest Response",JSON.stringify(fiRequestResponse));
        this.consentId  = fiRequestResponse['consentId'];
        this.sessionId = fiRequestResponse['sessionId'];
        console.log("consentHandleId",fiRequestSummary['consentHandleId']);
        this.consentHandleId = fiRequestSummary['consentHandleId'];
        console.log("sessionId",this.sessionId);
        if(fiRequestResponse != null){
            this.fiStartDate = new Date();
            this.callGetFIstatus(this.consentId, this.sessionId, this.consentHandleId, this.custId);
          }else{
            alert("Something went wrong inside callFiRequest() -> callGetFIstatus() response")
          }
      })
    } else {
      this.router.navigate(['/onboarding-layout']);
      console.log("Authorization token is null");
    }
  }

  callGetFIstatus(consentId, sessionId, consentHandleId, custId) {

    if(sessionStorage.getItem("authorizationToken") != null) {
      this.fiRequestService.getFiStatus(consentId, sessionId, consentHandleId, custId).subscribe(data => {
          var fiStatusResponse = data['body'];
          console.log("FIStaus Response: ", JSON.stringify(fiStatusResponse));
          if(fiStatusResponse['fiRequestStatus'] == "READY")
          {
              this.onFetchData(this.custId,consentId, sessionId);

          }else if(fiStatusResponse['fiRequestStatus'] == "PENDING"){
            console.log("Data request is pending");
          
            var startDate = this.fiStartDate;
            var endDate   = new Date();
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
            console.log("fi status check time out seconds : " + seconds) ;
          
            if(seconds < this.STATUS_CHECK_TIME_OUT){
              console.log("check fi status ");
              this.callGetFIstatus(consentId,sessionId, consentHandleId, custId);
            } else {
              console.log("time out");
              this.router.navigate(['loan-failure']);
            }
          }else{
            alert("Something went wrong");
          }
      })
    } else {
      this.router.navigate(['/onboarding-layout']);
      console.log("Authorization token is null");
    }
  }

  onFetchData(custId, consentId, sessionId) {
    if(sessionStorage.getItem("authorizationToken") != null) {
      this.fiRequestService.getFiFetchData(custId, consentId, sessionId).subscribe(data => {
          console.log("Fetch Data Response",JSON.stringify(data));
          if(data != null){
            this.router.navigate(['loan-success']);
          } else {
            this.router.navigate(['loan-failure']);
          }
      })
    }else {
      this.router.navigate(['/onboarding-layout']);
      console.log("Authorization token is null");
    }
  }
}