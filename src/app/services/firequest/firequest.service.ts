import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebResponse } from '../web-response';
import { WebRequest } from '../web-request';
import { WebHeader } from '../web-header';
import { FiRequestSummary } from './firequest-summary';
import { Observable , throwError } from 'rxjs';
import { ConfigService } from '../../services/config/config-service';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FiRequestService {

  apiBaseUrl: string;

  constructor(private http: HttpClient,
    public configService: ConfigService,
    public router: Router) {
      this.apiBaseUrl = this.configService.apiBaseUrl;
    }

  createFiRequest(fiRequestSummary:FiRequestSummary): Observable<FiRequestSummary>{
      const header: WebHeader = {
        rid: localStorage.getItem("messageID"),
        ts: new Date(),
        channelId: 'finsense'
      };
     
      const request: WebRequest = {
        header: header,
        body: fiRequestSummary
      };
      return this.http.post<FiRequestSummary>(this.apiBaseUrl +'/FIRequest',request).pipe(retry(1),
      catchError(this.handleInternalServerError));
  }
  
  getFiStatus(consentId,sessionId,consentHandle,custId){
    return this.http.get<WebResponse>(this.apiBaseUrl +'/FIStatus/' +consentId+ '/' +sessionId+ '/' +consentHandle+ '/' +custId).pipe(retry(1),
    catchError(this.handleInternalServerError));
  }
  
  getFiFetchData(custId,consentId,sessionId){
    return this.http.get<WebResponse>(this.apiBaseUrl +'/FIFetch/' +custId+ '/' +consentId+ '/' +sessionId).pipe(retry(1),
    catchError(this.handleInternalServerError));
  }

  handleInternalServerError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if(error.status == 401){
      window.alert("JWT expired!");
      window.location.href = '/login'
    } else if(error.status == 500) {
        window.alert("Something went wrong!");
    }  else if(error.status == 400) {
      window.alert("Something went wrong!");
      this.router.navigate(['onboarding']);
  }
    return throwError(errorMessage);
   }
}
